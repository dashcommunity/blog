import firebase from 'firebase';

const localStorageAuthKey = 'dashcommunityBlogAuth';

let provider;
let authObj;

let strategy = 'popup';

function gitHubRedirectLogin() {
    firebase.auth()
        .getRedirectResult()
        .then(handleSigninSuccess)
        .catch(handleSignInErr);

    provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    firebase.auth().signInWithRedirect(provider);
}

function gitHubPopupLogin() {
    provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    return firebase.auth()
        .signInWithPopup(provider)
        .then(handleSigninSuccess)
        .catch(handleSignInErr);
}

// function createUser(email, password) {
//     return firebase.auth().createUserWithEmailAndPassword(
//         email,
//         password
//     )
//     .then(result => {
//         user = result;
//         return user;
//     })
//     .catch(handleSignInErr);
// }

// function emailLogin(email, password) {
//     credential = firebase.auth.EmailAuthProvider.credential(
//         email,
//         password
//     );
// }

function getUser() {
    if (!authObj) {
        authObj = getAuthObj();
    }
    if (authObj && authObj.user) {
        return authObj.user;
    }

    return false;
}

function getToken() {
    if (!authObj) {
        authObj = getAuthObj();
    }
    if (authObj && authObj.token) {
        return authObj.token;
    }

    return false;
}

function setUsername(username) {
    if (!authObj) {
        authObj = getAuthObj();
    }
    if (authObj && authObj.user) {
        authObj.user.username = username;
        return authObj.user.username;
    }

    return false;
}

function getUsername() {
    if (!authObj) {
        authObj = getAuthObj();
    }
    if (authObj && authObj.user) {
        return authObj.user.username;
    }

    return '';
}

function handleSigninSuccess(result) {
    if (!authObj) {
        authObj = getAuthObj();
    }
    if (result.credential) {
        authObj.token = result.credential.accessToken;
        authObj.credential = result.credential;
    }

    // fetch('github.com', )

    authObj.user = result.user;
    authObj.provider = provider;

    window.localStorage.setItem(localStorageAuthKey, JSON.stringify(authObj));
    return authObj;
}

function handleSignInErr(err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    const email = err.email;
    if (!authObj) {
        authObj = getAuthObj();
    }
    authObj.credential = err.credential;

    if (errorCode == 'auth/account-exists-with-different-credentials') {
        console.warn('You already signed up with a different ' +
            'authentication provider for that email');
    }
    console.error(err);
}

function changeLoginStrategy(newStrategy) {
    strategy = newStrategy;
}

function getAuthObj() {
    if (authObj) {
        return authObj;
    }
    let obj;
    const authString = localStorage.getItem(localStorageAuthKey);
    if (authString) {
        obj = JSON.parse(authString);
    } else {
        obj = {};
    }
    return obj;
}

function signOut() {
    localStorage.removeItem(localStorageAuthKey);
}

function getLoginStrategy() {
    return strategy;
}

export {
    gitHubRedirectLogin,
    gitHubPopupLogin,
    // emailLogin,
    getUser,
    getToken,
    getAuthObj,
    getLoginStrategy,
    setUsername,
    getUsername,
};
