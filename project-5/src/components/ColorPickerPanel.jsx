import React, { useState } from 'react';
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  getContrastRatio,
} from '../utils/colorUtils';
import { IconCopy, IconHeart, IconSparkles, IconSliders } from './Icons';

export const ColorPickerPanel = ({
  activeColor,
  onColorChange,
  onCopy,
  onSaveColor,
  isColorSaved
}) => {
  const { r, g, b } = hexToRgb(activeColor);
  const { h, s, l } = rgbToHsl(r, g, b);
  const { v } = rgbToHsv(r, g, b);

  const [hexInput, setHexInput] = useState(activeColor);

  const contrastWhite = getContrastRatio(activeColor, '#FFFFFF');
  const textColor = contrastWhite >= 4.5 ? '#FFFFFF' : '#0F172A';

  // Handle manual HEX text editing
  const handleHexInputChange = (e) => {
    const val = e.target.value;
    setHexInput(val);
    if (/^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)) {
      const formatted = val.startsWith('#') ? val.toUpperCase() : `#${val.toUpperCase()}`;
      onColorChange(formatted);
    }
  };

  // Synchronize when activeColor changes externally
  React.useEffect(() => {
    setHexInput(activeColor);
  }, [activeColor]);

  // Slider change handlers
  const handleHueChange = (newH) => {
    const rgb = hslToRgb(Number(newH), s, l);
    onColorChange(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const handleSatChange = (newS) => {
    const rgb = hslToRgb(h, Number(newS), l);
    onColorChange(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const handleLightChange = (newL) => {
    const rgb = hslToRgb(h, s, Number(newL));
    onColorChange(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  // Formats
  const formats = [
    { label: 'HEX', value: activeColor },
    { label: 'RGB', value: `rgb(${r}, ${g}, ${b})` },
    { label: 'HSL', value: `hsl(${h}, ${s}%, ${l}%)` },
    { label: 'HSV', value: `hsv(${h}, ${s}%, ${v}%)` },
    { label: 'CSS Var', value: `--color-primary: ${activeColor};` },
  ];

  // Quick action presets
  const makeInverted = () => {
    const invR = 255 - r;
    const invG = 255 - g;
    const invB = 255 - b;
    onColorChange(rgbToHex(invR, invG, invB));
  };

  const makeComplementary = () => {
    const rgb = hslToRgb((h + 180) % 360, s, l);
    onColorChange(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const adjustLightness = (amount) => {
    const newL = Math.max(0, Math.min(100, l + amount));
    const rgb = hslToRgb(h, s, newL);
    onColorChange(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  return (
    <div className="color-studio-panel">
      {/* Visual Canvas Card */}
      <div
        className="hero-color-card"
        style={{
          backgroundColor: activeColor,
          boxShadow: `0 20px 50px -15px ${activeColor}88, inset 0 1px 1px rgba(255,255,255,0.4)`
        }}
      >
        <div className="card-gloss-overlay"></div>

        <div className="hero-card-header">
          <div className="format-tag" style={{ color: textColor, borderColor: `${textColor}44` }}>
            <span>Digital Spectrum</span>
          </div>

          <button
            className={`save-color-btn ${isColorSaved(activeColor) ? 'saved' : ''}`}
            onClick={() => onSaveColor(activeColor)}
            style={{ color: textColor, borderColor: `${textColor}44` }}
            title="Save to Favorites"
          >
            <IconHeart
              size={18}
              fill={isColorSaved(activeColor) ? (textColor === '#FFFFFF' ? '#FF5E7E' : '#E11D48') : 'none'}
            />
            <span>{isColorSaved(activeColor) ? 'Saved' : 'Save'}</span>
          </button>
        </div>

        <div className="hero-card-body">
          <div className="hero-hex-display" style={{ color: textColor }}>
            {activeColor}
          </div>
          <div className="hero-subtext" style={{ color: textColor, opacity: 0.85 }}>
            rgb({r}, {g}, {b}) • hsl({h}°, {s}%, {l}%)
          </div>
        </div>

        <div className="hero-card-footer">
          <button
            className="hero-action-copy"
            onClick={() => onCopy(activeColor, 'HEX code')}
            style={{
              backgroundColor: textColor === '#FFFFFF' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.45)',
              color: textColor
            }}
          >
            <IconCopy size={16} />
            <span>Copy HEX</span>
          </button>

          <label
            className="hero-native-picker-label"
            style={{
              backgroundColor: textColor === '#FFFFFF' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.45)',
              color: textColor
            }}
            title="Open native color wheel"
          >
            <IconSliders size={16} />
            <span>Color Wheel</span>
            <input
              type="color"
              value={activeColor}
              onChange={(e) => onColorChange(e.target.value.toUpperCase())}
              className="hidden-color-input"
            />
          </label>
        </div>
      </div>

      {/* Control Sliders & Formats */}
      <div className="studio-controls-card">
        <div className="panel-title-bar">
          <div className="panel-title-group">
            <IconSliders size={18} className="panel-icon" />
            <h2 className="panel-heading">Precision Controls</h2>
          </div>
          <div className="hex-input-wrapper">
            <span className="hex-prefix">#</span>
            <input
              type="text"
              value={hexInput.replace('#', '')}
              onChange={handleHexInputChange}
              maxLength={6}
              className="hex-direct-input"
              placeholder="6366F1"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Sliders */}
        <div className="sliders-container">
          {/* Hue */}
          <div className="slider-group">
            <div className="slider-label-row">
              <span className="slider-name">Hue</span>
              <span className="slider-val">{h}°</span>
            </div>
            <div className="slider-track-wrap hue-track">
              <input
                type="range"
                min="0"
                max="360"
                value={h}
                onChange={(e) => handleHueChange(e.target.value)}
                className="custom-range hue-range"
              />
            </div>
          </div>

          {/* Saturation */}
          <div className="slider-group">
            <div className="slider-label-row">
              <span className="slider-name">Saturation</span>
              <span className="slider-val">{s}%</span>
            </div>
            <div
              className="slider-track-wrap saturation-track"
              style={{
                background: `linear-gradient(to right, hsl(${h}, 0%, ${l}%), hsl(${h}, 100%, ${l}%))`
              }}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={s}
                onChange={(e) => handleSatChange(e.target.value)}
                className="custom-range"
              />
            </div>
          </div>

          {/* Lightness */}
          <div className="slider-group">
            <div className="slider-label-row">
              <span className="slider-name">Lightness</span>
              <span className="slider-val">{l}%</span>
            </div>
            <div
              className="slider-track-wrap lightness-track"
              style={{
                background: `linear-gradient(to right, #000000, hsl(${h}, ${s}%, 50%), #FFFFFF)`
              }}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={l}
                onChange={(e) => handleLightChange(e.target.value)}
                className="custom-range"
              />
            </div>
          </div>
        </div>

        {/* Quick adjustments */}
        <div className="quick-adjust-bar">
          <button className="quick-chip-btn" onClick={() => adjustLightness(8)}>
            + Lighten
          </button>
          <button className="quick-chip-btn" onClick={() => adjustLightness(-8)}>
            - Darken
          </button>
          <button className="quick-chip-btn" onClick={makeComplementary}>
            Complement
          </button>
          <button className="quick-chip-btn" onClick={makeInverted}>
            Invert
          </button>
        </div>

        {/* Code Conversion Cards */}
        <div className="format-list">
          {formats.map((fmt) => (
            <div key={fmt.label} className="format-item">
              <div className="format-left">
                <span className="format-tag-label">{fmt.label}</span>
                <code className="format-code-text">{fmt.value}</code>
              </div>
              <button
                className="format-copy-btn"
                onClick={() => onCopy(fmt.value, `${fmt.label}`)}
                title={`Copy ${fmt.label}`}
              >
                <IconCopy size={15} />
                <span>Copy</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPickerPanel;
