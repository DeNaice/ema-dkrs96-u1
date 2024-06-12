import {enableProdMode, importProvidersFrom} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {provideHttpClient} from "@angular/common/http";
import {IonicModule} from "@ionic/angular";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({innerHTMLTemplatesEnabled: true})),
    provideIonicAngular(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"ema-abgabe4","appId":"1:649569042062:web:fa8d38712b73522eb0d3df","storageBucket":"ema-abgabe4.appspot.com","apiKey":"AIzaSyBOhDz18ElAlwsEUbSq0ZFdbOThmUtjJRU","authDomain":"ema-abgabe4.firebaseapp.com","messagingSenderId":"649569042062","measurementId":"G-MN9RG1Q4N9"})), provideFirestore(() => getFirestore()),
  ],
});
