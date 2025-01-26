// Testimonials.tsx

import React, { CSSProperties, useEffect, useState } from 'react';
import brandColors from '../../styles/brandcolors';

interface StyleMap {
  [key: string]: CSSProperties;
}

const testimonialStyles: StyleMap = {
  section: {
    padding: '3rem 1.5rem',
    textAlign: 'center' as const,
    backgroundColor: brandColors.background,
    position: 'relative'
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    // Fade in
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease'
  },
  containerVisible: {
    opacity: 1,
    transform: 'translateY(0)'
  },
  title: {
    color: brandColors.primary,
    fontSize: '2rem',
    margin: '0 0 1rem 0',
    fontWeight: 700
  },
  subtitle: {
    color: brandColors.textMedium,
    fontSize: '1rem',
    marginBottom: '2rem'
  },
  grid: {
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    justifyItems: 'center',
    alignItems: 'start'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    textAlign: 'left' as const,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
  },
  quoteText: {
    fontStyle: 'italic',
    color: brandColors.textDark,
    margin: 0,
    marginBottom: '1rem'
  },
  authorInfo: {
    marginTop: 'auto', // push name/role to bottom if quote is tall
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  authorName: {
    fontWeight: 600,
    margin: 0
  },
  authorRole: {
    fontSize: '0.9rem',
    color: brandColors.textMedium,
    margin: 0
  }
};

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar?: string; // optional avatar URL
}

const Testimonials: React.FC = () => {
  // fade-in effect
  const [visible, setVisible] = useState(false);

  // Track which card is hovered for the small lift effect
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Updated data: now 6 testimonials
  const testimonialsData: Testimonial[] = [
    {
      quote:
        '“Thanks to Trailblix, I transitioned from a junior analyst to a data scientist in under a year.”',
      name: 'Sarah',
      role: 'Data Scientist',
      avatar: '/assets/avatars/avatar-sarah.jpg'
    },
    {
      quote:
        '“The personalized learning paths gave me the exact courses I needed to level up my skill set.”',
      name: 'Alex',
      role: 'Product Manager',
      avatar: '/assets/avatars/avatar-alex.jpg'
    },
    {
      quote:
        '“The AI-driven career match was spot on! Trailblix saved me countless hours of searching.”',
      name: 'Priya',
      role: 'Business Analyst',
      avatar: '/assets/avatars/avatar-priya.jpg'
    },
    {
      quote:
        '“Real-time job alerts meant I could apply first — and actually landed my dream role!”',
      name: 'Michael',
      role: 'Marketing Specialist',
      avatar: '/assets/avatars/avatar-michael.jpg'
    },
    {
      quote:
        '“With Trailblix, I discovered an exciting field I had never considered. It completely changed my career trajectory.”',
      name: 'John',
      role: 'UX Researcher',
      avatar: '/assets/avatars/avatar-john.jpg'
    },
    {
      quote:
        '“Trailblix not only found me the perfect role but also mapped out a learning path that boosted my confidence and skills.”',
      name: 'Lucy',
      role: 'Frontend Developer',
      avatar: '/assets/avatars/avatar-lucy.jpg'
    }
  ];

  return (
    <section id="testimonials" style={testimonialStyles.section}>
      <div
        style={{
          ...testimonialStyles.container,
          ...(visible ? testimonialStyles.containerVisible : {})
        }}
      >
        <h2 style={testimonialStyles.title}>Success Stories</h2>
        <p style={testimonialStyles.subtitle}>
          Hear what our users have to say about their journeys with Trailblix.
        </p>

        <div style={testimonialStyles.grid}>
          {testimonialsData.map((testimonial, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={index}
                style={{
                  ...testimonialStyles.card,
                  ...(isHovered ? testimonialStyles.cardHover : {})
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <p style={testimonialStyles.quoteText}>{testimonial.quote}</p>
                <div style={testimonialStyles.authorInfo}>
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.name} avatar`}
                      style={testimonialStyles.avatar}
                    />
                  )}
                  <div>
                    <h4 style={testimonialStyles.authorName}>{testimonial.name}</h4>
                    <p style={testimonialStyles.authorRole}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
