import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import banner from 'vite-plugin-banner'
import { vitePlugin as utwm } from 'unplugin-tailwindcss-mangle'

const builtClassesPrefix = 'nf-wc-'

const preserveClassNames = [
  // https://tailwindcss.com/docs/transition-timing-function start
  // https://github.com/sonofmagic/tailwindcss-mangle/issues/21
  'ease-out',
  'ease-linear',
  'ease-in',
  'ease-in-out',
  // https://tailwindcss.com/docs/transition-timing-function end
]

const includeClassNames = ['collapse']

export default defineConfig({
  plugins: [
    react(),
    utwm({
      mangleClassFilter(className) {
        // If classname is in the preserveClassNames array, don't mangle it
        if (preserveClassNames.includes(className)) return false

        // If classname is in the includeClassNames array, mangle it
        if (includeClassNames.includes(className)) return true

        return /[:-]/.test(className)
      },
      classGenerator: {
        classPrefix: builtClassesPrefix,
        customGenerate: (original, options) => {
          return options.classPrefix + original
        },
      },
    }),
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
