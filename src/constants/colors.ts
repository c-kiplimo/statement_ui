//const Primary = "var(--secondary-brand-color-secondary)";

const MotusTheme = {
  primary: "var(--brand-brand-primary, #84BD00)",

  secondaryBrandColorSecondary: "var(--brand-brand-secondary, #003A49)",

  functionalColorsDanger: "var(--functional-colors-danger, #F30039)",
  functionalColorWarning: "var(--functional-colors-warning, #FFBD66)",
  functionalColorsSuccess: "var(--functional-colors-success, #17D05B)",
  functionalColorsInfo: "var(--functional-colors-info, #4272DD)",

  functionalLightColorsDanger100:
    "var(--functional-light-colors-danger-100, #FDCCD7)",
  functionalLightColorsDanger200:
    "var(--functional-light-colors-danger-200, #FBB3C4)",

  functionalLightColorsSuccess100:
    "var(--functional-light-colors-success-100, #D1F6DE)",
  functionalLightColorsSuccess200:
    "var(--functional-light-colors-success-200, #B9F1CE)",

  functionalLightColorsInfo100:
    "var(--functional-light-colors-info-100, #D9E3F8)",
  functionalLightColorsInfo200:
    "var(--functional-light-colors-info-200, #C6D5F5)",

  functionalLightColorsWarning:
    "var(--functional-light-colors-warning-200, #FFEBD1)",
  functionalLightColorsWarning100:
    "var(--functional-light-colors-warning-100, #FFF2E0)",
  functionalLightColorsWarning200:
    "var(--functional-light-colors-warning-200, #FFEBD1)",

  tintColorsTint100: "var(--tint-colors-tint-100, #979992)",
  tintColorsTint200: "var(--tint-colors-tint-200, #6F7269)",
  tintColorsTint300: "var(--tint-colors-tint-300, #5C5F54)",

  shadeColorsShade100: "var(--shade-colors-shade-100, #1A2600)",
  shadeColorsShade200: "var(--shade-colors-shade-200, #151E00)",
  shadeColorsShade300: "var(--shade-colors-shade-300, #0D1300)",

  neutralColors100: "var(--neutral-colors-100, #F9FAF7)",
  neutralColors200: "var(--neutral-colors-200, #F3F5EE)",
  neutralColors300: "var(--neutral-colors-300, #EFF2E6)",
  neutralColors400: "var(--neutral-colors-400, #EDF2E1)",

  black: "var(--black, #000)",
  grey: "var(--grey, #E6E6E6)",
  white: "var(--white, #FFF)",
};

export const Size = {
  px: {
    4:  "4px",
    8:  "8px",
    12: "12px",
    16: "16px",
    24: "24px",
    36: "36px",
    40: "40px",
  },
  rem: {
    4:  "4px",
    8:  "8px",
    12: "12px",
    16: "16px",
    24: "24px",
    36: "36px",
  },
};


export const Fonts = {
  font: {
    family: "Roboto",
  },
  typography: {
    h3: {
      regular: {
        fontSize: "39.06px",
        fontStyle: "Normal",
        fontWeight: 400,
        lineHeight: "56px",
      },
      medium: {
        fontSize: "39.06px",
        fontStyle: "Normal",
        fontWeight: 500,
        lineHeight: "56px",
      },
      bold: {
        fontSize: "39.06px",
        fontStyle: "Normal",
        fontWeight: 700,
        lineHeight: "56px",
      },
    },
    h5: {
      regular: {
        fontSize: "25px",
        fontStyle: "Normal",
        fontWeight: 400,
        lineHeight: "40px",
      },
      medium: {
        fontSize: "25px",
        fontStyle: "Normal",
        fontWeight: 500,
        lineHeight: "40px",
      },
      bold: {
        fontSize: "25px",
        fontStyle: "Normal",
        fontWeight: 700,
        lineHeight: "40px",
      },
    },
    h6: {
      light: {
        fontSize: "20px",
        fontStyle: "Normal",
        fontWeight: 300,
        lineHeight: "32px",
      },
      regular: {
        fontSize: "20px",
        fontStyle: "Normal",
        fontWeight: 400,
        lineHeight: "32px",
      },

      medium: {
        fontSize: "20px",
        fontStyle: "Normal",
        fontWeight: 500,
        lineHeight: "32px",
      },
      bold: {
        fontSize: "20px",
        fontStyle: "Normal",
        fontWeight: 700,
        lineHeight: "32px",
      },
    },
    body: {
      regular: {
        fontSize: "16px",
        fontStyle: "Normal",
        fontWeight: 400,
        lineHeight: "25.5px",
      },
      medium: {
        fontSize: "16px",
        fontStyle: "Normal",
        fontWeight: 500,
        lineHeight: "24px",
      },
      bold: {
        fontSize: "16px",
        fontStyle: "Normal",
        fontWeight: 700,
        lineHeight: "24px",
      },
    },
    caption: {
      regular: {
        fontSize: "12.85px",
        fontStyle: "Normal",
        fontWeight: 400,
        lineHeight: "16px",
      },
      medium: {
        fontSize: "12.85px",
        fontStyle: "Normal",
        fontWeight: 500,
        lineHeight: "16px",
      },
      bold: {
        fontSize: "12.85px",
        fontStyle: "Normal",
        fontWeight: 700,
        lineHeight: "16px",
      },
    },
  },
};

const MotusTokens = {
  brand: {
    primary: MotusTheme.primary,
    secondary: MotusTheme.secondaryBrandColorSecondary,
  },

  text: {
    primary: MotusTheme.shadeColorsShade100,
    secondary: MotusTheme.shadeColorsShade200,
    description_02: MotusTheme.tintColorsTint200,
    description_01: MotusTheme.tintColorsTint100,
  },
  background: {
    primary: MotusTheme.neutralColors100,
    secondary: MotusTheme.neutralColors200,
  },
  border: {
    primary: MotusTheme.neutralColors400,
    secondary: MotusTheme.tintColorsTint100,
  },

  accent: {
    danger: MotusTheme.functionalColorsDanger,
    danger_invert_01: MotusTheme.functionalLightColorsDanger100,
    danger_invert_02: MotusTheme.functionalLightColorsDanger200,
    success: MotusTheme.functionalColorsSuccess,
    success_invert_01: MotusTheme.functionalLightColorsSuccess100,
    success_invert_02: MotusTheme.functionalLightColorsSuccess200,
    warning: MotusTheme.functionalColorWarning,
    warning_invert_01: MotusTheme.functionalLightColorsWarning100,
    warning_invert_02: MotusTheme.functionalLightColorsWarning200,
    info: MotusTheme.functionalColorsInfo,
    info_invert_01: MotusTheme.functionalLightColorsInfo100,
    info_invert_02: MotusTheme.functionalLightColorsInfo200,
  },

  default: {
    white: MotusTheme.white,
    black: MotusTheme.black,
    grey: MotusTheme.grey,
  },
};

const SystemVariable = {
  colorVariables: MotusTheme,
  tokens: MotusTokens,
  font: Fonts,
  size: Size,
};

export default SystemVariable;
