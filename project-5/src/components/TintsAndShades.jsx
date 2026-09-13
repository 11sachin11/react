import React from 'react';
import { generateTintsAndShades, getContrastRatio } from '../utils/colorUtils';
import { IconCopy, IconSliders, IconDownload } from './Icons';

export const TintsAndShades = ({ activeColor, onColorChange, onCopy }) => {
  const steps = generateTintsAndShades(activeColor);

  const exportTailwindConfig = () => {
    const obj = {};
    steps.forEach((s) => {
      obj[s.step] = s.hex;
    });
    const formatted = `// Tailwind CSS color scale\n'brand': ${JSON.stringify(obj, null, 2)}`;
    onCopy(formatted, 'Tailwind Color Scale Object');
  };

  return (
    <div className="tints-shades-container">
      <div className="section-header-row">
        <div>
          <h2 className="panel-heading">Tints & Shades Scale</h2>
          <p className="panel-sub">
            Precision 11-step design system ramp generated dynamically from {activeColor}
          </p>
        </div>

        <button className="action-btn-secondary" onClick={exportTailwindConfig}>
          <IconDownload size={16} />
          <span>Export Tailwind Config</span>
        </button>
      </div>

      {/* Large visual spectrum bar */}
      <div className="tint-bar-display">
        {steps.map((item) => {
          const contrastWhite = item.contrastWithWhite;
          const textColor = contrastWhite >= 4.5 ? '#FFFFFF' : '#0F172A';

          return (
            <div
              key={item.step}
              className="tint-bar-segment"
              style={{ backgroundColor: item.hex, color: textColor }}
              onClick={() => onColorChange(item.hex)}
              title={`Click to select ${item.step}: ${item.hex}`}
            >
              <span className="tint-step-number">{item.step}</span>
              <span className="tint-hex-code">{item.hex}</span>
            </div>
          );
        })}
      </div>

      {/* Detailed Card Grid */}
      <div className="tints-cards-grid">
        {steps.map((item) => {
          const contrastWhite = item.contrastWithWhite;
          const contrastBlack = getContrastRatio(item.hex, '#000000');
          const isWhitePass = contrastWhite >= 4.5;
          const isBlackPass = contrastBlack >= 4.5;

          return (
            <div
              key={item.step}
              className="tint-card-box"
              onClick={() => onColorChange(item.hex)}
            >
              <div
                className="tint-card-swatch"
                style={{ backgroundColor: item.hex }}
              >
                <span
                  className="tint-card-step"
                  style={{ color: isWhitePass ? '#FFFFFF' : '#000000' }}
                >
                  {item.step}
                </span>
              </div>

              <div className="tint-card-meta">
                <div className="tint-meta-top">
                  <span className="tint-code-text">{item.hex}</span>
                  <button
                    className="tint-copy-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCopy(item.hex, `${item.step} (${item.hex})`);
                    }}
                    title="Copy HEX"
                  >
                    <IconCopy size={13} />
                  </button>
                </div>

                <div className="tint-contrast-badges">
                  <span className={`badge-pill ${isWhitePass ? 'pass' : 'fail'}`}>
                    W: {contrastWhite}:1
                  </span>
                  <span className={`badge-pill ${isBlackPass ? 'pass' : 'fail'}`}>
                    B: {contrastBlack}:1
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TintsAndShades;
