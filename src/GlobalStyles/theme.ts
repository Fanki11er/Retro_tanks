export const theme: Theme = {
  colors: {
    lightGray: 'rgba(217, 217, 217, 1)',
    darkBlue: '#010D26',
    darkerGray: 'rgba(127, 127, 127, 1)',
  },
  fontSizes: {},

  devices: {
    small: `min-width: 640px`,
    medium: `min-width: 1000px`,
    large: 'min-width: 2500px',
  },
};

export type Theme = {
  colors: {
    lightGray: string;
    darkBlue: string;
    darkerGray: string;
  };
  fontSizes: {};

  devices: {
    small: string;
    medium: string;
    large: string;
  };
};

export type StyledTheme = {
  theme: Theme;
};

