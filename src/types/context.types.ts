type FontProperties = {
  fontSize: string;
  fontStyle: string;
  fontWeight: number | string;
  lineHeight: string;
};
type NamedFont = {
  light?: FontProperties;
  regular: FontProperties;
  medium: FontProperties;
  bold: FontProperties;
};

type FontType = {
  font: {
    family: string;
  };
  typography: {
    h1?: NamedFont | null;
    h2?: NamedFont | null;
    h3?: NamedFont | null;
    h4?: NamedFont | null;
    h5?: NamedFont | null;
    h6?: NamedFont;
    body: NamedFont;
    caption: NamedFont;
  };
};

type SizeProp = {
  px: {
    4: string;
    8: string;
    12: string;
    16: string;
    24: string;
    36: string;
    40: string;
  };
  rem: {
    4: string;
    8: string;
    12: string;
    16: string;
    24: string;
    36: string;
  };
};

type AppColorToken = {
  brand: {
    primary: string;
    secondary: string;
  };
  text: {
    primary: string;
    secondary: string;
    description_02: string;
    description_01: string;
  };
  background: {
    primary: string;
    secondary: string;
  };
  border: {
    primary: string;
    secondary: string;
  };

  accent: {
    danger: string;
    danger_invert_01: string;
    danger_invert_02: string;
    success: string;
    success_invert_01: string;
    success_invert_02: string;
    warning: string;
    warning_invert_01: string;
    warning_invert_02: string;
    info: string;
    info_invert_01: string;
    info_invert_02: string;
  };

  default: {
    white: string;
    black: string;
    grey: string;
  };
};

type ColorVariables = {
  primary: string;

  secondaryBrandColorSecondary: string;

  functionalColorsDanger: string;
  functionalColorWarning: string;
  functionalColorsSuccess: string;
  functionalColorsInfo: string;

  functionalLightColorsDanger100: string;
  functionalLightColorsDanger200: string;

  functionalLightColorsSuccess100: string;
  functionalLightColorsSuccess200: string;

  functionalLightColorsInfo100: string;
  functionalLightColorsInfo200: string;

  functionalLightColorsWarning: string;
  functionalLightColorsWarning100: string;
  functionalLightColorsWarning200: string;

  tintColorsTint100: string;
  tintColorsTint200: string;
  tintColorsTint300: string;

  shadeColorsShade100: string;
  shadeColorsShade200: string;
  shadeColorsShade300: string;

  neutralColors100: string;
  neutralColors200: string;
  neutralColors300: string;
  neutralColors400: string;
  black: string;
  grey: string;
  white: string;
};

type CoreProps = {
  colorToken: AppColorToken;
  font: FontType;
  size?: SizeProp;
  colorVariables?: ColorVariables;
};
export type { CoreProps, FontType, AppColorToken, FontProperties };
