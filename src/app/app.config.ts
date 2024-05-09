import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'simple-crm-e2c5c',
          appId: '1:488148744412:web:8e76dfa27226c50af85c19',
          storageBucket: 'simple-crm-e2c5c.appspot.com',
          apiKey: 'AIzaSyDxRshuMnonuLYicWhOAsHmpd3QTH6-hrc',
          authDomain: 'simple-crm-e2c5c.firebaseapp.com',
          messagingSenderId: '488148744412',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
