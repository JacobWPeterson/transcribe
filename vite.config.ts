/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    base: '/',
    plugins: [
      svgr({
        svgrOptions: {
          prettier: false,
          svgo: false,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: { overrides: { removeViewBox: false } }
              }
            ]
          },
          titleProp: true,
          ref: true
        }
      }),
      react()
    ],
    resolve: {
      alias: {
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@files': path.resolve(__dirname, 'src/files'),
        '@pages': path.resolve(__dirname, 'src/pages')
      }
    },
    server: { hmr: true, port: 3000, open: true },
    build: { outDir: 'dist' },
    publicDir: 'src/static',
    css: {
      modules: {
        generateScopedName: isProduction ? '[hash:base64]' : '[path][name]_[local]'
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['**/*.test.ts*'],
      setupFiles: './vitestSetup.ts'
    }
  };
});
