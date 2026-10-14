import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Fades its children up into place the first time they scroll into view.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, visible] = useScrollAnimation({ threshold: 0.12 });
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
