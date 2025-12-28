import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as localStorageUtils from '../../utils/localStorage';

import { OnboardingModal } from './OnboardingModal';

// Mock the localStorage utilities
vi.mock('../../utils/localStorage', () => ({
  markOnboardingAsSeen: vi.fn()
}));

describe('OnboardingModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the modal when isOpen is true', () => {
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);
      expect(screen.getByText('Getting started')).toBeInTheDocument();
    });

    it('should not render the modal content when isOpen is false', () => {
      render(<OnboardingModal isOpen={false} onClose={vi.fn()} />);
      expect(screen.queryByText('Getting started')).not.toBeInTheDocument();
    });

    it('should display the first slide title on initial render', () => {
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);
      expect(screen.getByText('Welcome to Xeirographa')).toBeInTheDocument();
    });

    it('should render all slide navigation dots', () => {
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);
      const dots = screen.getAllByRole('button', { name: /Go to slide/ });
      expect(dots).toHaveLength(6);
    });
  });

  describe('navigation', () => {
    it('should navigate to next slide when Next button is clicked', async () => {
      const user = userEvent.setup();
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByText('Welcome to Xeirographa')).toBeInTheDocument();

      const nextButton = screen.getByRole('button', { name: 'Next' });
      await user.click(nextButton);

      expect(screen.getByText('The manuscript viewer')).toBeInTheDocument();
      expect(screen.queryByText('Welcome to Xeirographa')).not.toBeInTheDocument();
    });

    it('should navigate to previous slide when Previous button is clicked', async () => {
      const user = userEvent.setup();
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);

      // Go to second slide
      const nextButton = screen.getByRole('button', { name: 'Next' });
      await user.click(nextButton);

      // Go back to first slide
      const previousButton = screen.getByRole('button', { name: 'Previous' });
      await user.click(previousButton);

      expect(screen.getByText('Welcome to Xeirographa')).toBeInTheDocument();
    });

    it('should navigate to slide when dot is clicked', async () => {
      const user = userEvent.setup();
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);

      const thirdSlideDot = screen.getByRole('button', { name: 'Go to slide 3' });
      await user.click(thirdSlideDot);

      expect(screen.getByText('The transcription area')).toBeInTheDocument();
    });

    it('should disable Previous button on first slide', () => {
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);
      const previousButton = screen.getByRole('button', { name: 'Previous' });
      expect(previousButton).toBeDisabled();
    });

    it('should enable Previous button on non-first slides', async () => {
      const user = userEvent.setup();
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);

      const nextButton = screen.getByRole('button', { name: 'Next' });
      await user.click(nextButton);

      const previousButton = screen.getByRole('button', { name: 'Previous' });
      expect(previousButton).not.toBeDisabled();
    });

    it('should show "Next" button on non-last slides', () => {
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);
      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    });

    it('should show "Get started" button on last slide', async () => {
      const user = userEvent.setup();
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);

      const lastSlideDot = screen.getByRole('button', { name: 'Go to slide 6' });
      await user.click(lastSlideDot);

      expect(screen.getByRole('button', { name: 'Get started' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
    });
  });

  describe('closing the modal', () => {
    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const onCloseMock = vi.fn();
      render(<OnboardingModal isOpen={true} onClose={onCloseMock} />);

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(onCloseMock).toHaveBeenCalled();
    });

    it('should call onClose when "Get started" button is clicked on last slide', async () => {
      const user = userEvent.setup();
      const onCloseMock = vi.fn();
      render(<OnboardingModal isOpen={true} onClose={onCloseMock} />);

      const lastSlideDot = screen.getByRole('button', { name: 'Go to slide 6' });
      await user.click(lastSlideDot);

      const getStartedButton = screen.getByRole('button', { name: 'Get started' });
      await user.click(getStartedButton);

      expect(onCloseMock).toHaveBeenCalled();
    });

    it('should mark onboarding as seen when modal is closed', async () => {
      const user = userEvent.setup();
      const onCloseMock = vi.fn();
      render(<OnboardingModal isOpen={true} onClose={onCloseMock} />);

      const lastSlideDot = screen.getByRole('button', { name: 'Go to slide 6' });
      await user.click(lastSlideDot);

      const getStartedButton = screen.getByRole('button', { name: 'Get started' });
      await user.click(getStartedButton);

      expect(localStorageUtils.markOnboardingAsSeen).toHaveBeenCalled();
    });

    it('should mark onboarding as seen when close button is clicked', async () => {
      const user = userEvent.setup();
      const onCloseMock = vi.fn();
      render(<OnboardingModal isOpen={true} onClose={onCloseMock} />);

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(localStorageUtils.markOnboardingAsSeen).toHaveBeenCalled();
    });

    it('should not mark onboarding as seen when skipMarkAsSeen is true', async () => {
      const user = userEvent.setup();
      const onCloseMock = vi.fn();
      render(<OnboardingModal isOpen={true} onClose={onCloseMock} skipMarkAsSeen={true} />);

      const lastSlideDot = screen.getByRole('button', { name: 'Go to slide 6' });
      await user.click(lastSlideDot);

      const getStartedButton = screen.getByRole('button', { name: 'Get started' });
      await user.click(getStartedButton);

      expect(localStorageUtils.markOnboardingAsSeen).not.toHaveBeenCalled();
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  describe('slide content', () => {
    it('should display correct content for welcome slide', () => {
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);
      expect(
        screen.getByText(/This interactive workspace helps you learn to read Greek manuscripts/)
      ).toBeInTheDocument();
    });

    it('should display correct content for manuscript viewer slide', async () => {
      const user = userEvent.setup();
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);

      const nextButton = screen.getByRole('button', { name: 'Next' });
      await user.click(nextButton);

      expect(screen.getByText(/Mirador viewer/)).toBeInTheDocument();
    });

    it('should display correct content for transcription area slide', async () => {
      const user = userEvent.setup();
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);

      const thirdSlideDot = screen.getByRole('button', { name: 'Go to slide 3' });
      await user.click(thirdSlideDot);

      expect(screen.getByText('The transcription area')).toBeInTheDocument();
    });

    it('should display submission status information on status slide', async () => {
      const user = userEvent.setup();
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);

      const fourthSlideDot = screen.getByRole('button', { name: 'Go to slide 4' });
      await user.click(fourthSlideDot);

      expect(screen.getByText(/submission statuses/)).toBeInTheDocument();
      expect(screen.getByAltText('correct')).toBeInTheDocument();
      expect(screen.getByAltText('incorrect')).toBeInTheDocument();
    });

    it('should display tips on success slide', async () => {
      const user = userEvent.setup();
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);

      const fifthSlideDot = screen.getByRole('button', { name: 'Go to slide 5' });
      await user.click(fifthSlideDot);

      expect(screen.getByText('Tips for success')).toBeInTheDocument();
      expect(screen.getByText(/Zoom in:/)).toBeInTheDocument();
    });

    it('should display final encouragement on last slide', async () => {
      const user = userEvent.setup();
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);

      const lastSlideDot = screen.getByRole('button', { name: 'Go to slide 6' });
      await user.click(lastSlideDot);

      expect(screen.getByText(/Happy transcribing/)).toBeInTheDocument();
    });
  });

  describe('progress indicator', () => {
    it('should mark current slide dot as active', () => {
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);
      const dots = screen.getAllByRole('button', { name: /Go to slide/ });

      // First dot should have the active class
      expect(dots[0].className).toMatch(/DotActive/);
    });

    it('should update active dot when navigating with buttons', async () => {
      const user = userEvent.setup();
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);

      const nextButton = screen.getByRole('button', { name: 'Next' });
      await user.click(nextButton);

      const dots = screen.getAllByRole('button', { name: /Go to slide/ });
      expect(dots[0].className).not.toMatch(/DotActive/);
      expect(dots[1].className).toMatch(/DotActive/);
    });

    it('should update active dot when clicking dot navigation', async () => {
      const user = userEvent.setup();
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);

      const fourthSlideDot = screen.getByRole('button', { name: 'Go to slide 4' });
      await user.click(fourthSlideDot);

      const dots = screen.getAllByRole('button', { name: /Go to slide/ });
      expect(dots[3].className).toMatch(/DotActive/);
      expect(dots[0].className).not.toMatch(/DotActive/);
    });
  });

  describe('accessibility', () => {
    it('should have accessible slide navigation dots', () => {
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);
      const dots = screen.getAllByRole('button', { name: /Go to slide/ });

      dots.forEach((dot, index) => {
        expect(dot).toHaveAttribute('aria-label', `Go to slide ${index + 1}`);
      });
    });

    it('should have slide title as heading', () => {
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);
      const slideTitle = screen.getByText('Welcome to Xeirographa');
      expect(slideTitle.tagName).toBe('H3');
    });

    it('should have descriptive modal header', () => {
      render(<OnboardingModal isOpen={true} onClose={vi.fn()} />);
      const header = screen.getByText('Getting started');
      expect(header).toBeInTheDocument();
    });
  });
});
