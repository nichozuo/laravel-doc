import { defineConfig } from 'umi';

export default defineConfig({
  base: '/docs',
  publicPath: '/docs/',
  outputPath: 'docs',
  history: { type: 'hash' },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  dynamicImport: {},
  proxy: {
    '/api': {
      target: 'http://192.168.0.234:8000',
      changeOrigin: true,
    },
  },
});
