import { forwardRef, type ReactElement, type Ref } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Moon, Settings, Sun, Type, Zap } from "react-feather";

import { useTheme, type FontSize } from "../../contexts/ThemeContext";

import styles from "./ThemeControls.module.scss";

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
  )
);

CustomToggle.displayName = "CustomToggle";

export const ThemeControls = (): ReactElement => {
  const { settings, toggleDarkMode, setFontSize, toggleHighContrast } =
    useTheme();

  return (
    <Dropdown id="theme-controls-dropdown">
      <Dropdown.Toggle as={CustomToggle} />
      <Dropdown.Menu className={styles.DropdownMenu}>
        <div className={styles.DropdownItem}>
          <button
            className={styles.ControlButton}
            onClick={toggleDarkMode}
            aria-label={
              settings.darkMode ? "Switch to light mode" : "Switch to dark mode"
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
      </Dropdown.Menu>
    </Dropdown>
  );
};
