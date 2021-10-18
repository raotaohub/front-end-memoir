import { defineConfig } from 'vite'
import * as path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'
// import vitePluginImport from 'vite-plugin-babel-import'
// import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#5A7EF7',
          'success-color': '#73d13d',
          'warning-color': '#ffa940',
          'error-color': '#ff4d4f',
          'table-header-bg': '#FFFFFF',
          'layout-body-background': '#f5f5fa',
          'height-lg': '36px',
          'btn-border-radius-base': '4px',
          'btn-border-radius-sm': '4px',
          'border-radius-base': '4px',
          'checkbox-size': '20px'
        }
      }
    }
  },
  define: {
    'process.IS_DEV': "'true'"
  },
  resolve: {
    alias: {
      // '@pages': path.resolve(__dirname, './app/pages'),
      // '@': path.resolve(__dirname, './src'),
      // '@api': path.resolve(__dirname, './src/api'),
      // '@components': path.resolve(__dirname, './src/components'),
      // '@style': path.resolve(__dirname, './src/style'),
      // '@utils': path.resolve(__dirname, './src/utils'),
      // '@page': path.resolve(__dirname, './src/page'),
      // '@assets': path.resolve(__dirname, './src/assets'),
      // '@store': path.resolve(__dirname, './src/store'),
      // '@routes': path.resolve(__dirname, './src/routes'),
    }
  },
  plugins: [reactRefresh()]
})
