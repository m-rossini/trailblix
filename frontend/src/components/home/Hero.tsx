import React from 'react';
import { CSSProperties } from 'react';
import brandColors from '../../styles/brandcolors';

interface StyleMap {
  [key: string]: CSSProperties;
}

const finalCTAStyles: StyleMap = {
  section: {
    background: `linear-gradient(120deg, ${brandColors.gradientStart}, ${brandColors.gradientEnd})`,
    padding: '4rem 2rem',
    textAlign: 'center' as const,
    color: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    lineHeight: '1.5',
    maxWidth: '600px',
    margin: '0 auto',
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    color: brandColors.primary,
    padding: '1rem 2rem',
    border: 'none',
    fontSize: '1.2rem',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
    fontWeight: 700,
  },
  buttonHover: {
    backgroundColor: brandColors.primary,
    color: '#fff',
    transform: 'scale(1.05)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
  },
};

const FinalCTA: React.FC = () => {
  const [isButtonHovered, setIsButtonHovered] = React.useState(false);

  return (
    <section style={finalCTAStyles.section}>
      <h2 style={finalCTAStyles.title}>Ready to Launch Your Next Career Chapter?</h2>
      <p style={finalCTAStyles.subtitle}>
        Join thousands of professionals accelerating their growth with AI-powered tools and insights.
      </p>
      <button
        style={{
          ...finalCTAStyles.button,
          ...(isButtonHovered ? finalCTAStyles.buttonHover : {}),
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        Get Started
      </button>
    </section>
  );
};

export default FinalCTA;
