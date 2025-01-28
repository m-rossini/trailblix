// Features.tsx

import React, { CSSProperties, useEffect, useState } from 'react';
import brandColors from '../../styles/brandcolors';

interface StyleMap {
  [key: string]: CSSProperties;
}

const featureStyles: StyleMap = {
  section: {
    background: brandColors.background, // or '#fff' if you prefer
    padding: '3rem 2rem',
    position: 'relative',
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease'
  },
  containerVisible: {
    opacity: 1,
    transform: 'translateY(0)'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem',
    borderRadius: '12px',
    position: 'relative' as const
  },
  rowReverse: {
    flexDirection: 'row-reverse' as const
  },
  textContainer: {
    flex: '1 1 50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1rem'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 700,
    margin: '0 0 0.5rem 0',
    color: brandColors.textDark
  },
  subTitle: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: brandColors.textMedium,
    margin: 0
  },
  // Toggle area
  toggleArea: {
    marginTop: '0.5rem',
    transition: 'max-height 0.4s ease',
    overflow: 'hidden'
  },
  toggleButton: {
    color: brandColors.primary,
    background: 'none',
    border: 'none',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'underline',
    margin: 0,
    padding: 0,
    alignSelf: 'flex-start'
  },
  bulletPoints: {
    listStyle: 'disc',
    paddingLeft: '1.5rem',
    margin: '0.5rem 0 0'
  },
  imageContainer: {
    flex: '1 1 50%',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  },
  image: {
    width: '90%',
    maxWidth: '350px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    zIndex: 1
  }
};

interface FeatureData {
  title: string;
  description: string;
  image: string;
  extraPoints: string[]; // bullet points or extra details
}

const Features: React.FC = () => {
  const [visible, setVisible] = useState(false);

  // Track which feature is toggled open, if any
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const featuresData: FeatureData[] = [
    {
      title: 'AI-Driven Career Match',
      description:
        'Leverage cutting-edge AI to uncover job roles aligning with your unique strengths. Stay ahead of the curve with real-time analytics and data-driven insights.',
      image: '/assets/feature-ai-match.svg', 
      extraPoints: [
        'Analyzes past experiences & skills',
        'Real-time industry match updates',
        'Predictive analytics for future roles'
      ]
    },
    {
      title: 'Personalized Learning Paths',
      description:
        'Bridge skill gaps fast. Our curated roadmaps help you master new tools, techniques, and knowledge—accelerating your journey toward professional excellence.',
      image: '/assets/feature-learning-path.png',
      extraPoints: [
        'Adaptive course recommendations',
        'Progress tracking & milestone alerts',
        'Peer mentorship & community support'
      ]
    },
    {
      title: 'Real-Time Job Alerts',
      description:
        'Never miss an opportunity. Get instant notifications for roles matching your evolving career ambitions—always be the first to respond.',
      image: '/assets/feature-job-alerts.png',
      extraPoints: [
        'Instant push notifications',
        'Customizable filters & keywords',
        'Direct recruiter connect options'
      ]
    },
    {
      title: 'Career Progression Tracking',
      description:
        'Track milestones, celebrate successes, and adapt quickly. Maintain clarity on your trajectory and keep your momentum strong.',
      image: '/assets/feature-progression.png',
      extraPoints: [
        'Visual timeline of achievements',
        'Goal-setting & reflection tools',
        'Expert feedback on improvements'
      ]
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="features" style={featureStyles.section}>
      <div
        style={{
          ...featureStyles.container,
          ...(visible ? featureStyles.containerVisible : {})
        }}
      >
        {featuresData.map((feature, index) => {
          const isEven = index % 2 === 0;
          const rowStyle: CSSProperties = {
            ...featureStyles.row,
            ...(isEven ? {} : featureStyles.rowReverse)
          };

          const isOpen = openIndex === index;

          return (
            <div key={index} style={rowStyle}>
              {/* TEXT BLOCK */}
              <div style={featureStyles.textContainer}>
                <h2 style={featureStyles.title}>{feature.title}</h2>
                <p style={featureStyles.subTitle}>{feature.description}</p>
                
                {/* Toggle button to show more bullet points */}
                {feature.extraPoints && feature.extraPoints.length > 0 && (
                  <>
                    <button
                      style={featureStyles.toggleButton}
                      onClick={() => handleToggle(index)}
                    >
                      {isOpen ? 'Show Less' : 'Show More'}
                    </button>
                    <div
                      style={{
                        ...featureStyles.toggleArea,
                        maxHeight: isOpen ? '200px' : '0'
                      }}
                    >
                      <ul style={featureStyles.bulletPoints}>
                        {feature.extraPoints.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>

              {/* IMAGE BLOCK */}
              <div style={featureStyles.imageContainer}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  style={featureStyles.image}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
