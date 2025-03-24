import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiZap, FiSearch, FiChevronDown } from 'react-icons/fi';
import { FaRocket, FaLightbulb } from 'react-icons/fa';
import brandColors from '../../styles/brandcolors';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  longDesc: string;
}

const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BenefitsSection = styled.section`
  background: ${brandColors.background};
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
`;

const BenefitsHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${brandColors.primary};
  margin: 0;
  font-weight: 700;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${brandColors.textMedium};
  margin: 0.5rem 0 0;
`;

// Vertical list for benefit cards
const VerticalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BenefitCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  cursor: pointer;
  animation: ${fadeSlideIn} 0.8s ease forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
`;

const IconArea = styled.div`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${brandColors.primary} 0%, #794cfe 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: #fff;
`;

const TextArea = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BenefitTitleText = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${brandColors.textDark};
`;

const ShortDesc = styled.p<{ highlighted: boolean }>`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${({ highlighted }) =>
    highlighted ? brandColors.primary : brandColors.textMedium};
  transition: color 0.3s ease;
`;

const LongDesc = styled.p<{ expanded: boolean }>`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: ${brandColors.textDark};
  max-height: ${({ expanded }) => (expanded ? '150px' : '0')};
  overflow: hidden;
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  transition: max-height 0.5s ease, opacity 0.5s ease;
`;

// Toggle indicator icon positioned at the bottom right of the card
const ToggleIndicator = styled(FiChevronDown)<{ expanded: boolean }>`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 1.2rem;
  color: ${brandColors.primary};
  transition: transform 0.3s ease;
  transform: rotate(${({ expanded }) => (expanded ? '180deg' : '0deg')});
`;

const BenefitsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BenefitCardComponent: React.FC<{
  benefit: Benefit;
  index: number;
  expanded: boolean;
  toggle: (index: number) => void;
}> = ({ benefit, index, expanded, toggle }) => {
  return (
    <BenefitCard onClick={() => toggle(index)}>
      <CardContent>
        <IconArea>{benefit.icon}</IconArea>
        <TextArea>
          <BenefitTitleText>{benefit.title}</BenefitTitleText>
          <ShortDesc highlighted={expanded}>{benefit.shortDesc}</ShortDesc>
          <LongDesc expanded={expanded}>{benefit.longDesc}</LongDesc>
        </TextArea>
        <ToggleIndicator expanded={expanded} />
      </CardContent>
    </BenefitCard>
  );
};

const Benefits: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const benefitsData: Benefit[] = [
    {
      icon: <FiZap />,
      title: 'Save Time',
      shortDesc: 'Quick, focused recommendations.',
      longDesc:
        'Our AI filters endless possibilities to deliver curated roles and learning paths so you can act quickly and confidently.',
    },
    {
      icon: <FaLightbulb />,
      title: 'Gain Insights',
      shortDesc: 'Make data-backed decisions.',
      longDesc:
        'Harness predictive analytics to understand industry trends and steer your career in the right direction.',
    },
    {
      icon: <FaRocket />,
      title: 'Accelerate Growth',
      shortDesc: 'Tailored paths for your development.',
      longDesc:
        'Get a personalized roadmap through skill-gap analysis and goal setting to fast-track your career growth.',
    },
    {
      icon: <FiSearch />,
      title: 'Stay Updated',
      shortDesc: 'Real-time alerts for opportunities.',
      longDesc:
        'Receive instant notifications for roles matching your evolving ambitions so you never miss out.',
    },
  ];

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <BenefitsSection id="benefits" ref={containerRef}>
      <BenefitsHeader>
        <SectionTitle>Benefits of TrailBlix</SectionTitle>
        <SectionSubtitle>
          Discover how TrailBlix empowers your career journey.
        </SectionSubtitle>
      </BenefitsHeader>
      <BenefitsContainer>
        {visible && (
          <VerticalList>
            {benefitsData.map((benefit, index) => (
              <BenefitCardComponent
                key={index}
                benefit={benefit}
                index={index}
                expanded={expandedIndex === index}
                toggle={toggleExpanded}
              />
            ))}
          </VerticalList>
        )}
      </BenefitsContainer>
    </BenefitsSection>
  );
};

export default Benefits;
