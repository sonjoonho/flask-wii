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
    this.cursor.setAttribute("src", "/static/server/cursor.jpg");
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
    $("#alpha").text(Number(alpha).toFixed(1) + String.fromCharCode(176));
    $("#beta").text(Number(beta).toFixed(1) + String.fromCharCode(176));
    $("#gamma").text(Number(gamma).toFixed(1) + String.fromCharCode(176));

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

  socket.on("a_down", function(data) {
    sid = data.sid
    let cursor = document.getElementById("cursor" + sid);
    cursor.src = "static/server/cursor_grabbing.jpg";

    if (overlap(close, cursor)) {
      console.log("CLICK");   
    }
  });

  socket.on("a_up", function(data) {
    sid = data.sid
    let cursor = document.getElementById("cursor" + sid);
    cursor.src = "static/server/cursor.jpg";
  });

  let  boot = document.getElementById("boot");

  let  close = document.getElementById("close");
  
  //close.addEventListener("wii-click", function() {console.log("CLICK"); });

  //let event = new Event("wii-click");

  
  // close.onclick = function() {
  //     boot.style.display = "none";
  // }

  function overlap(rect1, rect2) { 
    
    return (rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom)
  }



});
