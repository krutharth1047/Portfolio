import React, { useEffect, useRef } from 'react';

// Soft spotlight that trails the mouse on pointer devices.
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        ref.current.style.opacity = '1';
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
