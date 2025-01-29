// Footer.tsx
import React from 'react';
import brandColors from '../../styles/brandcolors'; // adjust path if needed

const footerStyle: React.CSSProperties = {
  backgroundColor: brandColors.primary,       // brand-colored background
  color: '#fff',
  padding: '1.5rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const topRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  marginBottom: '1rem'
};

const headingStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.2rem',
  fontWeight: 600
};

const linksListStyle: React.CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  gap: '1rem',
  margin: 0,
  padding: 0
};

const linkItemStyle: React.CSSProperties = {
  transition: 'transform 0.3s ease',
  fontSize: '0.95rem'
};

const linkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
  transition: 'color 0.3s ease'
};

const linkHoverStyle: React.CSSProperties = {
  color: '#f0f0f0',
  textDecoration: 'underline'
};

// If you want a separate row for quick links
const bottomRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem'
};

const copyRightStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  margin: 0
};

const quickLinksListStyle: React.CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  gap: '1rem',
  margin: 0,
  padding: 0
};

const quickLinkItemStyle: React.CSSProperties = {
  fontSize: '0.9rem'
};

const Footer: React.FC = () => {
  // Track hovered link index for a slight effect
  const [hoveredLink, setHoveredLink] = React.useState<number | null>(null);
  const [hoveredQuickLink, setHoveredQuickLink] = React.useState<number | null>(null);

  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com' },
    { name: 'Twitter', url: 'https://www.twitter.com' },
    { name: 'Instagram', url: 'https://www.instagram.com' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com' }
  ];

  const quickLinks = [
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' }
  ];

  return (
    <footer style={footerStyle}>
      <div style={topRowStyle}>
        <div>
          <h2 style={headingStyle}>Follow Us</h2>
          <ul style={linksListStyle}>
            {socialLinks.map((link, index) => {
              const isHovered = hoveredLink === index;
              return (
                <li
                  key={link.name}
                  style={{
                    ...linkItemStyle,
                    ...(isHovered ? { transform: 'scale(1.05)' } : {})
                  }}
                  onMouseEnter={() => setHoveredLink(index)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      ...linkStyle,
                      ...(isHovered ? linkHoverStyle : {})
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div style={bottomRowStyle}>
        <p style={copyRightStyle}>
          © {new Date().getFullYear()} Trailblix. All rights reserved.
        </p>
        <ul style={quickLinksListStyle}>
          {quickLinks.map((qlink, index) => {
            const isHovered = hoveredQuickLink === index;
            return (
              <li
                key={qlink.name}
                style={{
                  ...quickLinkItemStyle,
                  ...(isHovered ? { textDecoration: 'underline' } : {})
                }}
                onMouseEnter={() => setHoveredQuickLink(index)}
                onMouseLeave={() => setHoveredQuickLink(null)}
              >
                <a
                  href={qlink.url}
                  style={{
                    color: '#fff',
                    textDecoration: 'none'
                  }}
                >
                  {qlink.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
