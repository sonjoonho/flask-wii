$(document).ready(function() {
  var socket = io.connect("http://" + document.domain + ":" + location.port + "/wii");

  var room = "123";

  socket.on("connect", function() {
    console.log("Connected to room " + room);
    socket.emit("join", {room: room});
  });

  // Cursor movement

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
    cursor.style.left = (cursorPosition.x) + "px";
    cursor.style.top = (cursorPosition.y) + "px";
    // Safari
    cursor.style.WebkitTransform = "rotate(" + gamma + "deg)"; 
    // IE9
    cursor.style.msTransform = "rotate(" + gamma + "deg)";
    // Standard
    cursor.style.transform = "rotate(" + gamma + "deg)";
    console.log("x: "+position.x * screenWidth + " y: "+ position.y);
  });

  // Button presses

  socket.on("a_down", function() {
    cursor.src = "static/server/cursor_grabbing.png";
  });

  socket.on("a_up", function() {
    cursor.src = "static/server/cursor.png";
  });




});
