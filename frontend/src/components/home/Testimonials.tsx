// Testimonials.tsx
import React from 'react';
import { CSSProperties } from 'react';

interface StyleMap {
  [key: string]: CSSProperties;
}

const testimonialStyles: StyleMap = {
  section: {
    padding: '3rem 2rem',
    textAlign: 'center' as const
  },
  title: {
    color: '#0d6efd'
  },
  wrapper: {
    display: 'grid',
    gap: '2rem',
    justifyContent: 'center',
    marginTop: '2rem'
  },
  blockquote: {
    fontStyle: 'italic'
  }
};

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" style={testimonialStyles.section}>
      <h2 style={testimonialStyles.title}>Success Stories</h2>
      <div style={testimonialStyles.wrapper}>
        <blockquote style={testimonialStyles.blockquote}>
          “Thanks to Trailblix, I transitioned from a junior analyst to a data scientist in under a year.”
          <cite> - Sarah, Data Scientist</cite>
        </blockquote>
        <blockquote style={testimonialStyles.blockquote}>
          “The personalized learning paths gave me the exact courses I needed to level up my skill set.”
          <cite> - Alex, Product Manager</cite>
        </blockquote>
      </div>
    </section>
  );
};

export default Testimonials;
