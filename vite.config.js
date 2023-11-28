import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'Quizzard/', // Replace with your actual repository name
  plugins: [vue()],
});
