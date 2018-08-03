$(document).ready(function() {
  

  let socket = io.connect('https://' + document.domain + ':' + location.port + "/wii");

  // Pass room letiable from template?
  let room = document.getElementById("room").innerHTML;

  socket.on("connect", function() {
    console.log("Connected to room " + room);
    socket.emit("client_join", {room: room});
  });

  $("#a_button").click(function() {
    socket.emit("a_press", "");

  });

  if (window.DeviceOrientationEvent) {
    /* alpha: direction according to the compass                         
     * beta: front-back tilt
     * gamma: left-right tilt
     */

    let alpha, beta, gamma;
  
    window.addEventListener("deviceorientation", function(eventData) {       

      // This is for zeroing the values. I think this is required on iOS but not Android or not idk
      // if (alpha_0 === null) {
      //   alpha_0 = eventData.alpha;
      // }

      // alpha = eventData.alpha - alpha_0;
      // beta = eventData.beta;
      // gamma = eventData.gamma;
      
      alpha = eventData.alpha;
      beta = eventData.beta;
      gamma = eventData.gamma;

      // if (alpha > 180) {
      //   alpha -= 360;
      // }
      

      console.log("("+alpha+","+beta+","+gamma+")");

      socket.emit("orientation", {room: room, angles: {alpha: alpha, beta: beta, gamma: gamma}
      });
                                                                          
    }, false);
    
    let a_button = document.getElementById("a_button");

    a_button.addEventListener("touchstart", function() {
      socket.emit("a_down", {room: room});
    });

    a_button.addEventListener("touchend", function() {
      socket.emit("a_up", {room: room});
    });

    $(window).on("orientationchange", function(event) {

      
    });
    

  } else {
    console.log("Unsupported!");
    // TODO clearly this redirect doesn't work
    window.location.replace("unsupported.html");
  }
  



});
