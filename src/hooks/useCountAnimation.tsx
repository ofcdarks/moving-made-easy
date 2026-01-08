import { useState, useEffect, useRef } from "react";

interface UseCountAnimationOptions {
  duration?: number;
  startOnView?: boolean;
}

export const useCountAnimation = (
  endValue: string,
  options: UseCountAnimationOptions = {}
) => {
  const { duration = 2000, startOnView = true } = options;
  const [displayValue, setDisplayValue] = useState(endValue);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    // Extract numeric part and suffix (e.g., "500+" -> 500, "+")
    const match = endValue.match(/^([\d.,]+)(.*)$/);
    if (!match) {
      setDisplayValue(endValue);
      return;
    }

    const numericPart = match[1].replace(/[.,]/g, "");
    const suffix = match[2] || "";
    const targetNumber = parseInt(numericPart, 10);

    if (isNaN(targetNumber)) {
      setDisplayValue(endValue);
      return;
    }

    const animate = () => {
      setHasAnimated(true);
      const startTime = performance.now();
      const startNumber = 0;

      const updateNumber = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out cubic)
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentNumber = Math.floor(
          startNumber + (targetNumber - startNumber) * easeOutCubic
        );

        // Format with original separators if needed
        const formattedNumber = currentNumber.toLocaleString("pt-BR");
        setDisplayValue(formattedNumber + suffix);

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          setDisplayValue(endValue);
        }
      };

      requestAnimationFrame(updateNumber);
    };

    if (!startOnView) {
      animate();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [endValue, duration, startOnView, hasAnimated]);

  return { displayValue, elementRef };
};
