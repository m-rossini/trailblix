import React, { CSSProperties, useState } from 'react';
import brandColors from '../../styles/brandcolors'; // adjust path if needed
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// Outer footer style
const footerStyle: CSSProperties = {
  backgroundColor: brandColors.primary,
  color: '#fff',
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

// Container for top columns
const columnsContainerStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2rem',
  justifyContent: 'space-between',
  alignItems: 'start'
};

// Each column
const columnStyle: CSSProperties = {
  flex: '1 1 200px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

// Titles in each column
const columnTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: '1.1rem',
  fontWeight: 600,
  marginBottom: '0.5rem'
};

// Common link list style
const linksListStyle: CSSProperties = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem'
};

// Link item
const linkItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.95rem',
  transition: 'transform 0.3s ease'
};

// Link text style
const linkStyle: CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
  transition: 'color 0.3s ease'
};

const linkHoverStyle: CSSProperties = {
  color: '#f0f0f0',
  textDecoration: 'underline'
};

// Newsletter styles
const newsletterFormStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginTop: '0.5rem'
};

const inputStyle: CSSProperties = {
  flex: '1 1 auto',
  padding: '0.5rem',
  borderRadius: '4px',
  border: 'none',
  fontSize: '0.95rem'
};

const buttonStyle: CSSProperties = {
  backgroundColor: '#fff',
  color: brandColors.primary,
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  fontSize: '0.95rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.3s ease'
};

const buttonHoverStyle: CSSProperties = {
  backgroundColor: '#f0f0f0',
  transform: 'scale(1.05)'
};

// The bottom bar for the final line
const bottomBarStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '0.9rem',
  borderTop: '1px solid rgba(255,255,255,0.3)',
  paddingTop: '1rem',
  marginTop: '1rem'
};

const Footer: React.FC = () => {
  // Hover states for links
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState<number | null>(null);
  const [hoveredQuickLinkIndex, setHoveredQuickLinkIndex] = useState<number | null>(null);

  // Hover state for the newsletter button
  const [newsletterHover, setNewsletterHover] = useState(false);

  // Example links
  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'Career Paths', url: '/career' },
    { name: 'Contact Us', url: '/contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com', icon: <FaFacebookF /> },
    { name: 'Twitter', url: 'https://www.twitter.com', icon: <FaTwitter /> },
    { name: 'Instagram', url: 'https://www.instagram.com', icon: <FaInstagram /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: <FaLinkedinIn /> }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <footer style={footerStyle}>
      {/* Top Section with columns */}
      <div style={columnsContainerStyle}>
        {/* Column 1: Brand / About */}
        <div style={columnStyle}>
          <h3 style={columnTitleStyle}>TrailBlix</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
            At TrailBlix, we harness the power of AI to guide your career journey—providing real-time insights, personalized learning paths, and growth opportunities at every turn.
          </p>
          <form onSubmit={handleNewsletterSubmit} style={newsletterFormStyle}>
            <input
              type="email"
              placeholder="Your email"
              required
              style={inputStyle}
            />
            <button
              type="submit"
              style={{
                ...buttonStyle,
                ...(newsletterHover ? buttonHoverStyle : {})
              }}
              onMouseEnter={() => setNewsletterHover(true)}
              onMouseLeave={() => setNewsletterHover(false)}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Column 2: Quick Links */}
        <div style={columnStyle}>
          <h3 style={columnTitleStyle}>Quick Links</h3>
          <ul style={linksListStyle}>
            {quickLinks.map((link, index) => {
              const isHovered = hoveredQuickLinkIndex === index;
              return (
                <li
                  key={link.name}
                  style={{
                    ...linkItemStyle,
                    ...(isHovered ? { transform: 'scale(1.05)' } : {})
                  }}
                  onMouseEnter={() => setHoveredQuickLinkIndex(index)}
                  onMouseLeave={() => setHoveredQuickLinkIndex(null)}
                >
                  <a
                    href={link.url}
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

        {/* Column 3: Follow Us */}
        <div style={columnStyle}>
          <h3 style={columnTitleStyle}>Follow Us</h3>
          <ul style={linksListStyle}>
            {socialLinks.map((link, index) => {
              const isHovered = hoveredLinkIndex === index;
              return (
                <li
                  key={link.name}
                  style={{
                    ...linkItemStyle,
                    ...(isHovered ? { transform: 'scale(1.05)' } : {})
                  }}
                  onMouseEnter={() => setHoveredLinkIndex(index)}
                  onMouseLeave={() => setHoveredLinkIndex(null)}
                >
                  {link.icon}
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

      {/* Bottom bar */}
      <div style={bottomBarStyle}>
        <div>© {new Date().getFullYear()} TrailBlix. All rights reserved.</div>
        <ul style={{ ...linksListStyle, flexDirection: 'row', gap: '1rem' }}>
          {legalLinks.map((l, index) => (
            <li key={index}>
              <a
                href={l.url}
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
