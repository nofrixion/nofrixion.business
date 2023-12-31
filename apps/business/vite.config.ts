import path from 'node:path'

import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import banner from 'vite-plugin-banner'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

import packageJson from './package.json'

const env = loadEnv('all', process.cwd())

const fileName = env.VITE_NOFRIXION_PULL_REQUEST_ID
  ? `nofrixion-business.pr${env.VITE_NOFRIXION_PULL_REQUEST_ID}.js`
  : 'nofrixion-business.js'

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
      fileName: () => fileName,
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
    builtClassesPrefix: `""`,
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
      '/approve': {
        target: 'https://localhost:7105',
        secure: false,
      },
    },
  },
})
