//https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial#firebase-in-react-setup
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import devConf from './dev-conf.js';

const config = {
    apiKey: devConf.apiKey,
    authDomain: devConf.authDomain,
    databaseURL: devConf.databaseURL,
    projectId: devConf.projectId,
    storageBucket: devConf.storageBucket,
    messagingSenderId: devConf.messagingSenderId,
    appId: devConf.appId,
    measurementId: devConf.measurementId
  };
  class Firebase {
    constructor() {
        firebase.initializeApp(config);
    }
}
firebase = new Firebase();
export default firebase;