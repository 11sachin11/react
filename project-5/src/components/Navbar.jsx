import React from 'react';
import { IconPalette, IconRefresh, IconPipette, IconSparkles, IconHeart } from './Icons';

export const Navbar = ({
  activeColor,
  onRandomize,
  onPickColor,
  hasEyeDropper,
  savedCount,
  onOpenSaved,
  activeTab,
  setActiveTab
}) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="brand-logo" style={{ boxShadow: `0 0 24px ${activeColor}44` }}>
          <span className="logo-gem" style={{ background: activeColor }}>
            <IconPalette size={20} />
          </span>
          <div className="brand-text">
            <span className="brand-title">Chroma<span className="brand-accent">Studio</span></span>
            <span className="brand-tag">Digital Color & Palette Engine</span>
          </div>
        </div>

        <div className="current-color-chip" title="Active Working Color">
          <span className="chip-dot" style={{ backgroundColor: activeColor, boxShadow: `0 0 10px ${activeColor}` }}></span>
          <span className="chip-hex">{activeColor}</span>
        </div>
      </div>

      <nav className="nav-tabs">
        <button
          className={`nav-tab-btn ${activeTab === 'studio' ? 'active' : ''}`}
          onClick={() => setActiveTab('studio')}
        >
          Studio
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'palettes' ? 'active' : ''}`}
          onClick={() => setActiveTab('palettes')}
        >
          Harmonies & Palettes
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'tints' ? 'active' : ''}`}
          onClick={() => setActiveTab('tints')}
        >
          Tints & Shades
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'contrast' ? 'active' : ''}`}
          onClick={() => setActiveTab('contrast')}
        >
          Accessibility
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          UI Preview
        </button>
      </nav>

      <div className="header-actions">
        {hasEyeDropper && (
          <button
            className="action-btn icon-btn"
            onClick={onPickColor}
            title="Sample Color From Screen (Eyedropper)"
          >
            <IconPipette size={18} />
          </button>
        )}

        <button
          className="action-btn randomize-btn"
          onClick={onRandomize}
          title="Generate Random Aesthetic Color (Press Spacebar)"
        >
          <IconRefresh size={16} />
          <span>Random Color</span>
          <kbd className="key-hint">Space</kbd>
        </button>

        <button
          className={`action-btn saved-btn ${savedCount > 0 ? 'has-items' : ''}`}
          onClick={onOpenSaved}
          title="View Saved Colors & Palettes"
        >
          <IconHeart size={16} fill={savedCount > 0 ? '#EC4899' : 'none'} />
          <span>Saved</span>
          {savedCount > 0 && <span className="saved-badge">{savedCount}</span>}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
