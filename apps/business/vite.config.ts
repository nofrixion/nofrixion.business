import path from 'node:path'

import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

import packageJson from './package.json'

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dts({
      insertTypesEntry: true,
    }),
    basicSsl(),
    banner(`NoFrixion Business - Version ${packageJson.version}`),
  ],
  build: {
    minify: 'terser',
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'NoFrixionBusiness',
      formats: ['umd'],
      fileName: () => `nofrixion-business.js`,
    },
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          axios: 'axios',
          '@tanstack/react-query': '@tanstack/react-query',
          '@nofrixion/moneymoov': '@nofrixion/moneymoov',
          '@nofrixion/components': '@nofrixion/components',
        },
      },
    },
  },
  define: {
    'import.meta.env.version': JSON.stringify(packageJson.version),
    'process.env': `"${process.env}"`,
  },
  server: {
    port: 3001,
    strictPort: true,

    // Development https://vitejs.dev/config/#server-proxy
    // these are the proxy routes that will be forwarded to your **BFF**
    proxy: {
      '/bff': {
        target: 'https://localhost:7105',
        secure: false,
      },
      '/signin-oidc': {
        target: 'https://localhost:7105',
        secure: false,
      },
      '/signout-callback-oidc': {
        target: 'https://localhost:7105',
        secure: false,
      },
      '/api': {
        target: 'https://localhost:7105',
        secure: false,
      },
    },
  },
})
