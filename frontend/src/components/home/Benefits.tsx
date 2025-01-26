// Benefits.tsx

import React, { CSSProperties, useEffect, useState } from 'react';
import brandColors from '../../styles/brandcolors';
import { FiZap, FiSearch } from 'react-icons/fi';  // example Feather icons
import { FaRocket, FaLightbulb } from 'react-icons/fa'; // example FontAwesome icons

interface StyleMap {
  [key: string]: CSSProperties;
}

const benefitsStyles: StyleMap = {
  section: {
    backgroundColor: brandColors.background,
    padding: '3rem 2rem',
    textAlign: 'center' as const,
    position: 'relative'
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
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
    fontWeight: 700,
    marginBottom: '1rem'
  },
  subtitle: {
    color: brandColors.textMedium,
    marginBottom: '2rem',
    fontSize: '1rem'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem'
  },
  listItemContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    border: `1px solid #ddd`,
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1rem',
    cursor: 'pointer',
    position: 'relative',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  hoveredItem: {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
  },
  // We’ll do a brand gradient background behind the icon
  iconArea: {
    flexShrink: 0,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    // brand gradient
    background: `linear-gradient(135deg, ${brandColors.primary} 0%, #794cfe 100%)`,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem'
  },
  textArea: {
    textAlign: 'left' as const,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  itemTitle: {
    color: brandColors.textDark,
    fontWeight: 600,
    margin: 0
  },
  hiddenDesc: {
    fontSize: '0.9rem',
    color: brandColors.textMedium,
    margin: 0,
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease'
  },
  hiddenDescVisible: {
    maxHeight: '200px'
  }
};

interface Benefit {
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  longDesc: string;
}

const Benefits: React.FC = () => {
  const [visible, setVisible] = useState(false); 
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Switch out your emojis for icons from react-icons
  const benefitsData: Benefit[] = [
    {
      icon: <FiZap />,  // "fast" or "save time" icon
      title: 'Save Time with Focused Recommendations',
      shortDesc: 'Speed up your career search with AI-driven suggestions.',
      longDesc:
        'We filter endless possibilities into curated roles and learning paths, helping you act quickly and confidently.'
    },
    {
      icon: <FaLightbulb />, // "insight" icon
      title: 'Build Confidence with AI-Powered Insights',
      shortDesc: 'Make data-backed decisions about your future.',
      longDesc:
        'Harness predictive analytics to see where your industry is heading and steer your career in the right direction.'
    },
    {
      icon: <FaRocket />, // "rocket" for growth
      title: 'Accelerate Your Growth with Tailored Paths',
      shortDesc: 'Focus on what matters most for your development.',
      longDesc:
        'Through skill-gap analysis and personal goal setting, get a roadmap that propels you forward faster than ever.'
    },
    {
      icon: <FiSearch />,
      title: 'Stay Ahead of the Industry Curve',
      shortDesc: 'Never fall behind in a rapidly evolving market.',
      longDesc:
        'We monitor emerging trends and skills, giving you real-time alerts and learning materials to keep you competitive.'
    }
  ];

  return (
    <section id="benefits" style={benefitsStyles.section}>
      <div
        style={{
          ...benefitsStyles.container,
          ...(visible ? benefitsStyles.containerVisible : {})
        }}
      >
        <h2 style={benefitsStyles.title}>Why Trailblix?</h2>
        <p style={benefitsStyles.subtitle}>
          Discover the advantages that set us apart from traditional career platforms.
        </p>
        <ul style={benefitsStyles.list}>
          {benefitsData.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <li
                key={index}
                style={{
                  ...benefitsStyles.listItemContainer,
                  ...(isHovered ? benefitsStyles.hoveredItem : {})
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icon with brand gradient */}
                <div style={benefitsStyles.iconArea}>{item.icon}</div>

                {/* Text */}
                <div style={benefitsStyles.textArea}>
                  <h3 style={benefitsStyles.itemTitle}>{item.title}</h3>
                  <p style={{ margin: 0 }}>{item.shortDesc}</p>
                  <p
                    style={{
                      ...benefitsStyles.hiddenDesc,
                      ...(isHovered ? benefitsStyles.hiddenDescVisible : {})
                    }}
                  >
                    {item.longDesc}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Benefits;
