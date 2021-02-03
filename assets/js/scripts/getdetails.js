const auth = firebase.auth();
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
        if (parsedResponse == "yes") {
          window.location.replace("profile.html");
        } else if (
          parsedResponse == "invalid-auth" ||
          parsedResponse == "failed" ||
          parsedResponse == ""
        ) {
          logoutpage();
        }
      },
      error: function (error) {
        console.log(error);
        logoutpage();
      },
    });
  } else {
    window.location.replace("index.html");
  }
});

document.getElementById("email").value = firebase.auth().currentUser.email;

function hidebox(x) {
  if (x == 0) {
    document.getElementById("pregnant-check").classList.add("d-none");
    document.getElementById("pregnant-no").checked = true;
  } else {
    document.getElementById("pregnant-check").classList.remove("d-none");
  }
}

// function limitPhone(element) {
//   var max_chars = 10;
//   if (element.value.length > max_chars) {
//     element.value = element.value.substring(0, max_chars);
//   }
// }
// function limitPostcode(element) {
//   var max_chars = 8;

//   if (element.value.length > max_chars) {
//     element.value = element.value.substring(0, max_chars);
//   }
// }

profile_page.addEventListener("submit", (e) => {
  e.preventDefault();

  function emptyStringcheck(ans) {
    const values = ans.replace(/\s/g, "");
    return values;
  }

  // function checkedRadio(ans) {
  //   for (i = 0; i < ans.length; i++) {
  //     if (ans[i].checked) {
  //       return ans[i].value;
  //     }
  //   }
  // }

  // Getting text input and checking if they are empty spaces
  const name1 = profile_page["name"].value;
  const name = emptyStringcheck(name1);

  var max_chars = 10;
  const email = auth.currentUser.email;
  const phoneNum = profile_page["phoneNum"].value;

  const postcode1 = profile_page["postcode"].value;
  const postcode = emptyStringcheck(postcode1).substring(0, max_chars);

  const allergies1 = profile_page["allergies"].value;
  const allergies = emptyStringcheck(allergies1);

  const surgeries1 = profile_page["surgeries"].value;
  const surgeries = emptyStringcheck(surgeries1);

  const focus1 = profile_page["focus"].value;
  const focus = emptyStringcheck(focus1);

  // Getting radio button inputs

  var gender = $('input[name="gender"]:checked').val();
  console.log(gender);

  var pacemaker = $('input[name="pacemaker"]:checked').val();

  var iud = $('input[name="iud"]:checked').val();

  var pregnant = $('input[name="pregnant"]:checked').val();

  // Highlighting the input boxes red if they are empty
  if (name === "") {
    profile_page["name"].classList.add("is-invalid");
    document.getElementById("errorMessage").innerHTML =
      "Please fill in all details";
  } else {
    profile_page["name"].classList.remove("is-invalid");
  }

  if (email === "") {
    profile_page["email"].classList.add("is-invalid");
    document.getElementById("errorMessage").innerHTML =
      "Please fill in all details";
  } else {
    profile_page["email"].classList.remove("is-invalid");
  }

  if (phoneNum === "") {
    profile_page["phoneNum"].classList.add("is-invalid");
    document.getElementById("errorMessage").innerHTML =
      "Please fill in all details";
  } else {
    profile_page["phoneNum"].classList.remove("is-invalid");
  }

  if (postcode === "") {
    profile_page["postcode"].classList.add("is-invalid");
    document.getElementById("errorMessage").innerHTML =
      "Please fill in all details";
  } else {
    profile_page["postcode"].classList.remove("is-invalid");
  }

  if (allergies === "") {
    profile_page["allergies"].classList.add("is-invalid");
    document.getElementById("errorMessage").innerHTML =
      "Please fill in all details";
  } else {
    profile_page["allergies"].classList.remove("is-invalid");
  }

  if (surgeries === "") {
    profile_page["surgeries"].classList.add("is-invalid");
    document.getElementById("errorMessage").innerHTML =
      "Please fill in all details";
  } else {
    profile_page["surgeries"].classList.remove("is-invalid");
  }

  if (focus === "") {
    profile_page["focus"].classList.add("is-invalid");
    document.getElementById("errorMessage").innerHTML =
      "Please fill in all details";
  } else {
    profile_page["focus"].classList.remove("is-invalid");
  }

  // If all the inputs are valid, making an ajax request
  if (
    name !== "" &&
    email !== "" &&
    phoneNum !== "" &&
    postcode !== "" &&
    allergies !== "" &&
    surgeries !== "" &&
    focus !== ""
  ) {
    document.getElementById("errorMessage").innerHTML = "";
    document.getElementById("registration-loader").classList.remove("d-none");
    document.getElementById("registration-button-text").classList.add("d-none");

    $.ajax({
      type: "POST",
      url: APIRoute + "update-profile.php",
      datatype: "html",
      data: {
        uid: localStorage.uid,
        token: localStorage.idToken,
        name: name,
        email: email,
        phoneNum: phoneNum,
        postcode: postcode,
        allergies: allergies,
        surgeries: surgeries,
        focus: focus,
        gender: gender,
        pacemaker: pacemaker,
        iud: iud,
        pregnant: pregnant,
      },
      success: function (response) {
        var parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        if (parsedResponse == "success") {
          window.location.replace("profile.html");
        } else if (
          parsedResponse == "invalid_auth" ||
          parsedResponse == "failed"
        ) {
          logoutpage();
        }
      },
      error: function (error) {
        console.log(error);
        logoutpage();
      },
    });
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
