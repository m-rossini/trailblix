import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaLinkedin } from 'react-icons/fa';
import brandColors from '../../styles/brandcolors';

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// --- Page Containers ---
const AboutContainer = styled.section`
  background: ${brandColors.background};
  padding: 4rem 2rem;
  animation: ${fadeIn} 1s ease-out;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, ${brandColors.primary} 0%, #7b6ef6 50%, #8e85f6 100%);
  color: #fff;
  padding: 3rem 2rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
`;

const HeroTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  margin: 0;
`;

const HeroTagline = styled.p`
  font-size: 1.3rem;
  margin-top: 1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ContentSection = styled.div`
  max-width: 1000px;
  margin: 0 auto 3rem;
  text-align: center;
`;

const SectionHeading = styled.h2`
  font-size: 2.4rem;
  color: ${brandColors.primary};
  margin-bottom: 1rem;
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  color: ${brandColors.textMedium};
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 3rem;
`;

// --- Team Section ---
const TeamSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

// --- Team Member Card ---
const TeamCard = styled.div`
  position: relative;
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
`;

const MemberPhoto = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const MemberName = styled.h3`
  font-size: 1.8rem;
  color: ${brandColors.textDark};
  margin: 0 0 0.5rem;
`;

const MemberRole = styled.p`
  font-size: 1rem;
  color: ${brandColors.primary};
  font-weight: 600;
  margin: 0 0 1rem;
`;

const MemberBio = styled.p`
  font-size: 1rem;
  color: ${brandColors.textMedium};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

// Ribbon Badge for LinkedIn
const Ribbon = styled.a`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${brandColors.primary};
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

// --- TeamMember Component ---
interface TeamMemberProps {
  photo: string;
  name: string;
  role: string;
  bio: string;
  linkedInUrl: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ photo, name, role, bio, linkedInUrl }) => (
  <TeamCard>
    <MemberPhoto src={photo} alt={name} />
    <MemberName>{name}</MemberName>
    <MemberRole>{role}</MemberRole>
    <MemberBio>{bio}</MemberBio>
    <Ribbon href={linkedInUrl} target="_blank" rel="noopener noreferrer">
      <FaLinkedin />
    </Ribbon>
  </TeamCard>
);

const About: React.FC = () => {
  return (
    <AboutContainer>
      <Hero>
        <HeroTitle>Welcome to Trailblix</HeroTitle>
        <HeroTagline>
          Empowering professionals with AI-driven insights to unlock your full potential.
        </HeroTagline>
      </Hero>
      <ContentSection>
        <SectionHeading>Our Story</SectionHeading>
        <SectionText>
          Founded with a passion for innovation, Trailblix transforms career development by harnessing the power of AI.
          We deliver personalized insights, tailored learning paths, and real-time job recommendations to help you navigate
          your career with clarity and confidence.
        </SectionText>
      </ContentSection>
      <ContentSection>
        <SectionHeading>Our Mission</SectionHeading>
        <SectionText>
          We believe every professional deserves a clear roadmap to success. Our mission is to democratize career insights,
          using cutting-edge AI and data-driven strategies to accelerate growth in a rapidly evolving job market.
        </SectionText>
      </ContentSection>
      <TeamSection>
        <SectionHeading>Meet Our Leadership</SectionHeading>
        <TeamGrid>
          <TeamMember
            photo="/assets/pedro.jpg"
            name="Pedro Perez Serapião"
            role="CEO"
            bio="As CEO of Trailblix, Pedro drives our vision to revolutionize career development with advanced AI insights and data-driven strategies."
            linkedInUrl="https://www.linkedin.com/in/pedro-perez-serapi%C3%A3o-379079121/"
          />
          <TeamMember
            photo="/assets/marcos.jpg"
            name="Marcos Rossini"
            role="CTO"
            bio="As CTO, M. Tengelmann leads our technical innovation, ensuring Trailblix remains at the cutting edge of AI and data analytics."
            linkedInUrl="https://www.linkedin.com/in/mtengelmann/"
          />
        </TeamGrid>
      </TeamSection>
    </AboutContainer>
  );
};

export default About;
