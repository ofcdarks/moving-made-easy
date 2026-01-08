import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: "Query é obrigatória" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key não configurada" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Searching for place: ${query}`);

    // Use Places API Text Search
    const url = 'https://places.googleapis.com/v1/places:searchText';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: 'pt-BR',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google Places API error: ${response.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ error: "Erro ao buscar no Google Places" }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log(`Found ${data.places?.length || 0} places`);

    const places = (data.places || []).map((place: any) => ({
      placeId: place.id,
      name: place.displayName?.text || '',
      address: place.formattedAddress || '',
      rating: place.rating || 0,
      totalReviews: place.userRatingCount || 0,
    }));

    return new Response(
      JSON.stringify({ places }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in search-place function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
