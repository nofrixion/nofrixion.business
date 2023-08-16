import path from 'node:path'

import react from '@vitejs/plugin-react-swc'
import { vitePlugin as utwm } from 'unplugin-tailwindcss-mangle'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

import { builtClassesPrefix } from './src/utils/constants'

export default defineConfig({
  plugins: [
    react(),
    utwm({
      classGenerator: {
        classPrefix: builtClassesPrefix,
        customGenerate: (original, options) => {
          return options.classPrefix + original
        },
      },
    }),
    cssInjectedByJsPlugin(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    minify: 'terser',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'NoFrixionComponents',
      formats: ['es'],
      fileName: () => `index.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
