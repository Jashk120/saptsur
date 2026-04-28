```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
/**
 * Defines and exports the Vite configuration object for the project.
 *
 * @param config - The configuration object provided by Vite's defineConfig helper.
 * @returns The complete Vite configuration object with plugins and settings.
 */
export default defineConfig({
  plugins: [react()],
})
```