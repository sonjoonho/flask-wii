$(document).ready(function() {

  let socket = io.connect('https://' + document.domain + ':' + location.port + "/wii");

  let room = document.getElementById("room").innerHTML;

  socket.on("connect", function() {
    console.log("Connected to room " + room);
    socket.emit("client_join", {room: room});
  });

  if (window.DeviceOrientationEvent) {
    /* alpha: direction according to the compass                         
     * beta: front-back tilt
     * gamma: left-right tilt
     */

    window.addEventListener("deviceorientation", function(eventData) {       

      let alpha = eventData.alpha;
      let beta = eventData.beta;
      let gamma = eventData.gamma;

      if (alpha > 180) {
        alpha -= 360;
      }

      socket.emit("orientation", {room: room, angles: {alpha: alpha, beta: beta, gamma: gamma}});
                                                                          
    }, false);
    
    let a_button = document.getElementById("a_button");

    /* socket.io events */

    a_button.addEventListener("touchstart", function() {
      socket.emit("a_down", {room: room});
    });

    a_button.addEventListener("touchend", function() {
      socket.emit("a_up", {room: room});
    });
    

  } else {
    console.log("Unsupported!");
    // TODO clearly this redirect doesn't work
    window.location.replace("unsupported.html");
  }
  



});
