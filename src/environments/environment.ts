// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyBOhDz18ElAlwsEUbSq0ZFdbOThmUtjJRU",
    authDomain: "ema-abgabe4.firebaseapp.com",
    projectId: "ema-abgabe4",
    storageBucket: "ema-abgabe4.appspot.com",
    messagingSenderId: "649569042062",
    appId: "1:649569042062:web:fa8d38712b73522eb0d3df",
    measurementId: "G-MN9RG1Q4N9"
  }
}

  const app = initializeApp(environment.firebaseConfig);
  const analytics = getAnalytics(app);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
