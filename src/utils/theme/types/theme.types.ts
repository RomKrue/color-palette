export type THEXColor = string

export type TRGBColor = {
  r: number
  g: number
  b: number
}

export type THSLColor = {
  h: number
  s: number
  l: number
}

export interface IColorShades {
  900: THEXColor
  800: THEXColor
  700: THEXColor
  600: THEXColor
  500: THEXColor
  400: THEXColor
  300: THEXColor
  200: THEXColor
  100: THEXColor
}

export type TThemePalette = {
  primary: IColorPalette
  [key: string]: IColorPalette
}

export interface IColorPalette extends IColorShades {
  main: THEXColor
  contrast: THEXColor
  [key: string]: THEXColor
}
