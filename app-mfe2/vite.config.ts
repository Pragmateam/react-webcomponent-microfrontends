import path from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';

import ssl from '@vitejs/plugin-basic-ssl';
import react from "@vitejs/plugin-react-swc";
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import paths from 'vite-tsconfig-paths';


const target = 'es2015';
const appName = 'app-mfe2';
const envPrefixes = ['REACT_APP_', 'VITE_'];

export const isDev = (mode: string) => mode === 'development';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react({
        tsDecorators: true
      }),
      dts({
        copyDtsFiles: true,
        strictOutput: true,
        rollupTypes: true,
        include: ['src']
      }),
      ssl(),
      paths(),
      svgr(),
      splitVendorChunkPlugin()
    ],

    envPrefix: envPrefixes,

    define: {
      'process.env.NODE_ENV': `"${mode}"`
    },

    build: {
      assetsDir: './',
      emptyOutDir: true,
      copyPublicDir: isDev(mode) ? true : false,

      // Code
      target: target,
      minify: isDev(mode) ? false : 'esbuild',
      sourcemap: isDev(mode) ? 'inline' : false,

      // Styles
      cssTarget: target,
      cssMinify: isDev(mode) ? false : 'esbuild',

      lib: {
        entry: path.resolve(__dirname, 'src', 'webcomponent.ts'),
        name: appName,
      },
    },

    server: {
      open: true,
      cors: true,
      https: true,
    },
  }
});
