var csslibs = 
[
    "assets/css/icons.min.css", // App 
    "assets/css/app-modern.min.css", // App 
    // "assets/css/app-modern-dark.min.css" // App 
];

  
var jslibs = 
[
    "assets/js/vendor.min.js", // bundle
    "assets/js/app.min.js", // bundle
];


csslibs.forEach(value => {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = value;
    document.head.appendChild(link);
});

jslibs.forEach(value => {
    var child = document.createElement('script');
    child.src = value;
    child.type = "application/javascript";
    document.head.appendChild(child);
});



// var APIRoute = "https://api-stretch.pattarai.in/";

var APIRoute = "https://learnwithtamil.com/";