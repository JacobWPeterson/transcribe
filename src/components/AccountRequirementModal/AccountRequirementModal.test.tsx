import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AccountRequirementModal } from './AccountRequirementModal';

describe('AccountRequirementModal', () => {
  it('should render the modal when isOpen is true', () => {
    render(<AccountRequirementModal isOpen onClose={vi.fn()} />);

    // Check for dialog element which indicates the modal is rendered
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    // Check for the main content text
    expect(
      screen.getByText(/To support more users and improve your experience/)
    ).toBeInTheDocument();
  });

  it('should not render the modal when isOpen is false', () => {
    const { container } = render(<AccountRequirementModal isOpen={false} onClose={vi.fn()} />);

    expect(container.firstChild).toBeNull();
  });

  it('should display all key information', () => {
    render(<AccountRequirementModal isOpen onClose={vi.fn()} />);

    expect(screen.getByText("What's changing?")).toBeInTheDocument();
    expect(screen.getByText('Why?')).toBeInTheDocument();
    expect(screen.getByText(/Save Progress:/)).toBeInTheDocument();
    expect(screen.getByText(/Download Reports:/)).toBeInTheDocument();
    expect(screen.getByText(/Current Session:/)).toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<AccountRequirementModal isOpen onClose={onClose} />);

    const closeButton = screen.getByRole('button', { name: /Got it/ });
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should close on Escape key press', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<AccountRequirementModal isOpen onClose={onClose} />);

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should have proper accessibility labels', () => {
    render(<AccountRequirementModal isOpen onClose={vi.fn()} />);

    const button = screen.getByRole('button', { name: /Got it/ });
    expect(button).toBeInTheDocument();

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-header');
  });
});
