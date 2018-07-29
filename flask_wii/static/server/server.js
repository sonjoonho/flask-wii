$(document).ready(function() {
  let socket = io.connect("http://" + document.domain + ":" + location.port + "/wii");

  // Turn this into a random number
  const room = "123";

  socket.on("connect", function() {
    console.log("Connected to room " + room);
    socket.emit("join", {room: room});
    // Spawn a new cursor?
    CursorObject("");
  });

  // Spawns a cursor
  let CursorObject = function(sid) {
    this.cursor = document.createElement("img");
    this.cursor.setAttribute("id", "cursor"+sid);
    this.cursor.setAttribute("src", "/static/server/cursor.png");
    this.cursor.setAttribute("width", "50");
    document.body.appendChild(this.cursor);
  };

  // Cursor movement

  screenWidth = window.screen.width * window.devicePixelRatio;
  screenHeight = window.screen.height * window.devicePixelRatio;

  let alpha;
  let beta;
  let gamma;

  socket.on("angles", function(angles) {
    console.log(angles);
    alpha = angles.alpha;
    beta = angles.beta;
    gamma = angles.gamma;
    $("#alpha").text(Number(alpha).toFixed(1));
    $("#beta").text(Number(beta).toFixed(1));
    $("#gamma").text(Number(gamma).toFixed(1));
  });


  socket.on("position", function(position) {
    let cursor = document.getElementById("cursor");
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
