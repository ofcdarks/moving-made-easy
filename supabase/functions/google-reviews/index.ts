import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Cache duration in minutes
const CACHE_DURATION_MINUTES = 60;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeId } = await req.json();
    
    if (!placeId) {
      console.error("Missing placeId in request");
      return new Response(
        JSON.stringify({ error: "Place ID é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client with service role for cache management
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check cache first
    const cacheThreshold = new Date(Date.now() - CACHE_DURATION_MINUTES * 60 * 1000).toISOString();
    
    const { data: cachedData, error: cacheError } = await supabase
      .from('google_reviews_cache')
      .select('*')
      .eq('place_id', placeId)
      .gte('cached_at', cacheThreshold)
      .maybeSingle();

    if (cachedData && !cacheError) {
      console.log(`Returning cached reviews for placeId: ${placeId}`);
      return new Response(
        JSON.stringify({
          name: cachedData.business_name,
          rating: cachedData.rating,
          totalReviews: cachedData.total_reviews,
          reviews: cachedData.reviews,
          cached: true,
          cachedAt: cachedData.cached_at,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch from Google Places API
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    
    if (!apiKey) {
      console.error("GOOGLE_PLACES_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "API key não configurada" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching fresh reviews from Google for placeId: ${placeId}`);

    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,rating,userRatingCount,reviews&languageCode=pt-BR`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google Places API error: ${response.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ error: "Erro ao buscar avaliações do Google" }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log(`Successfully fetched reviews. Rating: ${data.rating}, Reviews count: ${data.userRatingCount}`);

    // Format reviews
    const formattedReviews = (data.reviews || []).slice(0, 5).map((review: any) => ({
      author: review.authorAttribution?.displayName || 'Anônimo',
      authorPhoto: review.authorAttribution?.photoUri || null,
      rating: review.rating || 5,
      text: review.text?.text || '',
      time: review.relativePublishTimeDescription || '',
      publishTime: review.publishTime || '',
    }));

    // Update cache (upsert)
    const { error: upsertError } = await supabase
      .from('google_reviews_cache')
      .upsert({
        place_id: placeId,
        business_name: data.displayName?.text || '',
        rating: data.rating || 0,
        total_reviews: data.userRatingCount || 0,
        reviews: formattedReviews,
        cached_at: new Date().toISOString(),
      }, {
        onConflict: 'place_id',
      });

    if (upsertError) {
      console.error('Error updating cache:', upsertError);
    } else {
      console.log('Cache updated successfully');
    }

    const result = {
      name: data.displayName?.text || '',
      rating: data.rating || 0,
      totalReviews: data.userRatingCount || 0,
      reviews: formattedReviews,
      cached: false,
    };

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in google-reviews function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
