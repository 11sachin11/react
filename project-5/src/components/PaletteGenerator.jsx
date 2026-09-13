import React, { useState } from 'react';
import {
  generateHarmonies,
  TRENDING_PALETTES,
  getContrastRatio,
  getRandomVibrantColor
} from '../utils/colorUtils';
import {
  IconCopy,
  IconLock,
  IconUnlock,
  IconRefresh,
  IconHeart,
  IconDownload,
  IconSparkles
} from './Icons';

export const PaletteGenerator = ({
  activeColor,
  onColorChange,
  onCopy,
  onSavePalette,
  isPaletteSaved
}) => {
  const [harmonyType, setHarmonyType] = useState('analogous');
  const [lockedIndices, setLockedIndices] = useState({});
  const [customPalette, setCustomPalette] = useState(null);

  const harmonies = generateHarmonies(activeColor);

  // Compute current display palette
  const activePalette = customPalette
    ? customPalette
    : (harmonies[harmonyType] || harmonies.analogous);

  const toggleLock = (index, e) => {
    e.stopPropagation();
    setLockedIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleShuffleUnlocked = () => {
    const nextColors = activePalette.map((col, idx) => {
      if (lockedIndices[idx]) return col;
      return getRandomVibrantColor();
    });
    setCustomPalette(nextColors);
  };

  const handleSelectHarmony = (type) => {
    setHarmonyType(type);
    setCustomPalette(null);
    setLockedIndices({});
  };

  const exportAsCss = () => {
    const css = activePalette
      .map((c, i) => `  --color-${i + 1}: ${c};`)
      .join('\n');
    const full = `:root {\n${css}\n}`;
    onCopy(full, 'Palette as CSS Variables');
  };

  const exportAsJson = () => {
    onCopy(JSON.stringify(activePalette, null, 2), 'Palette as JSON');
  };

  return (
    <div className="palette-section-container">
      {/* Harmony Subnav & Controls */}
      <div className="palette-header-bar">
        <div className="harmony-pills">
          {[
            { id: 'analogous', label: 'Analogous' },
            { id: 'complementary', label: 'Complementary' },
            { id: 'triadic', label: 'Triadic' },
            { id: 'tetradic', label: 'Tetradic' },
            { id: 'monochromatic', label: 'Monochromatic' },
            { id: 'splitComplementary', label: 'Split-Comp' },
          ].map((item) => (
            <button
              key={item.id}
              className={`harmony-pill ${harmonyType === item.id && !customPalette ? 'active' : ''}`}
              onClick={() => handleSelectHarmony(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="palette-top-actions">
          <button
            className="action-btn-secondary"
            onClick={handleShuffleUnlocked}
            title="Randomize unlocked colors"
          >
            <IconRefresh size={16} />
            <span>Shuffle</span>
          </button>

          <button
            className="action-btn-secondary"
            onClick={exportAsCss}
            title="Export as CSS Variables"
          >
            <IconDownload size={16} />
            <span>CSS Vars</span>
          </button>

          <button
            className="action-btn-secondary"
            onClick={exportAsJson}
            title="Export as JSON"
          >
            <span>JSON</span>
          </button>

          <button
            className="action-btn-primary"
            onClick={() => onSavePalette(activePalette, `${harmonyType.toUpperCase()} Palette`)}
            title="Save this entire palette"
          >
            <IconHeart size={16} />
            <span>Save Palette</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Swatch Strips */}
      <div className="palette-display-strips">
        {activePalette.map((color, idx) => {
          const contrast = getContrastRatio(color, '#FFFFFF');
          const txtColor = contrast >= 4.5 ? '#FFFFFF' : '#0F172A';
          const isCurrentActive = activeColor.toUpperCase() === color.toUpperCase();

          return (
            <div
              key={`${color}-${idx}`}
              className={`swatch-strip ${isCurrentActive ? 'is-active-source' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            >
              <div className="swatch-overlay"></div>

              <div className="swatch-top-info" style={{ color: txtColor }}>
                <span className="swatch-index">#{idx + 1}</span>
                <button
                  className="swatch-lock-btn"
                  onClick={(e) => toggleLock(idx, e)}
                  style={{ color: txtColor }}
                  title={lockedIndices[idx] ? 'Color Locked' : 'Color Unlocked'}
                >
                  {lockedIndices[idx] ? <IconLock size={15} /> : <IconUnlock size={15} />}
                </button>
              </div>

              <div className="swatch-bottom-info" style={{ color: txtColor }}>
                {isCurrentActive && (
                  <span className="swatch-active-badge">Active</span>
                )}
                <span className="swatch-hex-title">{color}</span>
                <button
                  className="swatch-copy-action"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopy(color, `Color ${color}`);
                  }}
                  style={{ color: txtColor }}
                  title="Copy Hex"
                >
                  <IconCopy size={15} />
                  <span>Copy</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trending Curated Palettes Showcase */}
      <div className="trending-palettes-card">
        <div className="section-title-wrap">
          <IconSparkles size={18} className="sparkle-icon" />
          <h3 className="section-heading">Curated Designer Palettes</h3>
          <span className="section-sub">Click any palette to load its primary color</span>
        </div>

        <div className="trending-grid">
          {TRENDING_PALETTES.map((tp) => (
            <div
              key={tp.name}
              className="trending-item-card"
              onClick={() => onColorChange(tp.colors[0])}
            >
              <div className="trending-swatches-row">
                {tp.colors.map((c, i) => (
                  <div
                    key={i}
                    className="trending-dot"
                    style={{ backgroundColor: c }}
                    title={c}
                    onClick={(e) => {
                      e.stopPropagation();
                      onColorChange(c);
                    }}
                  />
                ))}
              </div>
              <div className="trending-card-footer">
                <span className="trending-name">{tp.name}</span>
                <button
                  className="trending-save-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSavePalette(tp.colors, tp.name);
                  }}
                  title="Save Palette"
                >
                  <IconHeart size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaletteGenerator;
