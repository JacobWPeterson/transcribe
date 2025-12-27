import { render, screen } from '@testing-library/react';

import { Glossary } from './Glossary';

describe('Glossary', () => {
  it('should render correctly', () => {
    render(<Glossary />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Glossary');

    // Render long gloss when available
    expect(screen.getByRole('heading', { level: 2, name: 'Abbreviation' })).toBeInTheDocument();
    expect(
      screen.getByText(
        'Abbreviations were used for word endings common or repeated words and some names. Abbreviation could be done by writing only the first letter or first few letters of a word, or by omitting word endings. One example is "και compendium" (ϗ) where a kappa with a trailing flourish stands for και. When the shortening is done by omitting the middle letters it is called a contraction (see below).'
      )
    ).toBeInTheDocument();

    // Render short gloss when long gloss is not available
    expect(screen.getByRole('heading', { level: 2, name: 'Contraction' })).toBeInTheDocument();
    expect(
      screen.getByText(
        'A type of abbreviation where the word is shortened by omitting the middle letters.'
      )
    ).toBeInTheDocument();
  });
});
