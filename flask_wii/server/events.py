from flask import request
from flask_socketio import emit, join_room, leave_room
from .utils import calculate_pos
from .. import socketio

@socketio.on("join", namespace="/wii")
def on_join(data):
    room = data["room"]
    sid = request.sid
    join_room(room)
    print("Connected to " + room + " from " + sid)
    emit("join", room=room)

@socketio.on("leave", namespace="/wii")
def on_leave(data):
    # print(data)
    room = data["room"]
    sid = request.sid
    leave_room(room)
    print("User {} has left the room {}".format(sid, room))
    emit("leave", room=room)

@socketio.on("orientation", namespace="/wii")
def angles(data):
    # print(data)
    room = data["room"]
    position = calculate_pos(data["angles"]["alpha"], data["angles"]["beta"])
    emit("position", position, room=room)
    emit("angles", data["angles"], room=room)

@socketio.on("a_down", namespace="/wii")
def a_down(data):
    room = data["room"]
    print("A button down")
    emit("a_down", "", room=room)

@socketio.on("a_up", namespace="/wii")
def a_up(data):
    room = data["room"]
    print("A button up")
    emit("a_up", "", room=room)

