$(document).ready(function() {
  

  var socket = io.connect('http://' + document.domain + ':' + location.port);

  socket.on("connect", function() {
    console.log("Connected");
    socket.emit("joined", {data: "5"});
  });

  $("#a_button").click(function() {
    socket.emit("a_press", "");

  });

  if (window.DeviceOrientationEvent) {
    /* alpha: direction according to the compass                         
     * beta: front-back tilt
     * gamma: left-right tilt
     */

    var alpha, beta, gamma;
  
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

      if (alpha > 180) {
        alpha -= 360;
      }
      

      console.log("("+alpha+","+beta+","+gamma+")");

      socket.emit("orientation", {alpha: alpha, beta: beta, gamma: gamma});
                                                                          
    }, false);
    
    
    

    

  } else {
    console.log("Unsupported!");
    // TODO clearly this redirect doesn't work
    window.location.replace("unsupported.html");
  }
  



});
