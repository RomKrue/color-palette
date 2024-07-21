import {
  IColorShades,
  THEXColor,
  THSLColor,
  TRGBColor,
  TThemePalette,
} from './types/theme.types'

export function getContrastHEXColor(HEXColor: THEXColor): THEXColor {
  const hslColor = rgbToHsl(hexToRgb(HEXColor))

  if (hslColor.l < 50) {
    return rgbToHex(hslToRgb({ ...hslColor, l: 97 }))
  } else {
    return rgbToHex(hslToRgb({ ...hslColor, l: 3 }))
  }
}

export function generatePalette(HEXColor: THEXColor): TThemePalette {
  const hslColor = rgbToHsl(hexToRgb(HEXColor))

  const primaryPalette = {
    main: HEXColor,
    contrast: getContrastHEXColor(HEXColor),
    ...getColorShades(hslColor),
  }
  const secondaryColor = rgbToHex(
    hslToRgb({
      ...hslColor,
      h: hslColor.h < 180 ? hslColor.h + 180 : hslColor.h - 180,
    })
  )

  const secondaryPalette = {
    main: secondaryColor,
    contrast: getContrastHEXColor(secondaryColor),
    ...getColorShades(rgbToHsl(hexToRgb(secondaryColor))),
  }

  const neutralColor = rgbToHex(
    hslToRgb({
      ...hslColor,
      s: 0,
    })
  )

  const neutralPalette = {
    main: neutralColor,
    contrast: getContrastHEXColor(neutralColor),
    ...getColorShades(rgbToHsl(hexToRgb(neutralColor))),
  }

  return {
    primary: primaryPalette,
    secondary: secondaryPalette,
    neutral: neutralPalette,
  }
}

function getColorShades(HSLColor: THSLColor): IColorShades {
  const rangeLumStep = (100 - HSLColor.l) / 10

  let grades = [
    HSLColor.l + rangeLumStep * 9,
    HSLColor.l + rangeLumStep * 8,
    HSLColor.l + rangeLumStep * 7,
    HSLColor.l + rangeLumStep * 6,
    HSLColor.l + rangeLumStep * 5,
    HSLColor.l + rangeLumStep * 4,
    HSLColor.l + rangeLumStep * 3,
    HSLColor.l + rangeLumStep * 2,
    HSLColor.l + rangeLumStep,
  ]
  //   if (HSLColor.l > 80) {
  //     grades.reverse()
  //   }
  return {
    '100': rgbToHex(hslToRgb({ ...HSLColor, l: grades[0] })),
    '200': rgbToHex(hslToRgb({ ...HSLColor, l: grades[1] })),
    '300': rgbToHex(hslToRgb({ ...HSLColor, l: grades[2] })),
    '400': rgbToHex(hslToRgb({ ...HSLColor, l: grades[3] })),
    '500': rgbToHex(hslToRgb({ ...HSLColor, l: grades[4] })),
    '600': rgbToHex(hslToRgb({ ...HSLColor, l: grades[5] })),
    '700': rgbToHex(hslToRgb({ ...HSLColor, l: grades[6] })),
    '800': rgbToHex(hslToRgb({ ...HSLColor, l: grades[7] })),
    '900': rgbToHex(hslToRgb({ ...HSLColor, l: grades[8] })),
  }
}

function hexToRgb(HEXColor: THEXColor): TRGBColor {
  if (
    !(typeof HEXColor === 'string') ||
    HEXColor.length < 4 ||
    HEXColor[0] !== '#'
  ) {
    console.error(
      'Invalid HEX color signature. Take your black color and be happy...'
    )
    return { r: 0, g: 0, b: 0 }
  }
  let initialColor = HEXColor.slice(1)

  ///// на случай сокращенной записи цвета /////
  if (initialColor.length < 6) {
    initialColor =
      initialColor[0] +
      initialColor[0] +
      initialColor[1] +
      initialColor[1] +
      initialColor[2] +
      initialColor[2]
  }

  return {
    r: parseInt(initialColor.slice(0, 2), 16),
    g: parseInt(initialColor.slice(2, 4), 16),
    b: parseInt(initialColor.slice(4, 6), 16),
  }
}

function rgbToHex(RGBColor: TRGBColor): THEXColor {
  return (
    '#' +
    ('00' + RGBColor.r.toString(16)).slice(-2) +
    ('00' + RGBColor.g.toString(16)).slice(-2) +
    ('00' + RGBColor.b.toString(16)).slice(-2)
  )
}

function rgbToHsl({ r, g, b }: TRGBColor): THSLColor {
  r /= 255
  g /= 255
  b /= 255
  const l = Math.max(r, g, b)
  const s = l - Math.min(r, g, b)
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0

  return {
    h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
    s: +(
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
    ).toFixed(1),
    l: +((100 * (2 * l - s)) / 2).toFixed(1),
  }
}

function hslToRgb({ h, s, l }: THSLColor): TRGBColor {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  }
}
