import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import banner from 'vite-plugin-banner'

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    banner(`NoFrixion Web Components - Version ${process.env.npm_package_version}`),
  ],
  build: {
    minify: 'terser',
    lib: {
      formats: ['umd'], // We can also build for ES adding 'es' to the array
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'web-components',
      fileName: () => `web-components.js`,
    },
  },
  define: {
    'process.env': `"${process.env}"`,
  },
})
