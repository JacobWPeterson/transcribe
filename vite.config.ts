import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { overrides } from './.eslintrc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svgr({
            svgrOptions: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                    plugins: [{
                        name: 'preset-default',
                        params: {
                            overrides: {
                                removeViewBox: false
                            }
                        }
                    }]
                },
                titleProp: true,
                ref: true
            }
        }),
        react()
    ],
    server: {
        hmr: true,
        port: 3000,
        open: true,
    }
})