import React from 'react';

// Vector version of public/images/KRK.png: bold initials cut by a broken diagonal slash.
export default function Logo({ className = '' }) {
  return (
    <svg className={`logo ${className}`} viewBox="20 0 176 216" role="img" aria-label="KRK">
      <g className="logo__slash">
        <line x1="148" y1="6" x2="122" y2="52" />
        <line x1="81" y1="162" x2="55" y2="208" />
      </g>
      <text x="108" y="137" textAnchor="middle" className="logo__text">
        KRK
      </text>
    </svg>
  );
}
