export const theme: Theme = {
  colors: {
    darkBlue: "#010D26",
  },
  fontSizes: {},

  devices: {
    small: `max-width: 720px`,
    medium: `max-width: 1200px`,
    large: "max-width: 2500px",
  },
};

export type Theme = {
  colors: {
    darkBlue: string;
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
