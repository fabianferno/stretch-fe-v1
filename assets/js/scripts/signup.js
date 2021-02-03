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
                                  localStorage.uid = uid;
                                  console.log(JSON.stringify(user_details));

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
                                            window.location.replace(
                                              "signup.html"
                                            );
                                            localStorage.uid = "";
                                            localStorage.idToken = "";
                                          })
                                          .catch(function (error) {
                                            console.log(error);
                                          });
                                      } else if (
                                        parsedResponse == "invalid-auth"
                                      ) {
                                        window.location.replace("index.html");
                                      } else {
                                        window.location.replace(
                                          "getdetails.html"
                                        );
                                      }
                                    },

                                    error: function (error) {
                                      console.log(error);
                                      firebase
                                        .auth()
                                        .currentUser.delete()
                                        .then(function () {
                                          window.location.replace(
                                            "signup.html"
                                          );
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
    .then((userCredential) => {
      email = userCredential.user.email;
      email_verified = userCredential.user.emailVerified;
      uid = userCredential.user.uid;
      idTokenSecure = userCredential.credential.idToken;
      photoUrl = userCredential.user.photoURL;
      auth_provider = userCredential.additionalUserInfo.providerId;

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
      console.log(JSON.stringify(user_details));
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
              localStorage.uid = "";
              localStorage.idToken = "";
              window.location.replace("signup.html");
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
      console.log(JSON.stringify(error_details));
    });
}
function signInWithfacebook() {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((userCredential) => {
      email = userCredential.user.email;
      email_verified = userCredential.user.emailVerified;
      uid = userCredential.user.uid;
      // idTokenSecure = userCredential.credential.idToken;
      photoUrl = userCredential.user.photoURL;
      auth_provider = userCredential.additionalUserInfo.providerId;
      console.log("Facebook Signup");
      //console.log(userCredential.additionalUserInfo.providerId)
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
          console.log(JSON.stringify(user_details));
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
                window.location.replace("getDetails.html");
              }
            },

            error: function (error) {
              console.log(error);
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
            },
          });
          // ...
          // ...
        })
        .catch(function (error) {
          console.log(error);
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
      console.log(JSON.stringify(error_details));
      firebase
        .auth()
        .currentUser.linkWithPopup(provider)
        .then(function (userCredential) {
          // Accounts successfully linked.
          email = userCredential.user.email;
          email_verified = userCredential.user.emailVerified;
          uid = userCredential.user.uid;
          idTokenSecure = userCredential.credential.idToken;
          photoUrl = userCredential.user.photoURL;
          auth_provider = userCredential.additionalUserInfo.providerId;
          console.log("Linked Facebook");
          console.log(userCredential.additionalUserInfo.providerId);
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
              console.log(JSON.stringify(user_details));
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
                      localStorage.uid = "";
                      localStorage.idToken = "";
                      window.location.replace("signup.html");
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
        })
        .catch(function (error) {
          console.log(error);
        });
    });
}

function logoutpage() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.uid = "";
      localStorage.idToken = "";
      console.log("Logging out...");
      window.location.replace("logout.html");
    })
    .catch((error) => {
      console.log(error);
    });
}
