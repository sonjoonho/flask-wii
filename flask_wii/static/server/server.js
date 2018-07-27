$(document).ready(function() {
  var socket = io.connect("http://" + document.domain + ":" + location.port);

  socket.on("connect", function() {
    socket.emit("joined", {data: "Connected"});
  });

  screenWidth = window.screen.width * window.devicePixelRatio;
  screenHeight = window.screen.height * window.devicePixelRatio;

  var alpha;
  var beta;
  var gamma;

  socket.on("angles", function(angles) {
    console.log(angles);
    alpha = angles.alpha;
    beta = angles.beta;
    gamma = angles.gamma;
    $("#alpha").text(Number(alpha).toFixed(1));
    $("#beta").text(Number(beta).toFixed(1));
    $("#gamma").text(Number(gamma).toFixed(1));
  });

  var cursor = document.getElementById("cursor");

  socket.on("position", function(position) {
    cursorPosition = {
      x: position.x * screenWidth,
      y: position.y * screenHeight
    }

    // cursor.style.left = (cursor.offsetLeft - cursorPosition.x) + "px"
    cursor.style.left = (cursorPosition.x) + "px"
    cursor.style.top = (cursorPosition.y) + "px"
    console.log("x: "+position.x * screenWidth+ "y: "+ position.y);
  });

  /* Moves the cursor
   */


  function moveCursor(cursor) {
    var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    
  }



  function calculatePos(cursor) {
    // Get angle
    // Calculate X and Y
    // Return
    // x = alphajjj
    var pos = {
      x: x,
      y: y
    };

    return pos;

  }


});
