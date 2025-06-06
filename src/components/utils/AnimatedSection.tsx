
"use client";
import React, { useRef, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: string; // Tailwind delay class e.g., 'delay-200'
  threshold?: number; // Intersection observer threshold
  rootMargin?: string; // Intersection observer rootMargin
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = '',
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        'transition-all ease-out duration-1000',
        delay,
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
