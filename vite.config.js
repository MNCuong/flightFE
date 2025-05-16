import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
    plugins: [vue(), vuetify({autoImport: true}),],
    optimizeDeps: {
        include: ['bootstrap']
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets')
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5005',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    }
})

