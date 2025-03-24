import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import brandColors from '../../styles/brandcolors';

interface FeatureData {
  title: string;
  description: string;
  image: string;
  extraPoints: string[];
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FeaturesSection = styled.section`
  background: ${brandColors.background};
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease forwards;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: #f9f9f9;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${brandColors.textDark};
  margin: 0 0 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: ${brandColors.textMedium};
  margin: 0 0 1rem;
  line-height: 1.5;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${brandColors.primary};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: ${brandColors.primary};
  }
`;

const ExtraContent = styled.div<{ expanded: boolean }>`
  max-height: ${({ expanded }) => (expanded ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease;
`;

const BulletList = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  margin: 0;
  color: ${brandColors.textDark};
  font-size: 0.95rem;
  line-height: 1.4;
`;

const FeatureCard: React.FC<{ feature: FeatureData }> = ({ feature }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card>
      <CardImage src={feature.image} alt={feature.title} />
      <CardContent>
        <CardTitle>{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
        <ToggleButton onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show Less' : 'Show More'}
        </ToggleButton>
        <ExtraContent expanded={expanded}>
          <BulletList>
            {feature.extraPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </BulletList>
        </ExtraContent>
      </CardContent>
    </Card>
  );
};

const Features: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const featuresData: FeatureData[] = [
    {
      title: 'AI-Driven Career Match',
      description: 'Discover job roles that align perfectly with your unique strengths using data-driven insights.',
      image: '/assets/feature-ai-match.svg',
      extraPoints: [
        'Analyzes your skills & experiences',
        'Real-time industry updates',
        'Predictive analytics for future roles',
      ],
    },
    {
      title: 'Personalized Learning Paths',
      description: 'Accelerate your career with tailored learning roadmaps that bridge your skill gaps.',
      image: '/assets/feature-learning-path.svg',
      extraPoints: [
        'Adaptive course recommendations',
        'Progress tracking & milestone alerts',
        'Community mentorship & support',
      ],
    },
    {
      title: 'Real-Time Job Alerts',
      description: 'Stay ahead with instant notifications for roles matching your evolving ambitions.',
      image: '/assets/feature-job-alerts.svg',
      extraPoints: [
        'Instant push notifications',
        'Customizable filters & keywords',
        'Direct recruiter connections',
      ],
    },
    {
      title: 'Career Progression Tracking',
      description: 'Monitor your growth with an intuitive timeline and goal-setting tools.',
      image: '/assets/feature-progression.svg',
      extraPoints: [
        'Visual timeline of achievements',
        'Goal-setting & reflection tools',
        'Expert feedback for improvement',
      ],
    },
    {
      title: 'Community & Networking',
      description: 'Connect with peers and experts to expand your network and uncover new opportunities.',
      image: '/assets/feature-community.svg',
      extraPoints: [
        'Engage in professional discussions',
        'Attend networking events',
        'Collaborate on projects',
      ],
    },
    {
      title: 'Mentorship & Guidance',
      description: 'Gain personalized mentorship from seasoned professionals to fast-track your career growth.',
      image: '/assets/feature-mentorship.svg',
      extraPoints: [
        'One-on-one coaching sessions',
        'Tailored career advice',
        'Access to exclusive resources',
      ],
    },
  ];

  return (
    <FeaturesSection id="features">
      {visible && (
        <Grid>
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </Grid>
      )}
    </FeaturesSection>
  );
};

export default Features;
