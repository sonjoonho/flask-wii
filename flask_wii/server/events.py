from flask import request
from flask_socketio import emit, join_room, leave_room
from .utils import calculate_pos
from .. import socketio

@socketio.on("join", namespace="/wii")
def on_join(data):
    room = data["room"]
    sid = request.sid
    join_room(room)
    print("Server Connected to " + room + " from " + sid)

@socketio.on("client_join", namespace="/wii")
def on_client_join(data):
    room = data["room"]
    sid = request.sid
    join_room(room)
    print("Client Connected to " + room + " from " + sid)
    emit("client_join", {"sid": sid}, room=room)

@socketio.on("disconnect", namespace="/wii")
def disconnect(data):
    # print(data)
    room = data["room"]
    sid = request.sid
    leave_room(room)
    print("User {} has left the room {}".format(sid, room))
    emit("leave", {"sid": sid}, room=room)

@socketio.on("orientation", namespace="/wii")
def orientation(data):
    # print(data)
    room = data["room"]
    sid = request.sid
    angles = data["angles"]
    position = calculate_pos(angles["alpha"], angles["beta"])
    emit("position", {"sid": sid, "position": position, "angles": angles}, room=room)

@socketio.on("a_down", namespace="/wii")
def a_down(data):
    room = data["room"]
    sid = request.sid
    print("A button down")
    emit("a_down", {"sid": sid}, room=room)

@socketio.on("a_up", namespace="/wii")
def a_up(data):
    room = data["room"]
    sid = request.sid
    print("A button up")
    emit("a_up", {"sid": sid}, room=room)

