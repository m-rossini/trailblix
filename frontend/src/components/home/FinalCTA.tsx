// FinalCTA.tsx

import React, { useEffect, useState, CSSProperties } from 'react';
import brandColors from '../../styles/brandcolors';

interface StyleMap {
  [key: string]: CSSProperties;
}

const finalCTAStyles: StyleMap = {
  section: {
    backgroundColor: brandColors.background,
    textAlign: 'center' as const,
    padding: '2.5rem 1.5rem',
    position: 'relative' as const,
    overflow: 'hidden',
    // fade in container
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease'
  },
  sectionVisible: {
    opacity: 1,
    transform: 'translateY(0)'
  },
  title: {
    fontSize: '2rem',
    color: brandColors.primary,
    fontWeight: 700,
    margin: '0 0 0.5rem 0'
  },
  subtitle: {
    fontSize: '1rem',
    color: brandColors.textMedium,
    marginBottom: '1.5rem'
  },
  button: {
    backgroundColor: brandColors.primary,
    color: '#fff',
    border: 'none',
    padding: '1rem 2rem',
    cursor: 'pointer',
    fontSize: '1.1rem',
    borderRadius: '6px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 3px 6px rgba(0,0,0,0.15)'
  },
  buttonHover: {
    transform: 'scale(1.05)',
    boxShadow: `0 8px 20px rgba(0,0,0,0.15)`
  }
};

const FinalCTA: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // fade in after mount
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const buttonStyle: CSSProperties = {
    ...finalCTAStyles.button,
    ...(isHovered ? finalCTAStyles.buttonHover : {})
  };

  return (
    <section
      style={{
        ...finalCTAStyles.section,
        ...(visible ? finalCTAStyles.sectionVisible : {})
      }}
    >
      <h2 style={finalCTAStyles.title}>
        Ready to Launch Your Next Career Chapter?
      </h2>
      <p style={finalCTAStyles.subtitle}>
        Join thousands of professionals accelerating their growth with AI.
      </p>
      <button
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Start Now — It’s Free
      </button>
    </section>
  );
};

export default FinalCTA;
