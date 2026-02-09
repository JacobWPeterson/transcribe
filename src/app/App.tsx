/* eslint-disable import/no-unassigned-import */
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/index.scss';

import { createRoot } from 'react-dom/client';
import { AuthProvider } from '@contexts/AuthProvider';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '@contexts/ThemeProvider';
import { MigrationProvider } from '@contexts/MigrationProvider';

import { Routes } from './Routes';
import { AppWrapper } from './AppWrapper/AppWrapper';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <AuthProvider>
      <MigrationProvider>
        <ThemeProvider>
          <AppWrapper>
            <Routes />
          </AppWrapper>
        </ThemeProvider>
      </MigrationProvider>
    </AuthProvider>
  </ErrorBoundary>
);
