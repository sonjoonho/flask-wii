$(document).ready(function() {
  var socket = io.connect("http://" + document.domain + ":" + location.port);

  socket.on("connect", function() {
    socket.emit("joined", {data: "Connected"});
  });

  socket.on("angles", function(angles) {
    console.log("recieved");
    console.log(angles);
    console.log(angles.alpha);
    $("#alpha").text(angles.alpha);
  });


});
