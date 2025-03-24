// src/styles/theme.ts
import brandColors from './brandcolors';

const theme = {
  colors: {
    primary: brandColors.primary,
    secondary: brandColors.gradientStart, // or any other secondary color
    accent: brandColors.gradientEnd,
    background: brandColors.background,
    textDark: brandColors.textDark,
    textMedium: brandColors.textMedium,
    textLight: brandColors.textLight || '#fff',
  },
  fonts: {
    heading: "'Roboto', sans-serif",
    body: "'Open Sans', sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
  },
  borderRadius: '8px',
};

export default theme;
