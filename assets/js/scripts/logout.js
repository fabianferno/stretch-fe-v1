function logoutpage() {
  //get elements
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.uid = "";
      localStorage.idToken = "";
      window.location.replace("logout.html");
    })
    .catch((error) => {
      // An error happened.
    });
}
