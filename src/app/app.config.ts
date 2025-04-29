import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "examen-6293c", appId: "1:613470056062:web:21b647abda2996ddb2722f", storageBucket: "examen-6293c.firebasestorage.app", apiKey: "AIzaSyATmehCyB7JTAzRmXmxt_rdWZ1xdZviteo", authDomain: "examen-6293c.firebaseapp.com", messagingSenderId: "613470056062", measurementId: "G-VLZ48F3MCG" })), provideFirestore(() => getFirestore())]
};
