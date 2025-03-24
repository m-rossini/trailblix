import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import brandColors from '../../styles/brandcolors';

interface Testimonial {
  quote: string;
  detailedQuote: string;
  name: string;
  role: string;
  avatar: string;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const TestimonialsSection = styled.section`
  background: ${brandColors.background};
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease forwards;
`;

const SectionTitle = styled.h2`
  color: ${brandColors.primary};
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const SectionSubtitle = styled.p`
  color: ${brandColors.textMedium};
  font-size: 1.2rem;
  margin: 0;
`;

const SliderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  max-width: 1000px;
  margin: 0 auto;
  height: 300px;
`;

const SliderContainer = styled.div<{ translateX: number }>`
  display: flex;
  transition: transform 0.6s ease;
  transform: translateX(${({ translateX }) => translateX}%);
`;

const Slide = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;

const CardContent = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 2rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const QuoteText = styled.p`
  font-style: italic;
  color: ${brandColors.textDark};
  font-size: 1rem;
  margin: 0 0 1.5rem;
  line-height: 1.5;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const AuthorDetails = styled.div`
  text-align: left;
`;

const AuthorName = styled.h4`
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0;
  color: ${brandColors.textDark};
`;

const AuthorRole = styled.p`
  font-size: 0.9rem;
  color: ${brandColors.textMedium};
  margin: 0;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.85);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

const PrevButton = styled(NavigationButton)`
  left: 1rem;
`;

const NextButton = styled(NavigationButton)`
  right: 1rem;
`;

const DotContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ active }) => (active ? brandColors.primary : '#ccc')};
  transition: background 0.3s ease;
  cursor: pointer;
`;

const Testimonials: React.FC = () => {
  const testimonialsData: Testimonial[] = [
    {
      quote:
        '“Thanks to Trailblix, I transitioned from a junior analyst to a data scientist in under a year.”',
      detailedQuote:
        'Trailblix provided me with the perfect roadmap to enhance my skills and connect with the right opportunities.',
      name: 'Sarah',
      role: 'Data Scientist',
      avatar: '/assets/avatars/avatar-sarah.jpg',
    },
    {
      quote:
        '“The personalized learning paths gave me the exact courses I needed to level up my skill set.”',
      detailedQuote:
        'The Trailblix AI analyzed my profile and helped me pick courses that directly boosted my skills and career trajectory.',
      name: 'Alex',
      role: 'Product Manager',
      avatar: '/assets/avatars/avatar-alex.jpg',
    },
    {
      quote:
        '“Trailblix not only found me the perfect role but also mapped out a learning path that boosted my confidence and skills.”',
      detailedQuote:
        'With Trailblix, I gained clarity on my career path and the confidence to take on bigger challenges.',
      name: 'Lucy',
      role: 'Frontend Developer',
      avatar: '/assets/avatars/avatar-lucy.jpg',
    },
    {
      quote:
        '“I love how Trailblix makes career planning simple and effective.”',
      detailedQuote:
        'The insights and recommendations are spot-on, making my career decisions much easier.',
      name: 'Michael',
      role: 'UX Designer',
      avatar: '/assets/avatars/avatar-michael.jpg',
    },
    {
      quote:
        '“Trailblix’s real-time job alerts kept me ahead of the competition.”',
      detailedQuote:
        'I never missed an opportunity thanks to the instant notifications and customized recommendations.',
      name: 'Emily',
      role: 'Marketing Specialist',
      avatar: '/assets/avatars/avatar-emily.jpg',
    },
    {
      quote:
        '“The mentorship and community features of Trailblix are game-changers.”',
      detailedQuote:
        'Connecting with industry experts and peers has greatly enhanced my professional growth.',
      name: 'David',
      role: 'Software Engineer',
      avatar: '/assets/avatars/avatar-david.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialCount = testimonialsData.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonialCount]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialCount - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialCount);
  };

  return (
    <TestimonialsSection id="testimonials">
      <SectionHeader>
        <SectionTitle>Success Stories</SectionTitle>
        <SectionSubtitle>
          Hear what our users have to say about their journeys with Trailblix.
        </SectionSubtitle>
      </SectionHeader>
      <SliderWrapper>
        <SliderContainer translateX={-currentIndex * 100}>
          {testimonialsData.map((testimonial, index) => (
            <Slide key={index}>
              <CardContent>
                <QuoteText>{testimonial.quote}</QuoteText>
                <AuthorInfo>
                  <Avatar src={testimonial.avatar} alt={`${testimonial.name} avatar`} />
                  <AuthorDetails>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorRole>{testimonial.role}</AuthorRole>
                  </AuthorDetails>
                </AuthorInfo>
              </CardContent>
            </Slide>
          ))}
        </SliderContainer>
        <PrevButton onClick={goToPrev}>
          <FaChevronLeft />
        </PrevButton>
        <NextButton onClick={goToNext}>
          <FaChevronRight />
        </NextButton>
      </SliderWrapper>
      <DotContainer>
        {testimonialsData.map((_, index) => (
          <Dot key={index} active={index === currentIndex} onClick={() => setCurrentIndex(index)} />
        ))}
      </DotContainer>
    </TestimonialsSection>
  );
};

export default Testimonials;
