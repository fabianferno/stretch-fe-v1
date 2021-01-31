// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// var firebaseConfig = {
//   apiKey: "AIzaSyBHPx5ij0m6J8LdAZlpzCAjoF2mJDDC2hk",
//   authDomain: "stretch-pattarai.firebaseapp.com",
//   projectId: "stretch-pattarai",
//   storageBucket: "stretch-pattarai.appspot.com",
//   messagingSenderId: "1046668280702",
//   appId: "1:1046668280702:web:a17d1559f809831d8e692f",
//   measurementId: "G-LS9VD8ZZQC",
// };
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
// Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// firebase.analytics();
const auth = firebase.auth();

const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const retypepassword = signupForm["re-type-password"].value;
  const email = signupForm["emailaddress"].value;
  const password = signupForm["password"].value;

  if (retypepassword === "" && email === "" && password === "") {
    signupForm["re-type-password"].classList.add("is-invalid");
    signupForm["emailaddress"].classList.add("is-invalid");
    signupForm["password"].classList.add("is-invalid");
  } else {
    signupForm["re-type-password"].classList.remove("is-invalid");
    signupForm["emailaddress"].classList.remove("is-invalid");
    signupForm["password"].classList.remove("is-invalid");
    if (password === "" && emailaddress === "") {
      signupForm["emailaddress"].classList.add("is-invalid");
      signupForm["password"].classList.add("is-invalid");
    } else {
      signupForm["emailaddress"].classList.remove("is-invalid");
      signupForm["password"].classList.remove("is-invalid");

      if (emailaddress === "" && retypepassword === "") {
        signupForm["re-type-password"].classList.add("is-invalid");
        signupForm["emailaddress"].classList.add("is-invalid");
      } else {
        signupForm["re-type-password"].classList.remove("is-invalid");
        signupForm["emailaddress"].classList.remove("is-invalid");

        if ((password === "") & (retypepassword === "")) {
          signupForm["re-type-password"].classList.add("is-invalid");
          signupForm["password"].classList.add("is-invalid");
        } else {
          signupForm["re-type-password"].classList.remove("is-invalid");
          signupForm["password"].classList.remove("is-invalid");
          if (email === "") {
            // signupForm['re-type-password'].classList.remove("is-invalid");
            signupForm["emailaddress"].classList.add("is-invalid");
            // signupForm['password'].classList.remove("is-invalid");
          } else {
            signupForm["emailaddress"].classList.remove("is-invalid");

            if (password === "") {
              signupForm["password"].classList.add("is-invalid");
            } else {
              signupForm["password"].classList.remove("is-invalid");
              if (retypepassword === "") {
                signupForm["re-type-password"].classList.add("is-invalid");
              } else {
                signupForm["re-type-password"].classList.remove("is-invalid");
                signupForm["re-type-password"].classList.remove("is-invalid");
                //signupForm['emailaddress'].classList.remove("is-invalid");
                signupForm["password"].classList.remove("is-invalid");
                if (password.length < 6) {
                  signupForm["password"].classList.add("is-invalid");
                  signupForm["re-type-password"].classList.add("is-invalid");
                  document.getElementById("error-message").innerHTML =
                    "Password length should be greater than 6 characters";
                } else {
                  signupForm["password"].classList.remove("is-invalid");
                  signupForm["re-type-password"].classList.remove("is-invalid");
                  if (retypepassword === password) {
                    document.getElementById("error-message").innerHTML = "";
                    if (document.getElementById("checkbox-signup").checked) {
                      firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then((user) => {
                          document.getElementById("email-verified").innerHTML =
                            "Email has been sent to the given email id Kindly verify it";
                          document
                            .getElementById("registration-button-text")
                            .classList.add("d-none");
                          document
                            .getElementById("registration-loader")
                            .classList.remove("d-none");
                          signupForm.reset();
                          signupForm["re-type-password"].classList.remove(
                            "is-invalid"
                          );
                          signupForm["emailaddress"].classList.remove(
                            "is-invalid"
                          );
                          signupForm["password"].classList.remove("is-invalid");
                          document.getElementById("error-message").innerHTML =
                            "";
                          console.log(user.additionalUserInfo.providerId);
                          var user = firebase.auth().currentUser;
                          var name,
                            email,
                            photoUrl,
                            uid,
                            emailVerified,
                            idTokenSecure;

                          if (user != null) {
                            name = user.displayName;
                            email = user.email;
                            photoUrl = user.photoURL;
                            emailVerified = user.emailVerified;
                            uid = user.uid;
                            localStorage.uid = uid;
                            //  idTokenSecure =   // The user's ID, unique to the Firebase project. Do NOT use
                            // this value to authenticate with your backend server, if
                            // you have one. Use User.getToken() instead.
                          }

                          //  console.log(name, email, photoUrl, emailVerified, uid, idTokenSecure);

                          user
                            .sendEmailVerification()
                            .then(function () {
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
                                    auth_provider_user: "password",
                                  };

                                  localStorage.idToken = idToken;

                                  $.ajax({
                                    type: "POST",
                                    url: APIRoute + "register.php",
                                    datatype: "html",
                                    data: {
                                      uid: localStorage.uid,
                                      token: localStorage.idToken,
                                    },
                                    success: function (reg_response) {
                                      var jsonparsecont = JSON.parse(
                                        reg_response
                                      );
                                      console.log(jsonparsecont);
                                      if (jsonparsecont == "failed") {
                                        var userdel = firebase.auth()
                                          .currentUser;

                                        userdel
                                          .delete()
                                          .then(function () {
                                            window.location.replace(
                                              "signup.html"
                                            );
                                            localStorage.uid = "";
                                            localStorage.idToken = "";
                                          })
                                          .catch(function (error) {
                                            // An error happened.
                                          });
                                      } else if (
                                        jsonparsecont == "invalid-auth"
                                      ) {
                                        window.location.replace("index.html");
                                      } else {
                                        window.location.replace(
                                          "getDetails.html"
                                        );
                                      }
                                    },

                                    error: function (error) {
                                      var userdel = firebase.auth().currentUser;

                                      userdel
                                        .delete()
                                        .then(function () {
                                          window.location.replace(
                                            "signup.html"
                                          );
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
                              // Email sent
                            })
                            .catch(function (error) {
                              // An error happened.
                              document.getElementById(
                                "error-message"
                              ).innerHTML =
                                error.message +
                                "<br>Please try to sign in with Google or Facebook instead.";
                              document
                                .getElementById("registration-button-text")
                                .classList.remove("d-none");
                              document
                                .getElementById("registration-loader")
                                .classList.add("d-none");
                            });
                        })
                        .catch((error) => {
                          var errorCode = error.code;
                          var errorMessage = error.message;
                          document.getElementById("error-message").innerHTML =
                            errorMessage +
                            "<br>Please try to sign in with Google or Facebook instead.";
                          //                  console.log(error);
                          signupForm["re-type-password"].classList.add(
                            "is-invalid"
                          );
                          signupForm["emailaddress"].classList.add(
                            "is-invalid"
                          );
                          signupForm["password"].classList.add("is-invalid");
                          document
                            .getElementById("registration-button-text")
                            .classList.remove("d-none");
                          document
                            .getElementById("registration-loader")
                            .classList.add("d-none");
                        });
                    } else {
                      document.getElementById("error-message").innerHTML =
                        "Accept the terms and conditions";
                    }
                  } else {
                    signupForm["password"].classList.add("is-invalid");
                    signupForm["re-type-password"].classList.add("is-invalid");
                    document.getElementById("error-message").innerHTML =
                      "The Entered Password do not match";
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // get user info
});
function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      //   console.log(result);
      email = result.user.email;
      email_verified = result.user.emailVerified;
      uid = result.user.uid;
      localStorage.uid = uid;
      idTokenSecure = result.credential.idToken;
      photoUrl = result.user.photoURL;
      auth_provider = result.additionalUserInfo.providerId;
      //    console.log(result.additionalUserInfo.providerId);
      var user_details = {
        email_user: email,
        email_verified_user: email_verified,
        uid_user: uid,
        idTokenSecure_user: idTokenSecure,
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
