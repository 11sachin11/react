import React, { useState } from 'react';
import { getContrastRatio, getWcagRating, hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '../utils/colorUtils';
import { IconEye, IconCheck, IconCopy } from './Icons';

export const ContrastChecker = ({ activeColor, onColorChange, onCopy }) => {
  const [testBg, setTestBg] = useState('#0F172A');
  const [isSwapped, setIsSwapped] = useState(false);

  // Background and Foreground selection
  const background = isSwapped ? activeColor : testBg;
  const foreground = isSwapped ? testBg : activeColor;

  const ratio = getContrastRatio(foreground, background);
  const ratings = getWcagRating(ratio);

  // Contrast against standard White & Black
  const ratioWhite = getContrastRatio(activeColor, '#FFFFFF');
  const ratioBlack = getContrastRatio(activeColor, '#000000');

  // Find nearest accessible color if failed
  const findAccessibleColor = () => {
    const { r, g, b } = hexToRgb(activeColor);
    const { h, s, l } = rgbToHsl(r, g, b);
    
    // Check if darkening or lightening helps
    let candidate = activeColor;
    for (let step = 1; step <= 50; step++) {
      // try darkening if background is light, lightening if background is dark
      const isDarkBg = getContrastRatio(testBg, '#FFFFFF') > 4.5;
      const targetL = isDarkBg ? Math.min(95, l + step) : Math.max(5, l - step);
      const testRgb = hslToRgb(h, s, targetL);
      const testHex = rgbToHex(testRgb.r, testRgb.g, testRgb.b);
      if (getContrastRatio(testHex, testBg) >= 4.5) {
        candidate = testHex;
        break;
      }
    }
    onColorChange(candidate);
  };

  return (
    <div className="contrast-checker-container">
      <div className="section-header-row">
        <div>
          <h2 className="panel-heading">WCAG 2.1 Accessibility & Contrast Checker</h2>
          <p className="panel-sub">
            Verify color readability according to World Wide Web Consortium (W3C) standards
          </p>
        </div>

        <button
          className="action-btn-secondary"
          onClick={() => setIsSwapped(!isSwapped)}
          title="Swap Foreground and Background"
        >
          <span>Swap Roles (FG ↔ BG)</span>
        </button>
      </div>

      {/* Main Score & Badges Card */}
      <div className="contrast-score-card">
        <div className="ratio-circle-group">
          <div className="ratio-number">{ratio}:1</div>
          <span className="ratio-sub-tag">Contrast Ratio</span>
        </div>

        <div className="wcag-ratings-grid">
          <div className={`wcag-badge-box ${ratings.normalAa ? 'pass' : 'fail'}`}>
            <span className="wcag-level">AA Normal Text</span>
            <span className="wcag-rule">Min 4.5:1</span>
            <span className="wcag-status">{ratings.normalAa ? 'PASS' : 'FAIL'}</span>
          </div>

          <div className={`wcag-badge-box ${ratings.normalAaa ? 'pass' : 'fail'}`}>
            <span className="wcag-level">AAA Normal Text</span>
            <span className="wcag-rule">Min 7.0:1</span>
            <span className="wcag-status">{ratings.normalAaa ? 'PASS' : 'FAIL'}</span>
          </div>

          <div className={`wcag-badge-box ${ratings.largeAa ? 'pass' : 'fail'}`}>
            <span className="wcag-level">AA Large / Bold Text</span>
            <span className="wcag-rule">Min 3.0:1</span>
            <span className="wcag-status">{ratings.largeAa ? 'PASS' : 'FAIL'}</span>
          </div>

          <div className={`wcag-badge-box ${ratings.largeAaa ? 'pass' : 'fail'}`}>
            <span className="wcag-level">AAA Large / Bold Text</span>
            <span className="wcag-rule">Min 4.5:1</span>
            <span className="wcag-status">{ratings.largeAaa ? 'PASS' : 'FAIL'}</span>
          </div>
        </div>
      </div>

      {/* Background Selector Bar */}
      <div className="contrast-bg-picker-bar">
        <span className="picker-label">Test Against Background:</span>
        <div className="bg-preset-chips">
          {[
            { label: 'Dark Slate (#0F172A)', hex: '#0F172A' },
            { label: 'Pure Black (#000000)', hex: '#000000' },
            { label: 'Pure White (#FFFFFF)', hex: '#FFFFFF' },
            { label: 'Card Gray (#1E293B)', hex: '#1E293B' },
            { label: 'Warm Cream (#FAF8F5)', hex: '#FAF8F5' },
          ].map((preset) => (
            <button
              key={preset.hex}
              className={`preset-bg-chip ${testBg.toUpperCase() === preset.hex.toUpperCase() ? 'active' : ''}`}
              onClick={() => setTestBg(preset.hex)}
            >
              <span className="preset-dot" style={{ backgroundColor: preset.hex }}></span>
              <span>{preset.label}</span>
            </button>
          ))}

          <label className="custom-bg-picker-btn">
            <span>Custom BG</span>
            <input
              type="color"
              value={testBg}
              onChange={(e) => setTestBg(e.target.value.toUpperCase())}
              className="hidden-color-input"
            />
          </label>
        </div>

        {!ratings.normalAa && (
          <button className="auto-fix-btn" onClick={findAccessibleColor}>
            ✨ Auto-Fix to Reach AA (4.5:1)
          </button>
        )}
      </div>

      {/* Live Visual Simulation Preview */}
      <div
        className="contrast-live-preview-box"
        style={{
          backgroundColor: background,
          color: foreground,
          borderColor: `${foreground}33`
        }}
      >
        <div className="preview-content-area">
          <div className="preview-tag" style={{ borderColor: `${foreground}44` }}>
            Live Render on {background}
          </div>

          <h3 className="preview-heading-text" style={{ color: foreground }}>
            The quick brown fox jumps over the lazy dog.
          </h3>

          <p className="preview-body-text" style={{ color: foreground, opacity: 0.9 }}>
            Good digital color contrast ensures that your digital experiences are accessible to everyone, including people with low vision or color vision impairments. World Wide Web Consortium (W3C) recommends a minimum 4.5:1 ratio for regular body text.
          </p>

          <div className="preview-cta-row">
            <button
              className="preview-btn-solid"
              style={{ backgroundColor: foreground, color: background }}
            >
              Primary Action Button
            </button>
            <button
              className="preview-btn-outline"
              style={{ borderColor: foreground, color: foreground }}
            >
              Outline Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContrastChecker;
