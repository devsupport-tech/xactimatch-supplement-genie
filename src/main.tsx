
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerSW } from './serviceWorker'

// Use React 18 createRoot API with explicit typing and error handling
const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

// Apply React 18 concurrent rendering for better performance
const root = createRoot(container);
root.render(<App />);

// Register service worker for offline capabilities and caching
registerSW();
