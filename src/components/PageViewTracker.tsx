import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const getVisitorId = (): string => {
  let visitorId = localStorage.getItem("lf_visitor_id");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("lf_visitor_id", visitorId);
  }
  return visitorId;
};

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const visitorId = getVisitorId();
        
        await supabase.from("page_views").insert({
          page_path: location.pathname,
          visitor_id: visitorId,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
        });
      } catch (error) {
        // Silently fail - don't break the app for analytics
        console.debug("Page view tracking failed:", error);
      }
    };

    trackPageView();
  }, [location.pathname]);

  return null;
};

export default PageViewTracker;
