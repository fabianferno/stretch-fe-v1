const auth = firebase.auth();
firebase.auth().onAuthStateChanged(function (userauth) {
  if (userauth) {
    // console.log(localStorage.uid);
    // console.log(localStorage.idToken);
    $.ajax({
      type: "POST",
      url: APIRoute + "check-complete-profile.php",
      datatype: "html",
      data: {
        uid: localStorage.uid,
        token: localStorage.idToken,
      },
      success: function (res) {
        console.log(res);
        var response = JSON.parse(res);
        if (response == "no") {
          window.location.replace("getDetails.html");
        } else if (response == "invalid-auth" || response == "failed") {
          // window.location.replace("index.html");
          // console.log("logout -1");
          logoutpage();
        } else if (response == "yes") {
          $.ajax({
            type: "POST",
            url: APIRoute + "/profile-info.php",
            datatype: "html",
            data: {
              uid: localStorage.uid,
              token: localStorage.idToken,
            },
            success: function (res) {
              var data = JSON.parse(res);
              if (data == "invalid_auth" || data == "failed") {
                // console.log("logout 0");
                // window.location.replace("index.html");
                logoutpage();
              } else {
                document.getElementById("avatar-img").src = data.pic_url
                document.getElementById("username").innerHTML = data.username;
                document.getElementById("username-sub").innerHTML =
                  data.username;
                document.getElementById("username-sub1").innerHTML =
                  data.username;
                document.getElementById("phone").innerHTML = data.phone;
                document.getElementById("postcode").innerHTML = data.postcode;
                document.getElementById("gender").innerHTML = data.gender;
                document.getElementById("email").innerHTML = data.email;
              }
            },
            error: function (error) {
              console.log(error + "logout 1");
              // window.location.replace("index.html");
              logoutpage();
            },
          });
        }
      },
      error: function (error) {
        console.log(error + "logout 2");
        // window.location.replace("index.html");
        logoutpage();
      },
    });
  } else {
    // console.log("logout 3");
    // window.location.replace("index.html");
    logoutpage();
  }
});

function logoutpage() {
  //get elements
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.uid = "";
      localStorage.idToken = "";
      window.location.replace("index.html");
      // console.log("redirect called");
    })
    .catch((error) => {
      // An error happened.
    });
}
