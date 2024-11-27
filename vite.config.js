import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import i18nextScanner from 'vite-plugin-i18next-scanner';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    i18nextScanner({
      // Opciones del plugin
      // Puedes especificar la ruta de los archivos de traducción y otros parámetros aquí
      input: ['src/**/*.{js,jsx,ts,tsx}'], // Archivos a escanear
      output: 'locales', // Carpeta donde se guardarán los archivos de traducción
    })
  ],
})
