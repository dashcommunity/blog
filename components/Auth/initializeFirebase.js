import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyDayBqMwkiAQ76WHCfGWS7ZHqJYro_Ofw0',
    databaseURL: 'https://dashcommunity-blog.firebaseio.com',
    authDomain: 'dashcommunity-blog.firebaseapp.com',
    projectId: 'dashcommunity-blog',
    storageBucket: 'dashcommunity-blog.appspot.com',
    messagingSenderId: '451048266119',
};

firebase.initializeApp(config);
