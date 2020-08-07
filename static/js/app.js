function setUserDisplay(user) {
  let plain = document.getElementById("sign-in");

  let userTile = document.createElement("div");
  userTile.className = "user-tile";

  let userDetails = document.createElement("div");
  userDetails.className = "user-details";

  let nameElement = document.createElement("h2");
  nameElement.innerHTML = user.displayName;
  userDetails.className = "user-details";

  let uidElement = document.createElement("span");
  uidElement.innerHTML = "UID: " + user.uid;

  let emailElement = document.createElement("span");
  emailElement.innerHTML = "Email: " + user.email;

  let profilePic = document.createElement("img");
  profilePic.src = user.photoURL;
  profilePic.className = "profile-pic";

  let signOut = document.createElement("button");
  signOut.innerHTML = "<span>Sign Out</span>";
  signOut.className = "sign-out";
  signOut.onclick = signout;

  userTile.appendChild(profilePic);
  userDetails.appendChild(nameElement);
  userDetails.appendChild(emailElement);
  userDetails.appendChild(uidElement);
  userTile.appendChild(userDetails);
  userTile.appendChild(signOut);
  plain.appendChild(userTile);
}

function set2FauthDisplay(user) {
  let not = document.getElementById("not-sign-in");
  not.classList.add("hide");

  let twof2 = document.getElementById("two");
  twof2.classList.remove("hide");

  document.getElementById("profile-pic").src = user.photoURL;
  document.getElementById("email").innerHTML = user.email;
}

function setUser(user) {
  let not = document.getElementById("not-sign-in");
  let yes = document.getElementById("sign-in");

  if (user) {
    not.classList.add("hide");
    yes.classList.remove("hide");
    setUserDisplay(user);
  } else {
    not.classList.remove("hide");
    yes.classList.add("hide");
  }
}

function getUser() {
  return firebase.auth().currentUser;
}

async function twoFauth() {
  let email = getUser().email;
  let pass = document.getElementById("code").value;
  document.getElementById("two").classList.add("hide");
  let result = await set2Fauth(email, pass);
  if (result) {
    setUser(getUser());
  } else {
    alert("Wrong Token");
    signout();
  }
}

const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

async function signup() {
  let email = prompt("Enter your email");
  if (email != null) {
    let token = await getToken(email.toLowerCase());
    copyToClipboard(token);
    alert(
      "Install Google Authenticator and add this token to it \n\n" +
        token.toString() +
        "\n\nAfter Adding sign in again to use the code that Google Authenticator shows"
    );
    // signin();
  } else {
    alert("Email is empty");
  }
}
