import React from 'react';
import { IconTrash, IconCopy, IconHeart, IconDownload } from './Icons';

export const SavedPalettesModal = ({
  isOpen,
  onClose,
  savedColors,
  savedPalettes,
  onSelectColor,
  onDeleteColor,
  onDeletePalette,
  onCopy
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <IconHeart size={20} fill="#EC4899" className="modal-icon" />
            <h3 className="modal-heading">Saved Colors & Palettes</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Saved Single Colors */}
          <div className="modal-section">
            <h4 className="modal-subheading">
              Favorite Colors ({savedColors.length})
            </h4>

            {savedColors.length === 0 ? (
              <p className="empty-hint">No single colors saved yet. Click the heart icon on any color to save it!</p>
            ) : (
              <div className="saved-colors-grid">
                {savedColors.map((hex) => (
                  <div key={hex} className="saved-color-chip" onClick={() => onSelectColor(hex)}>
                    <span className="saved-chip-dot" style={{ backgroundColor: hex }}></span>
                    <span className="saved-chip-code">{hex}</span>
                    <button
                      className="saved-chip-del"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteColor(hex);
                      }}
                      title="Delete color"
                    >
                      <IconTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Multi-Color Palettes */}
          <div className="modal-section">
            <h4 className="modal-subheading">
              Favorite Palettes ({savedPalettes.length})
            </h4>

            {savedPalettes.length === 0 ? (
              <p className="empty-hint">No custom palettes saved yet. Click "Save Palette" in the Palettes tab!</p>
            ) : (
              <div className="saved-palettes-stack">
                {savedPalettes.map((pal) => (
                  <div key={pal.id} className="saved-palette-card">
                    <div className="saved-palette-header">
                      <span className="saved-pal-title">{pal.name}</span>
                      <div className="saved-pal-actions">
                        <button
                          className="icon-mini-btn"
                          onClick={() => onCopy(JSON.stringify(pal.colors), 'Palette JSON')}
                          title="Copy JSON"
                        >
                          <IconCopy size={14} />
                        </button>
                        <button
                          className="icon-mini-btn danger"
                          onClick={() => onDeletePalette(pal.id)}
                          title="Delete Palette"
                        >
                          <IconTrash size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="saved-pal-swatches">
                      {pal.colors.map((c, i) => (
                        <div
                          key={i}
                          className="saved-pal-strip"
                          style={{ backgroundColor: c }}
                          onClick={() => onSelectColor(c)}
                          title={`Click to use ${c}`}
                        >
                          <span className="saved-pal-hex">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedPalettesModal;
