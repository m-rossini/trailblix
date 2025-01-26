import React, { CSSProperties, useState } from 'react';
import brandColors from '../../styles/brandcolors';

interface StyleMap {
  [key: string]: CSSProperties;
}

const heroStyles: StyleMap = {
  section: {
    background: `linear-gradient(120deg, ${brandColors.gradientStart} 0%, ${brandColors.gradientEnd} 100%)`,
    padding: '4rem 2rem',
    position: 'relative' as const,
    overflow: 'hidden'
  },
  // Updated to brand color, repositioned near the "C"
  infoIcon: {
    position: 'absolute',
    // You may need to tweak these values to perfectly align above the "C"
    top: '2rem',
    left: '2rem',
    fontSize: '1.2rem',
    backgroundColor: brandColors.primary,
    color: '#fff',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  tooltip: {
    position: 'absolute',
    top: '4.2rem', // slightly below the icon
    left: '1rem',
    backgroundColor: '#fff',
    color: brandColors.textDark,
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    width: '220px'
  },
  title: {
    textAlign: 'left' as const,
    fontSize: '3rem',
    margin: '0 0 1rem 0',
    color: brandColors.textDark,
    fontWeight: 700,
    maxWidth: '600px'
  },
  highlight: {
    color: brandColors.primary,
    fontWeight: 800,
    backgroundColor: 'rgba(78,70,229,0.1)', // light highlight behind text
    padding: '0 4px',
    borderRadius: '4px'
  },
  subtitle: {
    textAlign: 'left' as const,
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: brandColors.textMedium,
    maxWidth: '600px'
  },
  button: {
    backgroundColor: brandColors.primary,
    color: '#fff',
    padding: '1rem 2rem',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'transform 0.3s ease, boxShadow 0.3s ease',
    boxShadow: '0 3px 6px rgba(0,0,0,0.15)'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
};

const Hero: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Subtle scale + glow on hover
  const buttonHoverStyle: CSSProperties = isButtonHovered
    ? {
        boxShadow: `0 6px 16px ${brandColors.primary}80`,
        transform: 'scale(1.05)'
      }
    : {};

  return (
    <section style={heroStyles.section}>
      {/* Brand-colored info icon above the “C” in “Chart” */}
      <div
        style={heroStyles.infoIcon}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        ℹ
      </div>

      {showTooltip && (
        <div style={heroStyles.tooltip}>
          Trailblix harnesses AI to save you time,
          guide your career decisions,
          and help you build a path toward success.
        </div>
      )}

      <div style={heroStyles.container}>
        <h1 style={heroStyles.title}>
          Chart Your Career Path
          <br />
          with{' '}
          <span style={heroStyles.highlight}>AI-Powered Insights</span>
        </h1>
        <p style={heroStyles.subtitle}>
          Unlock personalized recommendations, job matches, and learning paths—
          everything you need in one place.
        </p>
        <button
          style={{ ...heroStyles.button, ...buttonHoverStyle }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          Start Your Journey
        </button>
      </div>
    </section>
  );
};

export default Hero;
