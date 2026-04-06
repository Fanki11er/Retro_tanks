export const theme: Theme = {
  colors: {
    lightGray: "rgba(217, 217, 217, 1)",
    darkBlue: "#010D26",
    darkerGray: "rgba(127, 127, 127, 1)",
    orange: "rgba(255, 96, 2, 1)",
    yellow: "rgba(255, 255, 111, 1)",
    white: "rgba(255, 255, 255, 1)",
    red: "rgba(181, 49, 33, 1)",
  },

  devices: {
    small: `min-width: 640px`,
    medium: `min-width: 1000px`,
    large: "min-width: 2500px",
  },
  fonts: {
    main: `"Press Start 2P", system-ui`,
  },
};

export type Theme = {
  colors: {
    lightGray: string;
    darkBlue: string;
    darkerGray: string;
    orange: string;
    yellow: string;
    white: string;
    red: string;
  };

  devices: {
    small: string;
    medium: string;
    large: string;
  };

  fonts: {
    main: string;
  };
};
