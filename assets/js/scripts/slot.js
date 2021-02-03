const auth = firebase.auth();
firebase.auth().onAuthStateChanged(function (userauth) {
  if (userauth) {
    // window.location.replace("appointment.html");
    $.ajax({
      type: "POST",
      url: APIRoute + "profile-info.php",
      datatype: "html",
      data: {
        uid: localStorage.uid,
        token: localStorage.idToken,
      },
      success: function (res) {
        var data = JSON.parse(res);
        if (data == "invalid_auth" || data == "failed") {
          // window.location.replace("index.html");
          logoutpage();
        } else {
          document.getElementById("username-sub1").innerHTML = data.username;
        }
      },
      error: function (error) {
        console.log(error);
        // window.location.replace("index.html");
        logoutpage();
      },
    });
  } else {
    window.location.replace("index.html");
  }
});

function addTimes(startTime, endTime) {
  var times = [0, 0, 0];
  var max = times.length;

  var a = (startTime || "").split(":");
  var b = (endTime || "").split(":");

  // normalize time values
  for (var i = 0; i < max; i++) {
    a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
    b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
  }

  // store time values
  for (var i = 0; i < max; i++) {
    times[i] = a[i] + b[i];
  }

  var hours = times[0];
  var minutes = times[1];
  var seconds = times[2];

  if (seconds >= 60) {
    var m = (seconds / 60) << 0;
    minutes += m;
    seconds -= 60 * m;
  }

  if (minutes >= 60) {
    var h = (minutes / 60) << 0;
    hours += h;
    minutes -= 60 * h;
  }

  return (
    ("0" + hours).slice(-2) +
    ":" +
    ("0" + minutes).slice(-2) +
    ":" +
    ("0" + seconds).slice(-2)
  );
}

var SlotTime;
function userDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}
function addTimes(startTime, endTime) {
  var times = [0, 0, 0];
  var max = times.length;

  var a = (startTime || "").split(":");
  var b = (endTime || "").split(":");

  // normalize time values
  for (var i = 0; i < max; i++) {
    a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
    b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
  }

  // store time values
  for (var i = 0; i < max; i++) {
    times[i] = a[i] + b[i];
  }

  var hours = times[0];
  var minutes = times[1];
  var seconds = times[2];

  if (seconds >= 60) {
    var m = (seconds / 60) << 0;
    minutes += m;
    seconds -= 60 * m;
  }

  if (minutes >= 60) {
    var h = (minutes / 60) << 0;
    hours += h;
    minutes -= 60 * h;
  }

  return (
    ("0" + hours).slice(-2) +
    ":" +
    ("0" + minutes).slice(-2) +
    ":" +
    ("0" + seconds).slice(-2)
  );
}
function appointmentPage(slot) {
  console.log(slot);
  if (slot == 20) {
    SlotTime = "00:20:00";
  } else if (slot == 30) {
    SlotTime = "00:30:00";
  } else {
    SlotTime = "00:50:00";
  }

  document.getElementById("main").innerHTML =
    '<div class="content"><div class="row"><div class="col-12"><div class="page-title-box"><div class="row" style="margin-left: 3px;"><h4 class="page-title">Appointment</h4><i class="page-title card-pricing-icon mdi mdi-chevron-double-right mr-1 " style="font-size: 25px;"></i><h4 class="page-title text-primary">Time</h4></div></div></div></div><div class="row"><div class="col-lg-4"><div class="card"><div class="card-body"><div class="row"><div class="col-lg-12"><form method="POST" id="Appointment"><div class="form-group mb-3"><label for="example-date">Date</label><input class="form-control" id="example-date" type="date" name="date"></div><div class="form-group mb-3"><label for="example-time">Time</label><input class="form-control" id="example-time" type="time" name="time"></div><button class="btn btn-primary" type="button" onclick="bookAppointment(' +
    slot +
    ');">Submit</button></form></div></div><span id="slot"></span></div></div>  </div><div class="col-lg-8"><div class="card"><div class="card-body"><div class="col-lg-6"><div class="mt-4 mt-lg-0"><div id="calendar"><iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FLondon&amp;src=ZDIzdWNuY2x0cjI4MmRqOTloaWRzaGJuMmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23E67C73&amp;mode=WEEK&amp;title=Available%20Session" style="border: 0" width="600" height="400" frameborder="0" scrolling="no"></iframe> </div></div> </div></div> </div> </div></div></div>';
}

function bookAppointment(Slot) {
  //console.log(Slot);
  var date = document.getElementById("example-date").value;
  convertedDate = userDate(date);
  var time = document.getElementById("example-time").value;
  var startTime = time;
  var convertedstartTime = date + " " + time + ":00";
  time = addTimes(time, SlotTime);
  var convertedendTime = date + " " + time;
  console.log(convertedstartTime);
  console.log(convertedendTime);

  $.ajax({
    type: "POST",
    url: APIRoute + "scheduler/calendar.php",
    datatype: "html",
    data: {
      convertedstartTime: convertedstartTime,
      convertedendTime: convertedendTime,
    },
    success: function (response) {
      var parsedResponse = JSON.parse(response);
      if (json_response.status == "true") {
        document.getElementById("main").innerHTML =
          '<div class="row"><div class="col-12"><div class="page-title-box"><div class="row"><h4 class="page-title">Appointment</h4><i class="page-title card-pricing-icon mdi mdi-chevron-double-right mr-1 "style="font-size: 25px;"></i><h4 class="page-title text-primary">Payment</h4></div></div></div></div><div class="container-fluid"><div class="row justify-content-center"><div class="row"> <div class="col-lg-12"><div class="card" style="min-width: 400px;"><div class="card-body text-center"><h4 class="header-title mb-3">Payment Details</h4><div class="table-responsive text-left"><table class="table mb-0"> <thead class="thead-light"> <tr> <th>Info</th><th>Details</th></tr></thead><tbody><tr><td>Slot</td><td>' +
          (Slot - 5) +
          " mins</td></tr><tr><td>Date</td><td>" +
          date +
          "</td> </tr><tr><td>Time</td><td>" +
          time +
          '</td></tr><tr><td><b>Cost</b></td><td><b>$ 5</b></td></tr></tbody></table> </div><button class="btn btn-outline-success mt-4 mb-2 btn-rounded" onclick="makePayment()" style="font-size: 20px;"><i class="uil-money-withdrawal"></i> Proceed to  Pay</button></div></div></div></div></div></div>';
        document.getElementById("main").innerHTML =
          '<div class="row"><div class="col-12"><div class="page-title-box"><div class="row"><h4 class="page-title">Appointment</h4><i class="page-title card-pricing-icon mdi mdi-chevron-double-right mr-1 "style="font-size: 25px;"></i><h4 class="page-title text-primary">Payment</h4></div></div></div></div><div class="container-fluid"><div class="row justify-content-center"><div class="row"> <div class="col-lg-12"><div class="card" style="min-width: 400px;"><div class="card-body text-center"><h4 class="header-title mb-3">Payment Details</h4><div class="table-responsive text-left"><table class="table mb-0"> <thead class="thead-light"> <tr> <th>Info</th><th>Details</th></tr></thead><tbody><tr><td>Slot</td><td>' +
          (Slot - 5) +
          " mins</td></tr><tr><td>Date</td><td>" +
          convertedDate +
          "</td> </tr><tr><td>Time</td><td>" +
          startTime +
          '</td></tr><tr><td><b>Cost</b></td><td><b>$ 5</b></td></tr></tbody></table> </div><button class="btn btn-outline-success mt-4 mb-2 btn-rounded" onclick="makePayment()" style="font-size: 20px;"><i class="uil-money-withdrawal"></i> Proceed to  Pay</button></div></div></div></div></div></div>';
      } else {
        document.getElementById("slot").innerHTML =
          '<p style="text-align:center;font-weight: 200;font-size:20px;color:#ff6347"><br>' +
          parsedResponse.available +
          "</p>";
      }
      // window.location.replace("profile.html");
    },
    error: function (error) {
      console.log(error);
      // window.location.replace("login.html");
    },
  });
}

var stripe = Stripe(
  "pk_test_51HZZPIJ4yqhJ2spEZ5pB81N9HsNANuQvww3W1P930UaegcupuzyBUDEisy2EufpnSlJupQgL2Wcssv6rBNSEZc5M00YlGhSVQG"
);

function makePayment() {
  // Create an instance of the Stripe object with your publishable API key
  fetch(APIRoute + "create-checkout-session.php", {
    method: "POST",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (session) {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function (result) {
      // If redirectToCheckout fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using error.message.
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
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
