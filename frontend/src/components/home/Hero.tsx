import React, { useState } from 'react';
import styled from 'styled-components';
import brandColors from '../../styles/brandcolors';

// Container for the hero section with a purple gradient background
const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 85vh;
  margin: 0;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, ${brandColors.primary} 0%, #7b6ef6 50%, #8e85f6 100%);
  color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Generic shape component for parallax shapes
interface ShapeProps {
  offsetX: number;
  offsetY: number;
}
const Shape = styled.div<ShapeProps>`
  position: absolute;
  pointer-events: none;
  opacity: 0.07;
  background: #fff;
  border-radius: 50%;
  transform: translate(${props => props.offsetX}px, ${props => props.offsetY}px);
  transition: transform 0.05s ease-out;
`;

const ShapeOne = styled(Shape)`
  top: 5%;
  left: 5%;
  width: 150px;
  height: 150px;
  transform: translate(${props => props.offsetX * 0.02}px, ${props => props.offsetY * 0.02}px);
`;

const ShapeTwo = styled(Shape)`
  top: 10%;
  right: 10%;
  width: 200px;
  height: 200px;
  border-radius: 0;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  transform: translate(${props => props.offsetX * -0.03}px, ${props => props.offsetY * 0.03}px);
`;

const ShapeThree = styled(Shape)`
  bottom: 5%;
  left: 0%;
  width: 180px;
  height: 180px;
  transform: translate(${props => props.offsetX * 0.02}px, ${props => props.offsetY * -0.02}px);
`;

const ShapeFour = styled(Shape)`
  bottom: 10%;
  right: -5%;
  width: 250px;
  height: 250px;
  transform: translate(${props => props.offsetX * -0.01}px, ${props => props.offsetY * -0.02}px);
`;

const ShapeFive = styled(Shape)`
  top: 30%;
  left: 15%;
  width: 100px;
  height: 100px;
  transform: translate(${props => props.offsetX * 0.04}px, ${props => props.offsetY * -0.04}px);
`;

const ShapeSix = styled(Shape)`
  bottom: 0;
  left: 40%;
  width: 120px;
  height: 120px;
  border-radius: 0;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
  transform: translate(${props => props.offsetX * -0.02}px, ${props => props.offsetY * 0.03}px);
`;

// Content container for hero text and interactive elements
const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 900px;
  text-align: center;
`;

// Wrapper for the info icon and its tooltip positioned above the headline
const InfoWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 1rem;
`;

// Info icon styled as a circle
const InfoIcon = styled.div`
  background-color: #fff; /* White circle */
  color: ${brandColors.primary}; /* Purple "I" icon */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

// Tooltip positioned beneath the info icon
const Tooltip = styled.div`
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  color: ${brandColors.textDark};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 220px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1;

  &.visible {
    opacity: 1;
    pointer-events: auto;
  }
`;

// Headline with Trailblix-specific messaging
const Headline = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
  color: #fff;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

// Subheadline with supportive text
const SubHeadline = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #f0f0f0;

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

// Search bar container: two dropdowns and a "Get Started" button
const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  margin: 0 auto 1.5rem auto;
  max-width: 600px;

  @media (min-width: 576px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const StyledSelect = styled.select`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
  outline: none;
`;

const SearchButton = styled.button`
  background-color: ${brandColors.primary};
  color: #fff;
  border: none;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  min-width: 160px;

  &:hover {
    background-color: #3e37d9;
  }
`;

// Features container: laid out in a row with improved spacing and interactive effects
const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #f0f0f0;
  font-size: 1.1rem;
  transition: transform 0.2s ease, background-color 0.2s ease, padding 0.2s ease;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  
  &:hover {
    transform: scale(1.05);
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &:hover span {
    transform: scale(1.1) rotate(10deg);
  }
`;

const BulletIcon = styled.span`
  background-color: #fff;
  color: ${brandColors.primary};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;       /* increased width */
  height: 32px;      /* increased height */
  font-size: 1rem;
  transition: transform 0.2s ease;
  box-sizing: border-box;
  flex-shrink: 0;    /* prevent shrinking */
`;

const Hero: React.FC = () => {
  // Parallax offsets for background shapes
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  // Tooltip visibility for the info icon
  const [tooltipVisible, setTooltipVisible] = useState(false);
  // State for the search bar selections
  const [role, setRole] = useState('Developer');
  const [experience, setExperience] = useState('0-2 Years');

  // Update parallax offsets based on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffsetX(x);
    setOffsetY(y);
  };

  // Search action (to be integrated with actual functionality)
  const handleSearch = () => {
    console.log(`Role: ${role}, Experience: ${experience}`);
  };

  return (
    <HeroContainer onMouseMove={handleMouseMove}>
      {/* Background parallax shapes */}
      <ShapeOne offsetX={offsetX} offsetY={offsetY} />
      <ShapeTwo offsetX={offsetX} offsetY={offsetY} />
      <ShapeThree offsetX={offsetX} offsetY={offsetY} />
      <ShapeFour offsetX={offsetX} offsetY={offsetY} />
      <ShapeFive offsetX={offsetX} offsetY={offsetY} />
      <ShapeSix offsetX={offsetX} offsetY={offsetY} />

      <HeroContent>
        {/* Info icon and tooltip positioned above the headline */}
        <InfoWrapper>
          <InfoIcon
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            ℹ
          </InfoIcon>
          <Tooltip className={tooltipVisible ? 'visible' : ''}>
            Trailblix uses AI to match you with the best career opportunities and learning paths.
          </Tooltip>
        </InfoWrapper>

        <Headline>Empower Your Career with Trailblix</Headline>
        <SubHeadline>
          Discover personalized insights, tailored learning paths, and job matches to shape your future.
        </SubHeadline>

        <SearchBar>
          <StyledSelect value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Marketer">Marketer</option>
          </StyledSelect>

          <StyledSelect value={experience} onChange={(e) => setExperience(e.target.value)}>
            <option value="0-2 Years">0-2 Years</option>
            <option value="3-5 Years">3-5 Years</option>
            <option value="5+ Years">5+ Years</option>
          </StyledSelect>

          <SearchButton onClick={handleSearch}>Get Started</SearchButton>
        </SearchBar>

        <FeaturesContainer>
          <FeatureItem>
            <BulletIcon>✓</BulletIcon>
            Personalized Learning Paths
          </FeatureItem>
          <FeatureItem>
            <BulletIcon>✓</BulletIcon>
            AI-Driven Job Matches
          </FeatureItem>
          <FeatureItem>
            <BulletIcon>✓</BulletIcon>
            Expert Career Insights
          </FeatureItem>
          <FeatureItem>
            <BulletIcon>✓</BulletIcon>
            Time-Saving Tools
          </FeatureItem>
        </FeaturesContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
