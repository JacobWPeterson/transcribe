import { render, screen } from '@testing-library/react';

import { GlossaryEntry } from './GlossaryEntry';

describe('GlossaryEntry', () => {
  it('should render correctly', () => {
    render(<GlossaryEntry word={'Term'} gloss={'Here is a gloss.'} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Term' })).toBeInTheDocument();
    expect(screen.getByText('Here is a gloss.')).toBeInTheDocument();
  });
});
