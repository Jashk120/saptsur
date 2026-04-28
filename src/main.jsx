```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * Renders the React application into the DOM by mounting the root component
 * with StrictMode enabled for development-time checks.
 *
 * @param rootElement - The DOM element with id 'root' serving as the mounting point.
 * @returns {void} Renders the React tree into the DOM.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```