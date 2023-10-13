import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import paths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), paths(), svgr()],
  test: {
    setupFiles: './tests/setup.ts',
    threads: false, // https://github.com/vitest-dev/vitest/issues/2008
    cache: false, // https://github.com/vitest-dev/vitest/issues/2008
    open: false,
    allowOnly: true,
    passWithNoTests: true,
    globals: true,
    watch: false,
    testTimeout: 30000,
    environment: 'jsdom',
    include: ['**/?(*.)test.?(c|m)[jt]s?(x)'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'dist/', 'coverage/'],
    },
  },
});
