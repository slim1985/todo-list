import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyCiA6n6d7-fjZyhJXHTX06WX7RMrWdlTpM',
    authDomain: 'ssulimov-todo.firebaseapp.com',
    projectId: 'ssulimov-todo',
    storageBucket: 'ssulimov-todo.appspot.com',
    messagingSenderId: '177684971035',
    appId: '1:177684971035:web:55d9d0a48e9d92d20b42be',
    measurementId: 'G-9Z8DMNW1ZE',
};

export const firebaseApp = initializeApp(firebaseConfig);
