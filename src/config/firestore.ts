import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getApp } from 'firebase/app';

// Initialize Firestore with settings optimized for mobile
export const initializeFirestoreWithSettings = () => {
  const app = getApp();
  
  // Initialize Firestore with mobile-optimized settings
  initializeFirestore(app, {
    // Enable local persistence with memory fallback
    cacheSizeBytes: 50 * 1024 * 1024, // 50MB cache size
    experimentalForceLongPolling: true, // Better for mobile
  });

  return getFirestore(app);
};
