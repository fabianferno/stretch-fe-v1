firebase.auth().onAuthStateChanged(function (userauth) {
  if (userauth) {
    $.ajax({
      type: "POST",
      url: APIRoute + "check-complete-profile.php",
      datatype: "html",
      data: {
        uid: localStorage.uid,
        token: localStorage.idToken,
      },
      success: function (response) {
        var parsedResponse = JSON.parse(response);
        if (parsedResponse == "no") {
          window.location.replace("getDetails.html");
        } else if (
          parsedResponse == "invalid-auth" ||
          parsedResponse == "failed"
        ) {
          logoutpage();
        } else if (parsedResponse == "yes") {
          $.ajax({
            type: "POST",
            url: APIRoute + "/profile-info.php",
            datatype: "html",
            data: {
              uid: localStorage.uid,
              token: localStorage.idToken,
            },
            success: function (response) {
              var parsedResponse = JSON.parse(response);
              if (parsedResponse == "invalid_auth") {
                console.log("logout 2");
                logoutpage();
              } else {
                var fullname_holders = document.getElementsByClassName(
                  "full-name"
                );
                for (i = 0; i < fullname_holders.length; i++) {
                  fullname_holders[i].innerHTML = parsedResponse.username;
                }

                document.getElementById("username-sub1").innerHTML =
                  parsedResponse.username;
                document.getElementById("phone").innerHTML =
                  parsedResponse.phone;
                document.getElementById("postcode").innerHTML =
                  parsedResponse.postcode;
                document.getElementById("gender").innerHTML =
                  parsedResponse.gender;
                document.getElementById("email").innerHTML =
                  parsedResponse.email;
              }
              if (parsedResponse == "failed") {
                window.location.replace("getdetails.html");
              }
            },
            error: function (error) {
              console.log(error + "logout 1");
              logoutpage();
            },
          });
        }
      },
      error: function (error) {
        console.log(error + "logout 0");
        logoutpage();
      },
    });
  } else {
    console.log("User not signed in.");
    logoutpage();
  }
});

function logoutpage() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.uid = "";
      localStorage.idToken = "";
      console.log("Logging out...");
      window.location.replace("index.html");
    })
    .catch((error) => {
      console.log(error);
    });
}
