import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, ExternalLink, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface GoogleReview {
  author: string;
  authorPhoto: string | null;
  rating: number;
  text: string;
  time: string;
}

interface GoogleReviewsData {
  name: string;
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
}

const GoogleReviewsWidget = () => {
  const { data: settings } = useQuery({
    queryKey: ["site-settings-gmb"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["gmb_review_url", "gmb_profile_url", "gmb_place_id"]);

      if (error) throw error;

      return data?.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string | null>);
    },
  });

  const placeId = settings?.gmb_place_id;
  const reviewUrl = settings?.gmb_review_url;
  const profileUrl = settings?.gmb_profile_url;

  const { data: reviewsData, isLoading: isLoadingReviews } = useQuery({
    queryKey: ["google-reviews", placeId],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke<GoogleReviewsData>("google-reviews", {
        body: { placeId },
      });

      if (error) throw error;
      return data;
    },
    enabled: !!placeId,
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
  });

  // Se não houver configuração do GMB, não mostra o widget
  if (!placeId && !reviewUrl && !profileUrl) {
    return null;
  }

  const rating = reviewsData?.rating || 5;
  const totalReviews = reviewsData?.totalReviews || 0;
  const reviews = reviewsData?.reviews || [];
  const hasRealReviews = reviews.length > 0;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-background rounded-2xl p-8 shadow-lg border mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <svg viewBox="0 0 24 24" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Avaliações no Google
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-muted-foreground text-sm">
                    {rating.toFixed(1)} de 5 estrelas
                    {totalReviews > 0 && ` (${totalReviews} avaliações)`}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  Veja o que nossos clientes dizem sobre nós
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {profileUrl && (
                <Button variant="outline" asChild className="gap-2">
                  <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Ver Perfil
                  </a>
                </Button>
              )}
              {reviewUrl && (
                <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
                  <a href={reviewUrl} target="_blank" rel="noopener noreferrer">
                    <Star className="w-4 h-4" />
                    Deixar Avaliação
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Reviews Grid */}
          {isLoadingReviews && placeId && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-background rounded-xl p-6 border shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          )}

          {hasRealReviews && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-background rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-4">
                    {review.authorPhoto ? (
                      <img
                        src={review.authorPhoto}
                        alt={review.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {review.author.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{review.author}</h4>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-2">
                          {review.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-primary/20" />
                    <p className="text-muted-foreground text-sm pl-4 line-clamp-4">
                      {review.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsWidget;
