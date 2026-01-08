import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AnalyticsScripts = () => {
  const { data: settings } = useQuery({
    queryKey: ["analytics-settings"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .eq("category", "analytics");
      
      const settingsMap: Record<string, string> = {};
      data?.forEach((s) => {
        if (s.value) settingsMap[s.key] = s.value;
      });
      return settingsMap;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (!settings) return;

    // Google Analytics 4
    if (settings.google_analytics_id) {
      const gaId = settings.google_analytics_id;
      
      // Check if already loaded
      if (!document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        script.async = true;
        document.head.appendChild(script);

        const inlineScript = document.createElement("script");
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `;
        document.head.appendChild(inlineScript);
      }
    }

    // Google Tag Manager
    if (settings.google_tag_manager_id) {
      const gtmId = settings.google_tag_manager_id;
      
      if (!document.querySelector(`script[src*="googletagmanager.com/gtm.js"]`)) {
        const script = document.createElement("script");
        script.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `;
        document.head.appendChild(script);

        // Add noscript iframe to body
        if (!document.querySelector(`iframe[src*="googletagmanager.com/ns.html"]`)) {
          const noscript = document.createElement("noscript");
          const iframe = document.createElement("iframe");
          iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
          iframe.height = "0";
          iframe.width = "0";
          iframe.style.display = "none";
          iframe.style.visibility = "hidden";
          noscript.appendChild(iframe);
          document.body.insertBefore(noscript, document.body.firstChild);
        }
      }
    }

    // Facebook Pixel
    if (settings.facebook_pixel_id) {
      const fbPixelId = settings.facebook_pixel_id;
      
      if (!document.querySelector(`script[data-fb-pixel]`)) {
        const script = document.createElement("script");
        script.setAttribute("data-fb-pixel", "true");
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${fbPixelId}');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(script);

        // Add noscript pixel
        const noscript = document.createElement("noscript");
        const img = document.createElement("img");
        img.height = 1;
        img.width = 1;
        img.style.display = "none";
        img.src = `https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`;
        noscript.appendChild(img);
        document.head.appendChild(noscript);
      }
    }
  }, [settings]);

  return null;
};

export default AnalyticsScripts;
