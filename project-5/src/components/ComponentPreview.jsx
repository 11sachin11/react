import React, { useState } from 'react';
import {
  getContrastRatio,
  simulateColorBlindness,
} from '../utils/colorUtils';
import { IconSparkles, IconCheck, IconEye } from './Icons';

export const ComponentPreview = ({ activeColor }) => {
  const [toggleActive, setToggleActive] = useState(true);
  const [sliderVal, setSliderVal] = useState(65);

  const contrastWhite = getContrastRatio(activeColor, '#FFFFFF');
  const primaryTextColor = contrastWhite >= 4.5 ? '#FFFFFF' : '#0F172A';

  const blindnessModes = [
    { type: 'protanopia', label: 'Protanopia (Red-Blind)', pop: '~1% of males' },
    { type: 'deuteranopia', label: 'Deuteranopia (Green-Blind)', pop: '~5% of males' },
    { type: 'tritanopia', label: 'Tritanopia (Blue-Blind)', pop: '~0.01% of people' },
    { type: 'achromatopsia', label: 'Achromatopsia (Monochrome)', pop: '~0.003%' },
  ];

  return (
    <div className="component-preview-container">
      <div className="section-header-row">
        <div>
          <h2 className="panel-heading">Real-World UI & Perception Simulator</h2>
          <p className="panel-sub">
            Observe your chosen digital color {activeColor} integrated into modern web components
          </p>
        </div>
      </div>

      {/* Component Mockups Grid */}
      <div className="mockup-showcase-grid">
        {/* Card 1: SaaS Metric Widget */}
        <div className="mockup-card glass-panel">
          <div className="mockup-card-header">
            <span
              className="mockup-badge"
              style={{
                backgroundColor: `${activeColor}22`,
                color: activeColor,
                borderColor: `${activeColor}44`,
              }}
            >
              <IconSparkles size={13} />
              <span>Live Analytics</span>
            </span>
            <span className="mockup-timestamp">Updated just now</span>
          </div>

          <div className="mockup-metric-body">
            <span className="metric-title">Monthly Recurring Revenue</span>
            <div className="metric-val-row">
              <span className="metric-number" style={{ color: activeColor }}>
                $48,920.00
              </span>
              <span
                className="metric-growth-badge"
                style={{ backgroundColor: `${activeColor}22`, color: activeColor }}
              >
                +24.8%
              </span>
            </div>
            <div className="metric-progress-track">
              <div
                className="metric-progress-fill"
                style={{
                  width: '74%',
                  backgroundColor: activeColor,
                  boxShadow: `0 0 12px ${activeColor}88`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 2: Interactive Controls & Form Elements */}
        <div className="mockup-card glass-panel">
          <h4 className="mockup-subtitle">Form & Interactive Controls</h4>

          <div className="controls-stack">
            {/* Input with focus glow */}
            <div className="mockup-input-group">
              <label className="mockup-input-label">Project Domain</label>
              <input
                type="text"
                defaultValue="chroma-studio.app"
                className="mockup-text-input"
                style={{
                  borderColor: `${activeColor}88`,
                  boxShadow: `0 0 0 3px ${activeColor}25`,
                }}
              />
            </div>

            {/* Toggle Switch */}
            <div className="mockup-toggle-row">
              <span className="toggle-label">Enable Real-Time Telemetry</span>
              <button
                type="button"
                className="custom-switch"
                style={{
                  backgroundColor: toggleActive ? activeColor : '#334155',
                  boxShadow: toggleActive ? `0 0 10px ${activeColor}66` : 'none',
                }}
                onClick={() => setToggleActive(!toggleActive)}
              >
                <span
                  className="switch-handle"
                  style={{
                    transform: toggleActive ? 'translateX(22px)' : 'translateX(3px)',
                  }}
                />
              </button>
            </div>

            {/* Interactive Slider */}
            <div className="mockup-slider-row">
              <div className="slider-label-flex">
                <span>Color Intensity</span>
                <span style={{ color: activeColor, fontWeight: 600 }}>{sliderVal}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(e.target.value)}
                className="mockup-range-slider"
                style={{ accentColor: activeColor }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Button Hierarchy Showcase */}
        <div className="mockup-card glass-panel full-width-card">
          <h4 className="mockup-subtitle">Button Hierarchy & Badges</h4>
          <div className="buttons-demo-flex">
            <button
              className="demo-btn-primary"
              style={{
                backgroundColor: activeColor,
                color: primaryTextColor,
                boxShadow: `0 8px 20px -6px ${activeColor}99`,
              }}
            >
              Primary Action
            </button>

            <button
              className="demo-btn-secondary"
              style={{
                backgroundColor: `${activeColor}1F`,
                color: activeColor,
                borderColor: `${activeColor}44`,
              }}
            >
              Secondary Tinted
            </button>

            <button
              className="demo-btn-outline"
              style={{
                borderColor: activeColor,
                color: activeColor,
              }}
            >
              Outline Action
            </button>

            <div className="badges-demo-flex">
              <span
                className="demo-badge-solid"
                style={{ backgroundColor: activeColor, color: primaryTextColor }}
              >
                New Release
              </span>
              <span
                className="demo-badge-subtle"
                style={{
                  backgroundColor: `${activeColor}25`,
                  color: activeColor,
                  border: `1px solid ${activeColor}55`,
                }}
              >
                Pro Feature
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Color Blindness Vision Simulator */}
      <div className="color-blindness-section">
        <div className="section-title-wrap">
          <IconEye size={18} className="sparkle-icon" />
          <h3 className="section-heading">Color Vision Deficiency Simulation</h3>
          <span className="section-sub">
            How this digital color appears across diverse visual perceptions
          </span>
        </div>

        <div className="blindness-grid">
          <div className="blindness-card">
            <div className="blindness-swatch" style={{ backgroundColor: activeColor }}>
              <span className="blindness-hex" style={{ color: primaryTextColor }}>
                {activeColor}
              </span>
            </div>
            <div className="blindness-meta">
              <span className="blindness-title">Normal Vision</span>
              <span className="blindness-desc">Full standard trichromatic color spectrum</span>
            </div>
          </div>

          {blindnessModes.map((bm) => {
            const simulatedHex = simulateColorBlindness(activeColor, bm.type);
            const simContrast = getContrastRatio(simulatedHex, '#FFFFFF');
            const simText = simContrast >= 4.5 ? '#FFFFFF' : '#0F172A';

            return (
              <div key={bm.type} className="blindness-card">
                <div className="blindness-swatch" style={{ backgroundColor: simulatedHex }}>
                  <span className="blindness-hex" style={{ color: simText }}>
                    {simulatedHex}
                  </span>
                </div>
                <div className="blindness-meta">
                  <span className="blindness-title">{bm.label}</span>
                  <span className="blindness-desc">{bm.pop}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComponentPreview;
