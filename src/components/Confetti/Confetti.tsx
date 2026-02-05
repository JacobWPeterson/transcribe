import { type ReactElement, useEffect, useRef } from 'react';
import { useTheme } from '@hooks/useTheme';

import styles from './Confetti.module.scss';

interface ConfettiProps {
  show: boolean;
  onClose: () => void;
}

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  creationTime: number;
}

const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#E91E63', '#9C27B0', '#FF5722'];

export const Confetti = ({ show, onClose }: ConfettiProps): ReactElement | null => {
  const { settings } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const piecesRef = useRef<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!show) {
      return;
    }

    // Skip animation if reduced motion is enabled
    if (settings.reducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // Set canvas size
    const updateSize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Create confetti pieces over time to stagger the falling animation
    let currentTime = 0;
    const SPAWN_DURATION = 1500; // Spread creation over 1 second
    const TOTAL_PIECES = 250;

    const createConfettiPiece = (): ConfettiPiece => ({
      x: Math.random() * canvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 8 + 4,
      creationTime: currentTime
    });

    piecesRef.current = Array.from({ length: TOTAL_PIECES }, () => {
      const piece = createConfettiPiece();
      currentTime += SPAWN_DURATION / TOTAL_PIECES;
      return piece;
    });

    const startTime = Date.now();

    // Animate
    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = Date.now() - startTime;

      piecesRef.current.forEach((piece, index) => {
        // Only animate if enough time has passed since this piece was created
        if (elapsed >= piece.creationTime) {
          // Update position
          piece.x += piece.vx;
          piece.y += piece.vy;
          piece.rotation += piece.rotationSpeed;
          piece.vy += 0.1; // Gravity
        }

        // Draw confetti piece (even before it starts moving)
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        ctx.restore();

        // Remove pieces that are off screen
        if (piece.y > canvas.height + 20) {
          piecesRef.current.splice(index, 1);
        }
      });

      // Continue animation if there are pieces left
      if (piecesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return (): void => {
      window.removeEventListener('resize', updateSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [show, settings.reducedMotion]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.ConfettiWrapper}>
      <canvas ref={canvasRef} className={styles.Canvas} />
      <div className={styles.Message}>
        <div className={styles.Emoji}>🎉</div>
        <h2 className={styles.Title}>Perfect Score!</h2>
        <p className={styles.Subtitle}>You've mastered all lessons!</p>
        <button className={styles.CloseButton} onClick={onClose} aria-label="Close celebration">
          Close
        </button>
      </div>
    </div>
  );
};
