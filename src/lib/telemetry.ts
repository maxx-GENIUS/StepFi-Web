import { TelemetryEvent, TelemetrySink, ErrorContext } from './telemetry.types';

class ConsoleSink implements TelemetrySink {
  capture(event: TelemetryEvent): void {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Telemetry]', event.context.source, event.context.operation, event.message);
    }
  }
}

let activeSink: TelemetrySink = new ConsoleSink();
let telemetryEnabled = true;

export function registerSink(sink: TelemetrySink): void {
  activeSink = sink;
}

export function setTelemetryEnabled(enabled: boolean): void {
  telemetryEnabled = enabled;
}

export function reportError(error: unknown, context: ErrorContext): void {
  if (!telemetryEnabled || context.userRejected) {
    return;
  }

  try {
    const errObj = error instanceof Error ? error : new Error(String(error));
    const event: TelemetryEvent = {
      name: errObj.name,
      message: errObj.message,
      stack: errObj.stack,
      context,
      timestamp: Date.now()
    };
    activeSink.capture(event);
  } catch (sinkErr) {
    console.error('Telemetry dispatch failed:', sinkErr);
  }
}