// Comprehensive Digital Color Math & Color Theory Engine

/**
 * Normalizes and parses any 3, 4, 6, or 8 digit hex code into RGBA.
 */
export function hexToRgb(hex) {
  let cleanHex = hex.replace('#', '').trim();

  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  } else if (cleanHex.length === 4) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }

  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  let a = 1;

  if (cleanHex.length === 8) {
    a = parseFloat((parseInt(cleanHex.substring(6, 8), 16) / 255).toFixed(2));
  }

  return { r, g, b, a };
}

/**
 * Converts RGB components to a standard 6-digit hex string.
 */
export function rgbToHex(r, g, b) {
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (c) => clamp(c).toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converts RGB (0-255) to HSL (h: 0-360, s: 0-100, l: 0-100).
 */
export function rgbToHsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      case bn:
        h = (rn - gn) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converts HSL (h: 0-360, s: 0-100, l: 0-100) to RGB (0-255).
 */
export function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r1 = 0, g1 = 0, b1 = 0;

  if (h >= 0 && h < 60) {
    r1 = c; g1 = x; b1 = 0;
  } else if (h >= 60 && h < 120) {
    r1 = x; g1 = c; b1 = 0;
  } else if (h >= 120 && h < 180) {
    r1 = 0; g1 = c; b1 = x;
  } else if (h >= 180 && h < 240) {
    r1 = 0; g1 = x; b1 = c;
  } else if (h >= 240 && h < 300) {
    r1 = x; g1 = 0; b1 = c;
  } else if (h >= 300 && h < 360) {
    r1 = c; g1 = 0; b1 = x;
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

/**
 * Converts RGB to HSV.
 */
export function rgbToHsv(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      case bn:
        h = (rn - gn) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

/**
 * Calculates W3C WCAG relative luminance.
 */
export function getLuminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Computes contrast ratio between two hex colors.
 */
export function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return parseFloat(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

/**
 * Returns WCAG 2.1 compliance details.
 */
export function getWcagRating(ratio) {
  return {
    normalAa: ratio >= 4.5,
    normalAaa: ratio >= 7.0,
    largeAa: ratio >= 3.0,
    largeAaa: ratio >= 4.5,
  };
}

/**
 * Generates harmonic color sets based on color theory wheel.
 */
export function generateHarmonies(hex) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  const makeHex = (newHue, sat = s, light = l) => {
    const rgb = hslToRgb(newHue, sat, light);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  };

  return {
    complementary: [
      hex,
      makeHex((h + 180) % 360),
    ],
    analogous: [
      makeHex((h - 30 + 360) % 360),
      hex,
      makeHex((h + 30) % 360),
    ],
    triadic: [
      hex,
      makeHex((h + 120) % 360),
      makeHex((h + 240) % 360),
    ],
    tetradic: [
      hex,
      makeHex((h + 90) % 360),
      makeHex((h + 180) % 360),
      makeHex((h + 270) % 360),
    ],
    splitComplementary: [
      hex,
      makeHex((h + 150) % 360),
      makeHex((h + 210) % 360),
    ],
    monochromatic: [
      makeHex(h, s, Math.max(10, l - 35)),
      makeHex(h, s, Math.max(15, l - 18)),
      hex,
      makeHex(h, s, Math.min(85, l + 18)),
      makeHex(h, s, Math.min(95, l + 35)),
    ],
  };
}

/**
 * Generates standard design system tints and shades (50 - 950).
 */
export function generateTintsAndShades(hex) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s } = rgbToHsl(r, g, b);

  const steps = [
    { label: '50', l: 96 },
    { label: '100', l: 90 },
    { label: '200', l: 80 },
    { label: '300', l: 70 },
    { label: '400', l: 60 },
    { label: '500', l: 50 },
    { label: '600', l: 40 },
    { label: '700', l: 30 },
    { label: '800', l: 20 },
    { label: '900', l: 12 },
    { label: '950', l: 6 },
  ];

  return steps.map(({ label, l }) => {
    const rgb = hslToRgb(h, s, l);
    const stepHex = rgbToHex(rgb.r, rgb.g, rgb.b);
    return {
      step: label,
      hex: stepHex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      contrastWithWhite: getContrastRatio(stepHex, '#FFFFFF'),
    };
  });
}

/**
 * Generates an ultra-aesthetic vibrant random color.
 */
export function getRandomVibrantColor() {
  const hue = Math.floor(Math.random() * 360);
  const sat = Math.floor(Math.random() * 25) + 75; // 75-100% saturation
  const light = Math.floor(Math.random() * 20) + 48; // 48-68% lightness
  const rgb = hslToRgb(hue, sat, light);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Simulates color vision deficiency.
 */
export function simulateColorBlindness(hex, type) {
  const { r, g, b } = hexToRgb(hex);

  // Transformation matrices for common color vision deficiencies
  let nr = r, ng = g, nb = b;

  if (type === 'protanopia') {
    nr = 0.56667 * r + 0.43333 * g + 0.0 * b;
    ng = 0.55833 * r + 0.44167 * g + 0.0 * b;
    nb = 0.0 * r + 0.24167 * g + 0.75833 * b;
  } else if (type === 'deuteranopia') {
    nr = 0.625 * r + 0.375 * g + 0.0 * b;
    ng = 0.70 * r + 0.30 * g + 0.0 * b;
    nb = 0.0 * r + 0.30 * g + 0.70 * b;
  } else if (type === 'tritanopia') {
    nr = 0.95 * r + 0.05 * g + 0.0 * b;
    ng = 0.0 * r + 0.43333 * g + 0.56667 * b;
    nb = 0.0 * r + 0.475 * g + 0.525 * b;
  } else if (type === 'achromatopsia') {
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    nr = gray;
    ng = gray;
    nb = gray;
  }

  return rgbToHex(Math.round(nr), Math.round(ng), Math.round(nb));
}

/**
 * Curated trending digital color palettes for inspiration.
 */
export const TRENDING_PALETTES = [
  {
    name: 'Cyberpunk Neon',
    colors: ['#00F0FF', '#7000FF', '#FF007A', '#FFE600', '#0A0B10'],
  },
  {
    name: 'Sunset Mirage',
    colors: ['#FF4E50', '#F9D423', '#FC913A', '#E25858', '#421C52'],
  },
  {
    name: 'Deep Emerald & Mint',
    colors: ['#042940', '#005C53', '#9FC131', '#DBF227', '#D6D58E'],
  },
  {
    name: 'Electric Aurora',
    colors: ['#3A1C71', '#D76D77', '#FFAF7B', '#24C6DC', '#514A9D'],
  },
  {
    name: 'Cosmic Obsidian',
    colors: ['#0D1117', '#161B22', '#58A6FF', '#7EE787', '#F778BA'],
  },
  {
    name: 'Tokyo Blossom',
    colors: ['#FF6584', '#6C5CE7', '#A29BFE', '#FFEAA7', '#2D3436'],
  },
];
