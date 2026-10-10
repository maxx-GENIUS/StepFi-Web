export type ErrorSource = 'transaction' | 'auth' | 'mutation' | 'render' | 'global';

export interface ErrorContext {
  source: ErrorSource;
  operation?: string;
  statusCode?: number;
  code?: string;
  userRejected?: boolean;
  metadata?: Record<string, unknown>;
}

export interface TelemetryEvent {
  name: string;
  message: string;
  stack?: string;
  context: ErrorContext;
  timestamp: number;
}

export interface TelemetrySink {
  capture(event: TelemetryEvent): void;
  flush?(): Promise<void>;
}