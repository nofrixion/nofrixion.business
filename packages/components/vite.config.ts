import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { resolve } from 'path'
import { vitePlugin as utwm } from 'unplugin-tailwindcss-mangle'

const builtClassesPrefix = 'nf-wc-'

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
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'NoFrixionComponents',
      formats: ['es'],
      fileName: (format) => `index.js`,
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
