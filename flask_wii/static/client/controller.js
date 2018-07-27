$(document).ready(function() {
  

  var socket = io.connect('http://' + document.domain + ':' + location.port);

  socket.on("connect", function() {
    console.log("Connected");
    socket.emit("joined", {data: "5"});
  });

  $("#A").click(function() {
    socket.emit("A_Press", "");

  });

  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(eventData) {
      /* alpha: direction according to the compass
       * beta: front-back tilt
       * gamma: left-right tilt
       */
      var gamma = eventData.gamma;
      var beta = eventData.beta;
      var alpha = eventData.alpha;
      console.log("("+alpha+","+beta+","+gamma+")");
      socket.emit("orientation", {alpha: alpha, beta: beta, gamma: gamma});

    }, false);
  } else {
    console.log("Unsupported!");
    // TODO clearly this redirect doesn't work
    window.location.replace("unsupported.html");
  }
  



});
