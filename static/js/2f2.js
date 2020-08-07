async function set2Fauth(mail, pass) {
  let result = await axios.post("/twof2", {
    mail: mail,
    pass: pass,
  });

  if (result.data == true) {
    return true;
  } else {
    return false;
  }
}

async function getToken(email) {
  let result = await axios.post("/new", {
    mail: email,
  });
  return result.data;
}

function isAlready() {
  return false;
  return sessionStorage.getItem("2f2");
}

function isOk() {
  sessionStorage.setItem("2f2", true);
  return true;
}
