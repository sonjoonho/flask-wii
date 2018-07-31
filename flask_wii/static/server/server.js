$(document).ready(function() {
  let socket = io.connect("https://" + document.domain + ":" + location.port + "/wii"); 

  const room = document.getElementById("room-number").innerHTML;

  socket.on("connect", function() {
    console.log("Connected to room " + room);
    socket.emit("join", {room: room});
  });

  socket.on("disconnect", function() {
    console.log("Disconnected from room " + room);
    socket.emit("join", {room: room});
  });

  socket.on("client_join", function(data) {
    console.log("New client with sid: " + data.sid)
    // Spawn a new cursor
    CursorObject(data.sid);
  });

  // Spawns a cursor
  let CursorObject = function(sid) {
    this.cursor = document.createElement("img");
    this.cursor.setAttribute("id", "cursor"+sid);
    this.cursor.setAttribute("src", "/static/server/cursor.png");
    this.cursor.setAttribute("width", "50");
    this.cursor.style.position = "absolute";
    document.body.appendChild(this.cursor);
  };

  // Cursor movement

  screenWidth = window.screen.width * window.devicePixelRatio;
  screenHeight = window.screen.height * window.devicePixelRatio;


  socket.on("position", function(data) {
    position = data.position;
    sid = data.sid
    angles = data.angles

    //console.log(angles);
    let alpha = angles.alpha;
    let beta = angles.beta;
    let gamma = angles.gamma;
    $("#alpha").text(Number(alpha).toFixed(1));
    $("#beta").text(Number(beta).toFixed(1));
    $("#gamma").text(Number(gamma).toFixed(1));

    let cursor = document.getElementById("cursor" + sid);

    cursorPosition = {
      x: position.x * screenWidth,
      y: position.y * screenHeight
    };

    // cursor.style.left = (cursor.offsetLeft - cursorPosition.x) + "px"
    cursor.style.left = (cursorPosition.x) + "px";
    cursor.style.top = (cursorPosition.y) + "px";
    // Safari
    cursor.style.WebkitTransform = "rotate(" + gamma + "deg)"; 
    // IE9
    cursor.style.msTransform = "rotate(" + gamma + "deg)";
    // Standard
    cursor.style.transform = "rotate(" + gamma + "deg)";
    // console.log("x: "+position.x * screenWidth + " y: "+ position.y);
  });

  // Button presses

  socket.on("a_down", function() {
    cursor.src = "static/server/cursor_grabbing.png";
  });

  socket.on("a_up", function() {
    cursor.src = "static/server/cursor.png";
  });

  var boot = document.getElementById("boot");
  
  var close = document.getElementById("close");
  
  close.onclick = function() {
      boot.style.display = "none";
  }



});
