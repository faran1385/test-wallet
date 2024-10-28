import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {Buffer} from "buffer";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'window.Buffer': Buffer,
    },
})
