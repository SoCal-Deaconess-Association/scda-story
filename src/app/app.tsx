import { INTERNAL_CONSOLE_STYLE } from '@assets/style/global.style';
import { displaySignature } from '@assets/utils/tmc.util';
import { Nav } from '@components/nav';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import './app.css';

/**
 * —————————————————————————————————————————————————————
 *                      CONSTANTS
 */

/**
 * Grab the dev tool environmental.
 */
const DEV_TOOLS = import.meta.env.VITE_DEV_TOOLS;

/**
 * —————————————————————————————————————————————————————
 *                        MAIN
 */

/**
 * Fallback component if App fails to render.
 *
 * @param see {@link FallbackProps}
 * @returns A component that displays the error message.
 */
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button type="button" onClick={resetErrorBoundary}>
      Try again
    </button>
  </div>
);

/**
 * Entry point of the application.
 *
 * @author Tristan Chilvers
 */
const App = () => {
  /**
   * .....................................................
   * Conditions
   * ! Do NOT define any useEffects below here !
   */

  if (DEV_TOOLS)
    console.log(
      '%c[internal] | Dev Tools are enabled.',
      INTERNAL_CONSOLE_STYLE,
    );

  /**
   * .....................................................
   * Functions
   */

  displaySignature();

  /**
   * .....................................................
   * Render
   */

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Nav />
    </ErrorBoundary>
  );
};

/**
 * Connect index.html to the react application.
 */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);