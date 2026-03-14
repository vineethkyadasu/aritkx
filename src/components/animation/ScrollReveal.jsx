import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll('[data-reveal]');

    targets.forEach((target, i) => {
      gsap.fromTo(
        target,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: target,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return ref;
}

export function RevealSection({ children, className = '' }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
