// Features.tsx

import React, { CSSProperties, useEffect, useState } from 'react';
import brandColors from '../../styles/brandcolors';

interface StyleMap {
  [key: string]: CSSProperties;
}

const featureStyles: StyleMap = {
  section: {
    // Overall section with a brand-based background or neutral color
    background: brandColors.background,
    padding: '3rem 2rem',
    position: 'relative',
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    // optional fade in
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease'
  },
  containerVisible: {
    opacity: 1,
    transform: 'translateY(0)'
  },
  // Each row, with optional background
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem',
    borderRadius: '12px',
    position: 'relative'
  },
  // We'll invert row direction for odd items
  rowReverse: {
    flexDirection: 'row-reverse' as const
  },
  // For even rows, add a brand-themed background
  rowEvenBackground: {
    backgroundColor: '#f2f4ff' // a gentle brand color or lighten of brandColors.primary
  },
  textContainer: {
    flex: '1 1 50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 700,
    margin: '0 0 1rem 0',
    color: brandColors.textDark
  },
  subTitle: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: brandColors.textMedium,
    margin: 0
  },
  // We'll highlight certain phrases in subTitle by wrapping them in a <span> if we want
  highlight: {
    color: brandColors.primary,
    fontWeight: 600
  },
  imageContainer: {
    flex: '1 1 50%',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  },
  // Brand color shape behind the image
  shape: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: brandColors.primary,
    opacity: 0.15,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  image: {
    width: '90%',
    maxWidth: '350px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    zIndex: 1 // ensure the image is above the shape
  }
};

// For each feature row
interface FeatureData {
  title: string;
  description: string;
  image: string; // path or URL to an image
}

const Features: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // fade in after mount
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Example data
  const featuresData: FeatureData[] = [
    {
      title: 'AI-Driven Career Match',
      description:
        'Leverage cutting-edge AI to uncover job roles aligning with your unique strengths. Stay ahead of the curve with real-time analytics and data-driven insights.',
      image: '/assets/feature-ai-match.png'
    },
    {
      title: 'Personalized Learning Paths',
      description:
        'Bridge skill gaps fast. Our curated roadmaps help you master new tools, techniques, and knowledge—accelerating your journey toward professional excellence.',
      image: '/assets/feature-learning-path.png'
    },
    {
      title: 'Real-Time Job Alerts',
      description:
        'Never miss an opportunity. Get instant notifications for roles matching your evolving career ambitions—always be the first to respond.',
      image: '/assets/feature-job-alerts.png'
    },
    {
      title: 'Career Progression Tracking',
      description:
        'Track milestones, celebrate successes, and adapt quickly. Maintain clarity on your trajectory and keep your momentum strong.',
      image: '/assets/feature-progression.png'
    }
  ];

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
          // row styling
          const rowStyle: CSSProperties = {
            ...featureStyles.row,
            ...(isEven ? featureStyles.rowEvenBackground : {}),
            ...(isEven ? {} : featureStyles.rowReverse)
          };

          return (
            <div key={index} style={rowStyle}>
              {/* TEXT BLOCK */}
              <div style={featureStyles.textContainer}>
                <h2 style={featureStyles.title}>{feature.title}</h2>
                <p style={featureStyles.subTitle}>{feature.description}</p>
              </div>

              {/* IMAGE BLOCK */}
              <div style={featureStyles.imageContainer}>
                {/* Brand color shape behind the image for style */}
                <div style={featureStyles.shape} />
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
