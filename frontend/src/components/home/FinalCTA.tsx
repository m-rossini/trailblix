import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import brandColors from '../../styles/brandcolors';

// Pulse animation for the CTA button on hover
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.07);
  }
  100% {
    transform: scale(1);
  }
`;

const FinalCTASection = styled.section`
  background: #fff; /* White background */
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: ${brandColors.primary};
`;

const CTASubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto;
  color: ${brandColors.textMedium};
`;

const CTAButton = styled(Link)`
  background-color: ${brandColors.primary};
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid ${brandColors.primary};
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    animation: ${pulse} 0.6s ease;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

const CTADisclaimer = styled.p`
  font-size: 0.9rem;
  color: ${brandColors.textMedium};
  margin: 0;
`;

const FinalCTA: React.FC = () => {
  return (
    <FinalCTASection>
      <CTATitle>Ready to Transform Your Career?</CTATitle>
      <CTASubtitle>
        Join thousands of professionals leveraging AI-powered insights to unlock their full potential. Act now and secure your future!
      </CTASubtitle>
      <CTAButton to="/get-started">Get Started</CTAButton>
      <CTADisclaimer>Limited spots available – don't miss out!</CTADisclaimer>
    </FinalCTASection>
  );
};

export default FinalCTA;
