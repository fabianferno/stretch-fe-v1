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

const auth = firebase.auth();
firebase.auth().onAuthStateChanged(function (userauth) {
  if (userauth) {
    localStorage.idToken = userauth.ya;
    localStorage.uid = userauth.uid;
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
            window.location.replace("profile.html");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            document.getElementById("error-message").innerHTML = errorMessage;
            document
              .getElementById("registration-loader")
              .classList.add("d-none");
          });
      }
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          console.log(user);
        } else {
          // No user is signed in.
          console.log("not logged in");
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
      console.log(result);
      email = result.user.email;
      email_verified = result.user.emailVerified;
      uid = result.user.uid;
      localStorage.uid = uid;
      idTokenSecure = result.credential.idToken;
      localStorage.idToken = idTokenSecure;
      photoUrl = result.user.photoURL;
      auth_provider = result.additionalUserInfo.providerId;
      var user_details = {
        email_user: email,
        email_verified_user: email_verified,
        uid_user: uid,
        idTokenSecure_user: idTokenSecure,
        photoUrl_user: photoUrl,
        auth_provider_user: auth_provider,
      };
      console.log(auth_provider);
      $.ajax({
        type: "POST",
        url: APIRoute + "register.php",
        datatype: "html",
        data: {
          uid: localStorage.uid,
          token: localStorage.idToken,
        },
        success: function (reg_response) {
          var jsonparsecont = JSON.parse(reg_response);
          console.log(jsonparsecont);
          if (jsonparsecont == "failed") {
            var userdel = firebase.auth().currentUser;

            userdel
              .delete()
              .then(function () {
                window.location.replace("Signup.html");
                localStorage.uid = "";
                localStorage.idToken = "";
              })
              .catch(function (error) {
                // An error happened.
              });
          } else if (jsonparsecont == "invalid-auth") {
            window.location.replace("index.html");
          } else {
            window.location.replace("getDetails.html");
          }
        },

        error: function (error) {
          var userdel = firebase.auth().currentUser;

          userdel
            .delete()
            .then(function () {
              window.location.replace("signup.html");
              localStorage.uid = "";
              localStorage.idToken = "";
            })
            .catch(function (error) {
              // An error happened.
            });
        },
      });
      // window.location.replace("complete-profile.html");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
}
function signInWithfacebook() {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // console.log(result)
      email = result.user.email;
      email_verified = result.user.emailVerified;
      uid = result.user.uid;
      // idTokenSecure = result.credential.idToken;
      photoUrl = result.user.photoURL;
      auth_provider = result.additionalUserInfo.providerId;
      console.log("Normal Facebook");
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
          $.ajax({
            type: "POST",
            url: APIRoute + "register.php",
            datatype: "html",
            data: {
              uid: localStorage.uid,
              token: localStorage.idToken,
            },
            success: function (reg_response) {
              var jsonparsecont = JSON.parse(reg_response);
              console.log(jsonparsecont);
              if (jsonparsecont == "failed") {
                var userdel = firebase.auth().currentUser;

                userdel
                  .delete()
                  .then(function () {
                    window.location.replace("signup.html");
                    localStorage.uid = "";
                    localStorage.idToken = "";
                  })
                  .catch(function (error) {
                    // An error happened.
                  });
              } else if (jsonparsecont == "invalid-auth") {
                window.location.replace("index.html");
              } else {
                window.location.replace("getDetails.html");
              }
            },

            error: function (error) {
              var userdel = firebase.auth().currentUser;

              userdel
                .delete()
                .then(function () {
                  window.location.replace("signup.html");
                  localStorage.uid = "";
                  localStorage.idToken = "";
                })
                .catch(function (error) {
                  // An error happened.
                });
            },
          });
          // ...
          // ...
        })
        .catch(function (error) {
          // Handle error
        });

      // window.location.replace("complete-profile.html");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      auth.currentUser
        .linkWithPopup(provider)
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
              $.ajax({
                type: "POST",
                url: APIRoute + "register.php",
                datatype: "html",
                data: {
                  uid: localStorage.uid,
                  token: localStorage.idToken,
                },
                success: function (reg_response) {
                  var jsonparsecont = JSON.parse(reg_response);
                  console.log(jsonparsecont);
                  if (jsonparsecont == "failed") {
                    var userdel = firebase.auth().currentUser;

                    userdel
                      .delete()
                      .then(function () {
                        window.location.replace("signup.html");
                        localStorage.uid = "";
                        localStorage.idToken = "";
                      })
                      .catch(function (error) {
                        // An error happened.
                      });
                  } else if (jsonparsecont == "invalid-auth") {
                    window.location.replace("index.html");
                  } else {
                    window.location.replace("getDetails.html");
                  }
                },

                error: function (error) {
                  var userdel = firebase.auth().currentUser;

                  userdel
                    .delete()
                    .then(function () {
                      window.location.replace("signup.html");
                      localStorage.uid = "";
                      localStorage.idToken = "";
                    })
                    .catch(function (error) {
                      // An error happened.
                    });
                },
              });
              // ...
            })
            .catch(function (error) {
              // Handle error
            });

          // window.location.replace("complete-profile.html");
          // ...
        })
        .catch(function (error) {
          // Handle Errors here.
          // ...
        });
    });
}

function resetPassword() {
  const loginForm = document.querySelector("#login-form");

  loginForm.addEventListener("click", (e) => {
    const email = loginForm["emailaddress"].value;
    if (email != "") {
      auth
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