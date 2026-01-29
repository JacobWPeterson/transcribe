/* eslint-disable import/no-unassigned-import */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';

import { createRoot } from 'react-dom/client';
import { AuthProvider } from '@contexts/AuthContext';

import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '../contexts/ThemeContext';

import { Routes } from './Routes';
import { AppWrapper } from './AppWrapper/AppWrapper';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <AuthProvider>
      <ThemeProvider>
        <AppWrapper>
          <Routes />
        </AppWrapper>
      </ThemeProvider>
    </AuthProvider>
  </ErrorBoundary>
);
