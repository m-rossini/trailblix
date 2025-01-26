// FinalCTA.tsx
import React from 'react';
import { CSSProperties } from 'react';

interface StyleMap {
  [key: string]: CSSProperties;
}

const finalCTAStyles: StyleMap = {
  section: {
    padding: '3rem 2rem',
    textAlign: 'center' as const,
    backgroundColor: '#f8f9fa'
  },
  button: {
    backgroundColor: '#ffc107',
    border: 'none',
    padding: '1rem 2rem',
    cursor: 'pointer',
    fontSize: '1.2rem',
    marginTop: '1rem'
  }
};

const FinalCTA: React.FC = () => {
  return (
    <section style={finalCTAStyles.section}>
      <h2>Ready to Launch Your Next Career Chapter?</h2>
      <button style={finalCTAStyles.button}>Start Now — It’s Free</button>
    </section>
  );
};

export default FinalCTA;
