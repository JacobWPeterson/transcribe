import type { ReactElement } from 'react';
import { createElement, useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';

import type { Manifest } from '../../files/manifests';
import manifests, { ManifestSets } from '../../files/manifests';

import { Workspace } from './Workspace';

let pageNumToSet: number | undefined = undefined;

vi.mock('./Mirador/index', () => {
  return {
    Mirador: ({ setPageNumber }: { setPageNumber: (n: number) => void }): ReactElement => {
      useEffect(() => {
        if (pageNumToSet !== undefined) {
          setPageNumber(pageNumToSet);
        }
      }, [setPageNumber]);
      return createElement('div', { 'data-testid': 'mirador' });
    }
  };
});

vi.mock('./TranscriptionArea/TranscriptionArea', () => {
  return {
    TranscriptionArea: ({
      changeManuscript,
      lessonNumber,
      manifest
    }: {
      changeManuscript: (type: 'next' | 'previous') => void;
      lessonNumber: number;
      manifest: Manifest;
    }): ReactElement =>
      createElement(
        'div',
        { 'data-testid': 'transcription' },
        createElement('h2', null, `Lesson ${lessonNumber}`),
        createElement('button', { onClick: () => changeManuscript('previous') }, 'Previous'),
        createElement('button', { onClick: () => changeManuscript('next') }, 'Next'),
        createElement('div', null, manifest?.instruction || '')
      )
  };
});

describe('Workspace', () => {
  afterEach(() => {
    vi.clearAllMocks();
    pageNumToSet = undefined;
  });

  it('renders Mirador and TranscriptionArea for a valid lesson and no wrong-page alert by default', () => {
    render(
      <MemoryRouter initialEntries={['/lessons/1']}>
        <Routes>
          <Route path="/lessons/:id" element={<Workspace set={ManifestSets.CORE} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('mirador')).toBeInTheDocument();
    expect(screen.getByTestId('transcription')).toBeInTheDocument();
    expect(screen.queryByText(/left the target image/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Lesson 1' })).toBeInTheDocument();
  });

  it('shows wrong-page alert when Mirador reports a different page number', () => {
    // For lesson 1 the canonical canvasIndex is 773 — set Mirador to report 1
    pageNumToSet = 1;

    render(
      <MemoryRouter initialEntries={['/lessons/1']}>
        <Routes>
          <Route path="/lessons/:id" element={<Workspace set={ManifestSets.CORE} />} />
        </Routes>
      </MemoryRouter>
    );

    // Alert should appear mentioning the target canvas index
    expect(
      screen.getByText(
        `Feel free to explore, but you have left the target image (${manifests[ManifestSets.CORE][1].canvasIndex}).`
      )
    ).toBeInTheDocument();
  });

  it('renders E404 when lesson id is not present in manifests', () => {
    render(
      <MemoryRouter initialEntries={['/lessons/9999']}>
        <Routes>
          <Route path="/lessons/:id" element={<Workspace set={ManifestSets.CORE} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Οοπς, παγε νοτ φουνδ!/i)).toBeInTheDocument();
  });
});
