import { forwardRef, type ReactElement, type Ref, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Moon, Settings, Sun, Trash2, Type, Zap } from "react-feather";

import { useTheme, type FontSize } from "../../contexts/ThemeContext";

import styles from "./SettingsMenu.module.scss";

interface CustomToggleProps {
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomToggle = forwardRef<HTMLButtonElement, CustomToggleProps>(
  ({ onClick }, ref: Ref<HTMLButtonElement>) => (
    <button
      ref={ref}
      onClick={onClick}
      className={styles.CustomToggleButton}
      aria-label="Theme controls"
    >
      <Settings size={18} stroke={"var(--primary03)"} />
    </button>
  ),
);

CustomToggle.displayName = "CustomToggle";

export const SettingsMenu = (): ReactElement => {
  const { settings, toggleDarkMode, setFontSize, toggleHighContrast } =
    useTheme();
  const [showResetModal, setShowResetModal] = useState(false);

  const handleResetAnswers = (): void => {
    // Clear all lesson progress from localStorage
    const keysToRemove: string[] = [];

    // Collect all keys that start with the progress prefix
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("transcribe-progress-")) {
        keysToRemove.push(key);
      }
    }

    // Remove all collected keys
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    setShowResetModal(false);
    // Reload the page to reset the UI state
    window.location.reload();
  };

  return (
    <>
      <Dropdown id="theme-controls-dropdown">
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu className={styles.DropdownMenu}>
          <div className={styles.DropdownItem}>
            <button
              className={styles.ControlButton}
              onClick={toggleDarkMode}
              aria-label={
                settings.darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {settings.darkMode ? <Sun size={16} /> : <Moon size={16} />}
              <span>{settings.darkMode ? "Light mode" : "Dark mode"}</span>
            </button>
          </div>
          <div className={styles.Divider} />
          <div className={styles.DropdownItem}>
            <div className={styles.FontSizeControls}>
              <Type size={16} />
              <span>Font size:</span>
              <div className={styles.FontSizeButtons}>
                {(["S", "M", "L"] as FontSize[]).map((size) => (
                  <button
                    key={size}
                    className={`${styles.FontSizeButton} ${settings.fontSize === size ? styles.Active : ""}`}
                    onClick={() => setFontSize(size)}
                    aria-label={`Set font size to ${size}`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.Divider} />
          <div className={styles.DropdownItem}>
            <button
              className={styles.ControlButton}
              onClick={toggleHighContrast}
              aria-label={
                settings.highContrast
                  ? "Disable high contrast"
                  : "Enable high contrast"
              }
            >
              <Zap size={16} />
              <span>
                {settings.highContrast ? "Normal contrast" : "High contrast"}
              </span>
            </button>
          </div>
          <div className={styles.Divider} />
          <div className={styles.DropdownItem}>
            <button
              className={styles.ControlButton}
              onClick={() => setShowResetModal(true)}
              aria-label="Reset all saved answers"
            >
              <Trash2 size={16} />
              <span>Reset answers</span>
            </button>
          </div>
        </Dropdown.Menu>
      </Dropdown>

      {showResetModal && (
        <div className={styles.ModalOverlay}>
          <div className={styles.Modal}>
            <h3>Reset all answers</h3>
            <p>
              This will permanently delete all your saved answers and progress
              across all lessons. This action cannot be undone.
            </p>
            <p>Are you sure you want to continue?</p>
            <div className={styles.ModalButtons}>
              <button
                className={styles.CancelButton}
                onClick={() => setShowResetModal(false)}
              >
                Cancel
              </button>
              <button
                className={styles.ConfirmButton}
                onClick={handleResetAnswers}
              >
                Yes, reset everything
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
