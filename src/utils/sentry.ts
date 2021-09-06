import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import { sentryConfig } from '../../build/config';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const sentry = (app: any, router: any) => {
  if (
    process.env.NODE_ENV === 'test' ||
    process.env.NODE_ENV === 'test1' ||
    process.env.NODE_ENV === 'grey' ||
    process.env.NODE_ENV === 'prod'
  ) {
    Sentry.init({
      app,
      dsn: sentryConfig.dsn,
      release: sentryConfig.release,
      environment: sentryConfig.environment,
      integrations: [
        new Integrations.BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(router),
          tracingOrigins: ['localhost', /^\//]
        })
      ],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: sentryConfig.tracesSampleRate
    });
  }
};

export default sentry;
