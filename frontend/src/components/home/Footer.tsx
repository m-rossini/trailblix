// Footer.tsx
import React from 'react';
import { CSSProperties } from 'react';

interface StyleMap {
  [key: string]: CSSProperties;
}

const footerStyles: StyleMap = {
  footer: {
    textAlign: 'center' as const,
    padding: '2rem',
    borderTop: '1px solid #ddd',
    marginTop: '2rem'
  },
  nav: {
    marginTop: '1rem'
  }
};

const Footer: React.FC = () => {
  return (
    <footer style={footerStyles.footer}>
      <p>© 2024 Trailblix. Guiding you to a brighter future.</p>
      <nav style={footerStyles.nav}>
        <a href="#features">Features</a> |{' '}
        <a href="#testimonials">Testimonials</a> |{' '}
        <a href="#benefits">Benefits</a>
      </nav>
    </footer>
  );
};

export default Footer;
