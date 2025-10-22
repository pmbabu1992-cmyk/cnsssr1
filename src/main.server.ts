// import { bootstrapApplication } from '@angular/platform-browser';
// import { App } from './app/app';
// import { config } from './app/app.config.server';

// const bootstrap = () => bootstrapApplication(App, config);

// export default bootstrap;


// Got it—here’s a general, safe default you can drop in that works for most Angular 20 SSR apps.

// src/main.server.ts (minimal + safe)

// import { bootstrapApplication } from '@angular/platform-browser';
// import { App } from './app/app';
// import { config } from './app/app.config.server';
// // (No need to import a BootstrapContext type; just forward what Angular gives you)

// export default function bootstrap(context: unknown) {
//   // Pass context as the 3rd argument (required for SSR in v20)
//   return bootstrapApplication(App, config, context as any);
// }


// If you do require a base-href (e.g., custom deploy path), use this guarded version:

// If your app is mounted under a sub-path, you can still add providers and pass the context:

// src/main.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

// ✅ Use your actual root component + server config paths:
import { App } from './app/app';                         // or: import { AppComponent as App } from './app/app.component';
import { config } from './app/app.config.server';        // the merged server config you showed

type ServerContext = { url?: string | URL; request?: Request };

function getPathname(ctx?: ServerContext) {
  if (!ctx?.url) return '/';
  return typeof ctx.url === 'string'
    ? new URL(ctx.url, 'http://localhost').pathname
    : (ctx.url as URL).pathname || '/';
}

export default function bootstrap(context: ServerContext) {
  return bootstrapApplication(
    App,
    {
      providers: [
        ...(config.providers ?? []),
        { provide: APP_BASE_HREF, useValue: getPathname(context) },
      ],
    },
    context as any // ← required on server in Angular 20
  );
}

