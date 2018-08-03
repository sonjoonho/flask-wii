$(document).ready(function() {
  /** 
   * Initialise socket.io
   */

  let socket = io.connect("https://" + document.domain + ":" + location.port + "/wii"); 

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
    this.cursor.setAttribute("class", "cursor");
    this.cursor.setAttribute("id", "cursor"+sid);
    this.cursor.setAttribute("src", "/static/icons/cursor.png");
    this.cursor.setAttribute("width", "50");
    this.cursor.style.position = "absolute";
    document.body.appendChild(this.cursor);
  };

  let screenWidth = window.screen.width * window.devicePixelRatio;
  let screenHeight = window.screen.height * window.devicePixelRatio;

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

    if (alpha > 40 && alpha < 140) {
      let wheel = document.getElementById("wii_wheel"); 
      wheel.style.transform = "rotate(" + beta + "deg)";
    } else {

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
    }
  });

  /**
   * Handling button presses
   */

  // Triggers a mouse event of eventType. This can be "click", "mousedown" or "mouseup".
  function triggerMouseEvent(x, y, eventType) {
    let clickEvent = document.createEvent('MouseEvents');
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
    cursor.src = "static/icons/cursor_grabbing.png";
    
    // Gets the bounding box of the cursor
    // Note that JavaScript and CSS handles .right and .bottom differently
    let cursorPos = cursor.getBoundingClientRect();
    console.log("Mouse down at " + cursorPos.x, cursorPos.y);
    // Simulates the click event
    
    triggerMouseEvent(cursorPos.x, cursorPos.y, "mousedown");
  });

  // Triggers on A button up
  socket.on("a_up", function(data) {
    sid = data.sid
    let cursor = document.getElementById("cursor" + sid);
    cursor.src = "static/icons/cursor.png";
    
    let cursorPos = cursor.getBoundingClientRect();
    console.log("Mouse up at " + cursorPos.x, cursorPos.y);
    
    triggerMouseEvent(cursorPos.x, cursorPos.y, "mouseup");
  });

  /**
   * Controls the modal popup
   */

  let boot = document.getElementById("boot");

  let close_button = document.getElementById("close");
  
  close_button.onmousedown = function() {
    boot.style.display = "none";
  };

});
