import { resolve } from 'node:path'

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        components: resolve(__dirname, 'src/components/index.ts'),
        composables: resolve(__dirname, 'src/composables/index.ts'),
        app: resolve(__dirname, 'src/app/index.ts'),
        styles: resolve(__dirname, 'src/styles/index.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['vue', '@floating-ui/dom'],
    },
    emptyOutDir: true,
  },
})
