import React, { CSSProperties } from 'react';
import brandColors from '../../styles/brandcolors';

const testimonialStyles = {
  section: {
    padding: '4rem 2rem',
    textAlign: 'center' as const,
    backgroundColor: brandColors.background,
  },
  title: {
    color: brandColors.primary,
    fontSize: '2.4rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
  },
  subtitle: {
    color: brandColors.textMedium,
    fontSize: '1.2rem',
    marginBottom: '3rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    justifyItems: 'center',
    alignItems: 'start',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    textAlign: 'left' as const,
    position: 'relative' as const,
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  cardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  },
  quoteText: {
    fontStyle: 'italic',
    color: brandColors.textDark,
    fontSize: '1rem',
    marginBottom: '1.5rem',
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  authorName: {
    fontWeight: 700,
    fontSize: '1.1rem',
    margin: 0,
  },
  authorRole: {
    fontSize: '0.9rem',
    color: brandColors.textMedium,
    margin: 0,
  },
  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    opacity: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center' as const,
    padding: '1.5rem',
    transition: 'opacity 0.3s ease',
    borderRadius: '12px',
  },
  overlayVisible: {
    opacity: 1,
  },
  overlayText: {
    fontSize: '1rem',
    marginBottom: '1rem',
    lineHeight: '1.5',
  },
};

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  detailedQuote: string;
}

const Testimonials: React.FC = () => {
  const testimonialsData: Testimonial[] = [
    {
      quote: '“Thanks to Trailblix, I transitioned from a junior analyst to a data scientist in under a year.”',
      detailedQuote:
        'Trailblix provided me with the perfect roadmap to enhance my skills and connect with the right opportunities.',
      name: 'Sarah',
      role: 'Data Scientist',
      avatar: '/assets/avatars/avatar-sarah.jpg',
    },
    {
      quote: '“The personalized learning paths gave me the exact courses I needed to level up my skill set.”',
      detailedQuote:
        'The Trailblix AI analyzed my profile and helped me pick courses that directly boosted my skills and career trajectory.',
      name: 'Alex',
      role: 'Product Manager',
      avatar: '/assets/avatars/avatar-alex.jpg',
    },
    {
      quote: '“Trailblix not only found me the perfect role but also mapped out a learning path that boosted my confidence and skills.”',
      detailedQuote:
        'With Trailblix, I gained clarity on my career path and confidence to take on bigger challenges.',
      name: 'Lucy',
      role: 'Frontend Developer',
      avatar: '/assets/avatars/avatar-lucy.jpg',
    },
  ];

  return (
    <section style={testimonialStyles.section}>
      <h2 style={testimonialStyles.title}>Success Stories</h2>
      <p style={testimonialStyles.subtitle}>
        Hear what our users have to say about their journeys with Trailblix.
      </p>

      <div style={testimonialStyles.grid}>
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            style={testimonialStyles.card}
            onMouseEnter={(e) => {
              const overlay = e.currentTarget.querySelector('.overlay');
              if (overlay) overlay.classList.add('visible');
            }}
            onMouseLeave={(e) => {
              const overlay = e.currentTarget.querySelector('.overlay');
              if (overlay) overlay.classList.remove('visible');
            }}
          >
            <p style={testimonialStyles.quoteText}>{testimonial.quote}</p>
            <div style={testimonialStyles.authorInfo}>
              <img
                src={testimonial.avatar}
                alt={`${testimonial.name} avatar`}
                style={testimonialStyles.avatar}
              />
              <div>
                <h4 style={testimonialStyles.authorName}>{testimonial.name}</h4>
                <p style={testimonialStyles.authorRole}>{testimonial.role}</p>
              </div>
            </div>

            {/* Overlay */}
            <div
              className="overlay"
              style={{
                ...testimonialStyles.overlay,
              }}
            >
              <p style={testimonialStyles.overlayText}>
                {testimonial.detailedQuote}
              </p>
              <h4 style={{ ...testimonialStyles.authorName, color: '#fff' }}>
                {testimonial.name}
              </h4>
              <p style={{ ...testimonialStyles.authorRole, color: '#fff' }}>
                {testimonial.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
