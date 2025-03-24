
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 0;
  padding: 0;
`;

interface NavLinkProps {
  active?: boolean;
}

const NavLink = styled(Link)<NavLinkProps>`
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease, transform 0.3s ease;
  ${({ active, theme }) => active && `border-bottom: 2px solid ${theme.colors.textLight};`}
  
  &:hover {
    color: #dcdcdc;
    transform: scale(1.05);
  }
`;

const CtaButton = styled(Link)`
  background-color: #fff;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border-color: #fff;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Header: React.FC = () => {
  const location = useLocation();
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Blog', to: '/blog' },
    { label: 'Login', to: '/login' },
  ];

  return (
    <HeaderContainer>
      <Logo to="/">TrailBlix</Logo>
      <nav>
        <NavList>
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink to={link.to} active={location.pathname === link.to}>
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <CtaButton to="/get-started">Get Started</CtaButton>
          </li>
        </NavList>
      </nav>
    </HeaderContainer>
  );
};

export default React.memo(Header);
