import { reportError } from './telemetry';

let installed = false;
let lastSignature = '';
let lastTimestamp = 0;
const DEDUP_WINDOW_MS = 5000;

function isDuplicate(sig: string): boolean {
  const now = Date.now();
  if (sig === lastSignature && now - lastTimestamp < DEDUP_WINDOW_MS) {
    return true;
  }
  lastSignature = sig;
  lastTimestamp = now;
  return false;
}

export function installGlobalErrorHandlers(): void {
  if (installed || typeof window === 'undefined') {
    return;
  }
  installed = true;

  window.addEventListener('error', (event: ErrorEvent) => {
    const errorObj = event.error || new Error(event.message || 'Script error');
    const sig = ${event.message}::;
    if (isDuplicate(sig)) return;

    const isResourceLoad = !event.error && event.target instanceof HTMLElement;
    reportError(errorObj, {
      source: 'global',
      operation: 'window.onerror',
      metadata: {
        filename: event.filename ? event.filename.split('?')[0] : undefined,
        lineno: event.lineno,
        resourceLoad: isResourceLoad
      }
    });
  });

  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    if (event.reason && (event.reason.name === 'AbortError' || event.reason.code === 20)) {
      return; // Ignore intentional fetch abortions
    }

    const err = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    const sig = ejection:;
    if (isDuplicate(sig)) return;

    reportError(err, {
      source: 'global',
      operation: 'unhandledrejection'
    });
  });
}