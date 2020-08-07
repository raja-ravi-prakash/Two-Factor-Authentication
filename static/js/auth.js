var firebaseConfig = {
  apiKey: "AIzaSyDvt3nd8xMSVNV1E9gm_HP3ApSGjW9_P0s",
  authDomain: "ronin-admin.firebaseapp.com",
  databaseURL: "https://ronin-admin.firebaseio.com",
  projectId: "ronin-admin",
  storageBucket: "ronin-admin.appspot.com",
  messagingSenderId: "212916961584",
  appId: "1:212916961584:web:44318b00380bd0b7d6c8f5",
  measurementId: "G-2BTPXWM6EF",
};
firebase.initializeApp(firebaseConfig);

function getValue(name) {
  let cookies = document.cookie.split(name + "=");
  try {
    return cookies.split(";")[0];
  } catch (err) {
    console.log(err);
    return "false";
  }
}

function setValue(name, key) {
  document.cookie = ";" + document.cookie + name + "=" + key;
}

function isRedirect() {
  if (getValue("isRedirect") === "true") {
    return true;
  } else return false;
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    set2FauthDisplay(user);
  } else {
    setUser(null);
  }
});

function signout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("siggned-out");
      sessionStorage.setItem("2f2", false);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function signin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}
