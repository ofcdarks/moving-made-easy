import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
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

    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    
    if (!apiKey) {
      console.error("GOOGLE_PLACES_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "API key não configurada" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching reviews for placeId: ${placeId}`);

    // Use Places API (New) for place details with reviews
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

    // Format the response
    const result = {
      name: data.displayName?.text || '',
      rating: data.rating || 0,
      totalReviews: data.userRatingCount || 0,
      reviews: (data.reviews || []).slice(0, 5).map((review: any) => ({
        author: review.authorAttribution?.displayName || 'Anônimo',
        authorPhoto: review.authorAttribution?.photoUri || null,
        rating: review.rating || 5,
        text: review.text?.text || '',
        time: review.relativePublishTimeDescription || '',
        publishTime: review.publishTime || '',
      })),
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
