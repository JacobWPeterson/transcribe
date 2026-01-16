import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import { Guide } from './Guide';

describe('Guide', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Guide />
      </BrowserRouter>
    );

    expect(screen.getByText('Guide')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View getting started guide' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Symbols' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'How-to' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Image viewer' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Transcription workspace' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Entering abbreviations, contractions, numbers, and ligatures'
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Found an issue?' })).toBeInTheDocument();
  });
});
