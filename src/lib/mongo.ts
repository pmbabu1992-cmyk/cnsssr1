// // src/lib/mongo.ts
// import mongoose from 'mongoose';

// export async function connectMongo(uri: string) {
//   if (mongoose.connection.readyState >= 1) return; // already connected
//   await mongoose.connect(uri);
//   console.log('[mongo] connected');
// }

// export async function disconnectMongo() {
//   await mongoose.disconnect();
//   console.log('[mongo] disconnected');
// }


// src/lib/mongo.ts
// import mongoose from 'mongoose';

// export async function connectMongo(uri: string) {
//   if (mongoose.connection.readyState >= 1) return; // already connected
//   await mongoose.connect(uri);
//   console.log('[mongo] connected');
// }

// export async function disconnectMongo() {
//   await mongoose.disconnect();
//   console.log('[mongo] disconnected');
// }



// import mongoose from 'mongoose';

// export async function connectMongo(uri: string) {
//   if (mongoose.connection.readyState >= 1) return; // already connected or connecting
//   await mongoose.connect(uri);
//   console.log('[mongo] connected');
// }

// export async function disconnectMongo() {
//   await mongoose.disconnect();
//   console.log('[mongo] disconnected');
// }



// src/lib/mongo.ts
import mongoose from 'mongoose';

let connecting: Promise<typeof mongoose> | null = null;

/** Optional: tweak Mongoose behavior (useful in older schemas) */
// mongoose.set('strictQuery', true); // enable if you want strict query casting

/** Connect once; safe to call multiple times (dev HMR, SSR warmups, tests). */
export async function connectMongo(uri: string) {
  // Already connected
  if (mongoose.connection.readyState === 1) return mongoose;
  // Connecting in progress
  if (mongoose.connection.readyState === 2 && connecting) return connecting;

  // Helpful connection event logs (optional)
  mongoose.connection.on('connected', () => console.log('[mongo] connected'));
  mongoose.connection.on('reconnected', () => console.log('[mongo] reconnected'));
  mongoose.connection.on('disconnected', () => console.log('[mongo] disconnected'));
  mongoose.connection.on('error', (err) => console.error('[mongo] error:', err));

  // One in-flight promise to avoid races
  connecting = mongoose.connect(uri, {
    // Sensible defaults; tune if needed
    serverSelectionTimeoutMS: 10000, // fail fast if server unreachable
    // maxPoolSize: 10,
    // minPoolSize: 0,
  });

  try {
    await connecting;
    return mongoose;
  } finally {
    // allow a new connect attempt if the previous one failed
    connecting = null;
  }
}

/** Graceful shutdown (call from your server shutdown path if desired). */
export async function disconnectMongo() {
  if (mongoose.connection.readyState === 0) return;
  await mongoose.disconnect();
  console.log('[mongo] disconnected');
}
