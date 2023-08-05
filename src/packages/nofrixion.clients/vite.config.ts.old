import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'NoFrixionClients',
      formats: ['es', 'umd'],
      fileName: (format) => `nofrixion-clients.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'axios', '@tanstack/react-query'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          axios: 'axios',
          '@tanstack/react-query': '@tanstack/react-query',
        },
      },
    },
  },
})
