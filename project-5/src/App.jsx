import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import ColorPickerPanel from './components/ColorPickerPanel';
import PaletteGenerator from './components/PaletteGenerator';
import TintsAndShades from './components/TintsAndShades';
import ContrastChecker from './components/ContrastChecker';
import ComponentPreview from './components/ComponentPreview';
import SavedPalettesModal from './components/SavedPalettesModal';
import Toast from './components/Toast';
import { getRandomVibrantColor } from './utils/colorUtils';

export const App = () => {
  const [activeColor, setActiveColor] = useState('#6366F1'); // Vibrant Indigo default
  const [activeTab, setActiveTab] = useState('studio');
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Persistent Saved Items
  const [savedColors, setSavedColors] = useState(() => {
    try {
      const stored = localStorage.getItem('chroma_saved_colors');
      return stored ? JSON.parse(stored) : ['#6366F1', '#EC4899', '#10B981', '#F59E0B'];
    } catch {
      return ['#6366F1', '#EC4899', '#10B981', '#F59E0B'];
    }
  });

  const [savedPalettes, setSavedPalettes] = useState(() => {
    try {
      const stored = localStorage.getItem('chroma_saved_palettes');
      return stored
        ? JSON.parse(stored)
        : [
            {
              id: 'initial-1',
              name: 'Cyber Aura',
              colors: ['#6366F1', '#8B5CF6', '#EC4899', '#3B82F6'],
            },
          ];
    } catch {
      return [];
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('chroma_saved_colors', JSON.stringify(savedColors));
    } catch (e) {
      console.error(e);
    }
  }, [savedColors]);

  useEffect(() => {
    try {
      localStorage.setItem('chroma_saved_palettes', JSON.stringify(savedPalettes));
    } catch (e) {
      console.error(e);
    }
  }, [savedPalettes]);

  // Toast Trigger
  const triggerToast = useCallback((msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    const timer = setTimeout(() => {
      setToastVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Copy to Clipboard
  const handleCopy = useCallback((text, label = 'Content') => {
    navigator.clipboard.writeText(text).then(
      () => {
        triggerToast(`Copied ${label} to clipboard!`);
      },
      () => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        triggerToast(`Copied ${label} to clipboard!`);
      }
    );
  }, [triggerToast]);

  // Randomize Color
  const handleRandomize = useCallback(() => {
    const newCol = getRandomVibrantColor();
    setActiveColor(newCol);
  }, []);

  // Spacebar hotkey to randomize
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        handleRandomize();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRandomize]);

  // EyeDropper API
  const hasEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window;
  const handlePickColor = async () => {
    if (!hasEyeDropper) return;
    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      if (result?.sRGBHex) {
        setActiveColor(result.sRGBHex.toUpperCase());
        triggerToast(`Sampled color ${result.sRGBHex.toUpperCase()}`);
      }
    } catch (err) {
      // User cancelled picker
    }
  };

  // Save / Toggle Individual Color
  const isColorSaved = (col) => savedColors.includes(col.toUpperCase());

  const handleSaveColor = (col) => {
    const upper = col.toUpperCase();
    if (savedColors.includes(upper)) {
      setSavedColors(savedColors.filter((c) => c !== upper));
      triggerToast(`Removed ${upper} from favorites`);
    } else {
      setSavedColors([upper, ...savedColors]);
      triggerToast(`Saved ${upper} to favorites!`);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: [col, '#FFFFFF', '#FF5E7E'],
      });
    }
  };

  // Save Multi-Color Palette
  const isPaletteSaved = (paletteColors) => {
    const key = paletteColors.join(',');
    return savedPalettes.some((p) => p.colors.join(',') === key);
  };

  const handleSavePalette = (paletteColors, name = 'Harmonic Palette') => {
    const newPal = {
      id: Date.now().toString(),
      name,
      colors: paletteColors,
    };
    setSavedPalettes([newPal, ...savedPalettes]);
    triggerToast(`Saved ${name}!`);
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.8 },
      colors: paletteColors,
    });
  };

  const handleDeleteColor = (col) => {
    setSavedColors(savedColors.filter((c) => c !== col));
  };

  const handleDeletePalette = (id) => {
    setSavedPalettes(savedPalettes.filter((p) => p.id !== id));
  };

  return (
    <div className="app-layout" style={{ '--active-accent': activeColor }}>
      <div className="ambient-background">
        <div
          className="ambient-glow glow-1"
          style={{ backgroundColor: activeColor }}
        ></div>
        <div
          className="ambient-glow glow-2"
          style={{ backgroundColor: activeColor }}
        ></div>
      </div>

      <Navbar
        activeColor={activeColor}
        onRandomize={handleRandomize}
        onPickColor={handlePickColor}
        hasEyeDropper={hasEyeDropper}
        savedCount={savedColors.length + savedPalettes.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="main-content">
        {activeTab === 'studio' && (
          <div className="tab-pane fadeIn">
            <ColorPickerPanel
              activeColor={activeColor}
              onColorChange={setActiveColor}
              onCopy={handleCopy}
              onSaveColor={handleSaveColor}
              isColorSaved={isColorSaved}
            />
            {/* Embedded quick harmonic preview in studio */}
            <div className="studio-extra-section">
              <PaletteGenerator
                activeColor={activeColor}
                onColorChange={setActiveColor}
                onCopy={handleCopy}
                onSavePalette={handleSavePalette}
                isPaletteSaved={isPaletteSaved}
              />
            </div>
          </div>
        )}

        {activeTab === 'palettes' && (
          <div className="tab-pane fadeIn">
            <PaletteGenerator
              activeColor={activeColor}
              onColorChange={setActiveColor}
              onCopy={handleCopy}
              onSavePalette={handleSavePalette}
              isPaletteSaved={isPaletteSaved}
            />
          </div>
        )}

        {activeTab === 'tints' && (
          <div className="tab-pane fadeIn">
            <TintsAndShades
              activeColor={activeColor}
              onColorChange={setActiveColor}
              onCopy={handleCopy}
            />
          </div>
        )}

        {activeTab === 'contrast' && (
          <div className="tab-pane fadeIn">
            <ContrastChecker
              activeColor={activeColor}
              onColorChange={setActiveColor}
              onCopy={handleCopy}
            />
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="tab-pane fadeIn">
            <ComponentPreview activeColor={activeColor} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <span>ChromaStudio Digital Color Suite • Built with React & Vite</span>
        <span className="footer-tip">💡 Tip: Press <kbd>Spacebar</kbd> anywhere to generate a new aesthetic color</span>
      </footer>

      <SavedPalettesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedColors={savedColors}
        savedPalettes={savedPalettes}
        onSelectColor={(col) => {
          setActiveColor(col);
          setIsSavedModalOpen(false);
          triggerToast(`Loaded ${col}`);
        }}
        onDeleteColor={handleDeleteColor}
        onDeletePalette={handleDeletePalette}
        onCopy={handleCopy}
      />

      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
};

export default App;
