var csslibs = [
  "assets/css/icons.min.css", // App
  "assets/css/app-modern.min.css", // App
  // "assets/css/app-modern-dark.min.css" // App
];

var jslibs = [
  "assets/js/vendor.min.js", // bundle
  "assets/js/app.min.js", // bundle
  "https://www.gstatic.com/firebasejs/8.2.2/firebase-app.js",
  "https://www.gstatic.com/firebasejs/8.2.1/firebase-auth.js",
  "https://www.gstatic.com/firebasejs/8.2.2/firebase-analytics.js",
  "js/firebase.js",
];

csslibs.forEach((value) => {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = value;
  document.head.appendChild(link);
});
jslibs.forEach((value) => {
  var child = document.createElement("script");
  child.src = value;
  child.setAttribute("defer", true);
  child.setAttribute("async", false);
  child.type = "application/javascript";
  document.head.appendChild(child);
});

// var APIRoute = "https://api-stretch.pattarai.in/";

var APIRoute = "http://localhost/stretch-api-v1/";
