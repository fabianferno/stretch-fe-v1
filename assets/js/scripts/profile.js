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
            success: function (response) {
              var data = JSON.parse(response);
              if (data == "invalid_auth") {
                logoutpage();
              } else {
                var fullname_holders = document.getElementsByClassName(
                  "full-name"
                );
                for (i = 0; i < fullname_holders.length; i++) {
                  fullname_holders[i].innerHTML = data.username;
                }

                document.getElementById("username-sub1").innerHTML =
                  data.username;
                document.getElementById("phone").innerHTML = data.phone;
                document.getElementById("postcode").innerHTML = data.postcode;
                document.getElementById("gender").innerHTML = data.gender;
                document.getElementById("email").innerHTML = data.email;
              }
              if (data == "failed") {
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
        console.log(error + "logout 2");
        logoutpage();
      },
    });
  } else {
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
      window.location.replace("index.html");
    })
    .catch((error) => {
      console.log(error);
    });
}
