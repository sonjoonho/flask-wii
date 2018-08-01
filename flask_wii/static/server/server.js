$(document).ready(function() {
  /** 
   * Initialise socket.io
   */

  let socket = io.connect("http://" + document.domain + ":" + location.port + "/wii"); 

  const room = document.getElementById("room-number").innerHTML;

  socket.on("connect", function() {
    console.log("Connected to room " + room);
    socket.emit("join", {room: room});
  });

  socket.on("disconnect", function() {
    console.log("Disconnected from room " + room);
  });

  socket.on("client_join", function(data) {
    console.log("New client with sid: " + data.sid)
    // Spawn a new cursor
    CursorObject(data.sid);
  });


  /**
   * Controls the cursor movement
   */

  // Spawns a cursor
  let CursorObject = function(sid) {
    this.cursor = document.createElement("img");
    this.cursor.setAttribute("id", "cursor"+sid);
    this.cursor.setAttribute("src", "/static/server/cursor.png");
    this.cursor.setAttribute("width", "50");
    this.cursor.style.position = "absolute";
    document.body.appendChild(this.cursor);
  };

  screenWidth = window.screen.width * window.devicePixelRatio;
  screenHeight = window.screen.height * window.devicePixelRatio;

  socket.on("position", function(data) {
    position = data.position;
    sid = data.sid
    angles = data.angles

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

    cursor.style.left = (cursorPosition.x) + "px";
    cursor.style.top = (cursorPosition.y) + "px";
    // Safari
    cursor.style.WebkitTransform = "rotate(" + gamma + "deg)"; 
    // IE9
    cursor.style.msTransform = "rotate(" + gamma + "deg)";
    // Standard
    cursor.style.transform = "rotate(" + gamma + "deg)";
  });

  /**
   * Handling button presses
   */

  // Triggers a mouse event of eventType. This can be "click", "mousedown" or "mouseup".
  function triggerMouseEvent(x, y, eventType) {
    let clickEvent= document.createEvent('MouseEvents');
    clickEvent.initMouseEvent(
    eventType, true, true, window, 0,
    0, 0, x, y, false, false,
    false, false, 0, null
    );
  
    console.log(document.elementFromPoint(x, y));
    document.elementFromPoint(x, y).dispatchEvent(clickEvent);
  }

  // Triggers on A button down
  socket.on("a_down", function(data) {
    sid = data.sid
    let cursor = document.getElementById("cursor" + sid);
    cursor.src = "static/server/cursor_grabbing.png";
    
    // Gets the bounding box of the cursor
    // Note that JavaScript and CSS handles .right and .bottom differently
    let cursorPos = cursor.getBoundingClientRect();
    console.log("Mouse down at " + cursorPos.top, cursorPos.left);
    // Simulates the click event
    
    triggerMouseEvent(cursorPos.top, cursorPos.left, "mousedown");
  });

  // Triggers on A button up
  socket.on("a_up", function(data) {
    sid = data.sid
    let cursor = document.getElementById("cursor" + sid);
    cursor.src = "static/server/cursor.png";
    
    let cursorPos = cursor.getBoundingClientRect();
    console.log("Mouse up at " + cursorPos.top, cursorPos.left);
    
    triggerMouseEvent(cursorPos.top, cursorPos.left, "mouseup");
  });

  /**
   * Controls the modal popup
   */

  let  boot = document.getElementById("boot");

  let  close_button = document.getElementById("close");
  
  close_button.onmousedown = function() {
    boot.style.display = "none";
    console.log("CLICK");
  };

  function overlap(rect1, rect2) { 
    
    console.log(rect1.right, rect2.left);
    return (rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom);
  }



});
