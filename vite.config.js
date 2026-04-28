```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite configuration for the project.
 *
 * @returns {import('vite').UserConfig} The Vite configuration object.
 */
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```