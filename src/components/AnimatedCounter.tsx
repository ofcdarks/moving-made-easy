import { useCountAnimation } from "@/hooks/useCountAnimation";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

const AnimatedCounter = ({ value, className = "", duration = 2000 }: AnimatedCounterProps) => {
  const { displayValue, elementRef } = useCountAnimation(value, { duration });

  return (
    <span ref={elementRef as React.RefObject<HTMLSpanElement>} className={className}>
      {displayValue}
    </span>
  );
};

export default AnimatedCounter;
