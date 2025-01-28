import React from 'react';
import { Link } from 'react-router-dom';
import brandColors from '../../styles/brandcolors'; // Adjust the path as needed

// Header styles
const headerStyle: React.CSSProperties = {
  backgroundColor: brandColors.primary,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 2rem',
  position: 'sticky',
  top: 0,
  zIndex: 999,
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
};

const logoStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#fff',
  textDecoration: 'none',
};

const navListStyle: React.CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  margin: 0,
  padding: 0,
};

const linkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
  transition: 'color 0.3s ease, transform 0.3s ease',
};

const linkHoverStyle: React.CSSProperties = {
  color: '#dcdcdc',
  transform: 'scale(1.05)',
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

const Header: React.FC = () => {
  const [hoveredLink, setHoveredLink] = React.useState<number | null>(null);
  const [isCtaHovered, setIsCtaHovered] = React.useState(false);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Login', to: '/login' },
  ];

  return (
    <header style={headerStyle}>
      <Link to="/" style={logoStyle}>
        TrailBlix
      </Link>
      <nav>
        <ul style={navListStyle}>
          {navLinks.map((link, index) => (
            <li
              key={index}
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                ...(hoveredLink === index ? { transform: 'scale(1.05)' } : {}),
              }}
            >
              <Link
                to={link.to}
                style={{
                  ...linkStyle,
                  ...(hoveredLink === index ? linkHoverStyle : {}),
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/get-started"
              style={{
                ...ctaButtonStyle,
                ...(isCtaHovered ? ctaButtonHoverStyle : {}),
              }}
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
            >
              Get Started
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default React.memo(Header);
