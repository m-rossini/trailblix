import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import brandColors from '../../styles/brandcolors'; // Adjust the path as needed

// Styles
const finalCTAStyles: React.CSSProperties = {
  background: `linear-gradient(120deg, ${brandColors.gradientStart}, ${brandColors.gradientEnd})`,
  padding: '4rem 2rem',
  textAlign: 'center' as const,
  color: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const titleStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: '1rem',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  marginBottom: '2rem',
  lineHeight: '1.5',
  maxWidth: '600px',
  margin: '0 auto',
};

const ctaButtonStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  color: brandColors.primary,
  padding: '0.75rem 1.5rem',
  borderRadius: '30px',
  fontSize: '1rem',
  fontWeight: 600,
  border: '2px solid #fff',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
};

const ctaButtonHoverStyle: React.CSSProperties = {
  backgroundColor: brandColors.primary,
  color: '#fff',
  borderColor: '#fff',
  transform: 'scale(1.05)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const FinalCTA: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section style={finalCTAStyles}>
      <h2 style={titleStyle}>Ready to Launch Your Next Career Chapter?</h2>
      <p style={subtitleStyle}>
        Join thousands of professionals accelerating their growth with AI-powered tools and insights.
      </p>
      <Link
        to="/get-started"
        style={{
          ...ctaButtonStyle,
          ...(isHovered ? ctaButtonHoverStyle : {}),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Get Started
      </Link>
    </section>
  );
};

export default FinalCTA;
