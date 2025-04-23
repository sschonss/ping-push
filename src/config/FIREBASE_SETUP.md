# Firebase Setup Instructions

To properly configure Firebase for mobile use and fix the persistence warning, update your `firebase.ts` file to include the following changes:

1. Remove any existing `getFirestore()` initialization
2. Import and use the new Firestore configuration:

```typescript
import { initializeApp } from 'firebase/app';
import { initializeFirestoreWithSettings } from './firestore';

// Your existing Firebase config
const firebaseConfig = {
  // ... your config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with mobile-optimized settings
export const db = initializeFirestoreWithSettings();

// Export other Firebase services as needed
export { app };
```

This configuration will:
- Enable proper mobile persistence
- Set an appropriate cache size (50MB)
- Use long polling for better mobile performance
- Provide a fallback to memory cache when needed

The warning about IndexedDB should be resolved with these settings.
