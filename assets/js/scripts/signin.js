var name,
  email_user,
  photoUrl_user,
  email_verified_user,
  uid_user,
  idTokenSecure_user,
  auth_provider_user = "email_and_pass",
  email,
  photoUrl,
  email_verified,
  uid,
  idTokenSecure,
  auth_provider,
  result;

firebase.auth().onAuthStateChanged(function (userauth) {
  if (userauth) {
    // User already signed in
    localStorage.idToken = userauth.ya;
    localStorage.uid = userauth.uid;
    console.log(userauth.displayName + "is already signed in.");
    window.location.replace("profile.html");
  } else {
    const loginForm = document.querySelector("#login-form");

    function resetFields() {
      loginForm["password"].classList.remove("is-invalid");
      loginForm["emailaddress"].classList.remove("is-invalid");
    }

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      resetFields();
      const email = loginForm["emailaddress"].value;
      const password = loginForm["password"].value;
      if (email === "" && password === "") {
        loginForm["emailaddress"].classList.add("is-invalid");
        loginForm["password"].classList.add("is-invalid");
      }
      if (email === "") {
        loginForm["emailaddress"].classList.add("is-invalid");
      }
      if (password === "") {
        loginForm["password"].classList.add("is-invalid");
      }
      if (email != "" && password != "") {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            // Signed in
            console.log(user.displayName + "has signed in.");
            window.location.replace("profile.html");
          })
          .catch((error) => {
            // var errorCode = error.code;
            console.log(error.message);
            document.getElementById("error-message").innerHTML =
              "User not found, Sign Up first.";
            document
              .getElementById("registration-loader")
              .classList.add("d-none");
          });
      }
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User already signed in
          localStorage.idToken = userauth.ya;
          localStorage.uid = userauth.uid;
          console.log(user.displayName + "is now signed in.");
        } else {
          // No user is signed in.
          console.log("User not logged in");
        }
      });
    });
  }
});

function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      email = result.user.email;
      email_verified = result.user.emailVerified;
      uid = result.user.uid;
      idTokenSecure = result.credential.idToken;
      photoUrl = result.user.photoURL;
      auth_provider = result.additionalUserInfo.providerId;

      localStorage.uid = uid;
      localStorage.idToken = idTokenSecure;
      var user_details = {
        email_user: email,
        email_verified_user: email_verified,
        uid_user: uid,
        idTokenSecure_user: idTokenSecure,
        photoUrl_user: photoUrl,
        auth_provider_user: auth_provider,
      };
      console.log("Sign in with google - successful: " + result);
      console.log("User Details: " + user_details);
      $.ajax({
        type: "POST",
        url: APIRoute + "register-user.php",
        datatype: "html",
        data: {
          uid: localStorage.uid,
          token: localStorage.idToken,
        },
        success: function (response) {
          var parsedResponse = JSON.parse(response);
          console.log(parsedResponse);
          if (parsedResponse == "failed") {
            firebase
              .auth()
              .currentUser.delete()
              .then(function () {
                localStorage.uid = "";
                localStorage.idToken = "";
                window.location.replace("signup.html");
              })
              .catch(function (error) {
                console.log(error);
              });
          } else if (parsedResponse == "invalid-auth") {
            window.location.replace("index.html");
          } else {
            window.location.replace("getdetails.html");
          }
        },

        error: function (error) {
          console.log(error);
          firebase
            .auth()
            .currentUser.delete()
            .then(function () {
              window.location.replace("signup.html");
              localStorage.uid = "";
              localStorage.idToken = "";
            })
            .catch(function (error) {
              console.log(error);
            });
        },
      });
      // window.location.replace("complete-profile.html");
    })
    .catch((error) => {
      var error_details = {
        errorCode: error.code,
        errorMessage: error.message,
        email: error.email,
        credential: error.credential,
      };
      console.log(error_details);
    });
}

function signInWithfacebook() {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      email = result.user.email;
      email_verified = result.user.emailVerified;
      uid = result.user.uid;
      // idTokenSecure = result.credential.idToken;
      photoUrl = result.user.photoURL;
      auth_provider = result.additionalUserInfo.providerId;
      console.log("Facebook login - successful");
      console.log(result);
      //console.log(result.additionalUserInfo.providerId)
      firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
          // Send token to your backend via HTTPS
          var user_details = {
            email_user: email,
            email_verified_user: email_verified,
            uid_user: uid,
            idTokenSecure_user: idToken,
            photoUrl_user: photoUrl,
            auth_provider_user: auth_provider,
          };
          localStorage.uid = uid_user;
          localStorage.idToken = idTokenSecure_user;
          console.log(user_details);
          $.ajax({
            type: "POST",
            url: APIRoute + "register-user.php",
            datatype: "html",
            data: {
              uid: localStorage.uid,
              token: localStorage.idToken,
            },
            success: function (response) {
              var parsedResponse = JSON.parse(response);
              console.log(parsedResponse);
              if (parsedResponse == "failed") {
                firebase
                  .auth()
                  .currentUser.delete()
                  .then(function () {
                    localStorage.uid = "";
                    localStorage.idToken = "";
                    window.location.replace("signup.html");
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              } else if (parsedResponse == "invalid-auth") {
                window.location.replace("index.html");
              } else {
                window.location.replace("getdetails.html");
              }
            },

            error: function (error) {
              console.log(error);
              firebase
                .auth()
                .currentUser.delete()
                .then(function () {
                  window.location.replace("signup.html");
                  localStorage.uid = "";
                  localStorage.idToken = "";
                })
                .catch(function (error) {
                  console.log(error);
                });
            },
          });
          // ...
          // ...
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch((error) => {
      var error_details = {
        errorCode: error.code,
        errorMessage: error.message,
        email: error.email,
        credential: error.credential,
      };
      console.log(error_details);
      firebase
        .auth()
        .currentUser.linkWithPopup(provider)
        .then(function (result) {
          // Accounts successfully linked.
          email = result.user.email;
          email_verified = result.user.emailVerified;
          uid = result.user.uid;
          idTokenSecure = result.credential.idToken;
          photoUrl = result.user.photoURL;
          auth_provider = result.additionalUserInfo.providerId;
          console.log("Linked Facebook");
          console.log(result);
          console.log(result.additionalUserInfo.providerId);
          firebase
            .auth()
            .currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
              // Send token to your backend via HTTPS
              var user_details = {
                email_user: email,
                email_verified_user: email_verified,
                uid_user: uid,
                idTokenSecure_user: idToken,
                photoUrl_user: photoUrl,
                auth_provider_user: auth_provider,
              };
              console.log(user_details);
              $.ajax({
                type: "POST",
                url: APIRoute + "register.php",
                datatype: "html",
                data: {
                  uid: localStorage.uid,
                  token: localStorage.idToken,
                },
                success: function (response) {
                  var parsedResponse = JSON.parse(response);
                  console.log(parsedResponse);
                  if (parsedResponse == "failed") {
                    firebase
                      .auth()
                      .currentUser.delete()
                      .then(function () {
                        window.location.replace("signup.html");
                        localStorage.uid = "";
                        localStorage.idToken = "";
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  } else if (parsedResponse == "invalid-auth") {
                    window.location.replace("index.html");
                  } else {
                    window.location.replace("getdetails.html");
                  }
                },

                error: function (error) {
                  console.log(error);
                  firebase
                    .auth()
                    .currentUser.delete()
                    .then(function () {
                      window.location.replace("signup.html");
                      localStorage.uid = "";
                      localStorage.idToken = "";
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                },
              });
              // ...
            })
            .catch(function (error) {
              console.log(error);
            });

          // window.location.replace("complete-profile.html");
          // ...
        })
        .catch(function (error) {
          console.log(error);
        });
    });
}

function resetPassword() {
  const loginForm = document.querySelector("#login-form");

  loginForm.addEventListener("click", (e) => {
    const email = loginForm["emailaddress"].value;
    if (email != "") {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function () {
          // Email sent.
          document.getElementById("error-message").innerHTML =
            "Email sent to change your password";
          console.log("email sent");
        })
        .catch(function (error) {
          // An error happened.
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    } else {
      window.confirm(
        "Please enter the email id to send the reset password link"
      );
    }
  });
}

function logoutpage() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.uid = "";
      localStorage.idToken = "";
      window.location.replace("logout.html");
    })
    .catch((error) => {
      console.log(error);
    });
}
