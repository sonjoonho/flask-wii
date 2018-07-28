from flask_socketio import emit
from .utils import calculate_pos
from .. import socketio

@socketio.on("join")
def on_join(data):
    room = data["room"]
    join_room(room)
    print("connected to room ")
    print(str(data))
    send("user has entered the room", room=room)

@socketio.on("leave")
def on_leave(data):
    room = data["room"]
    leave_room(room)
    print("left room ")
    print(str(data))
    send("user has left the room", room=room)


@socketio.on("orientation")
def angles(angles):
    print(angles)
    position = calculate_pos(angles["alpha"], angles["beta"])
    emit("position", position, broadcast=True)
    emit("angles", angles, broadcast=True)

@socketio.on("a_down")
def a_down(data):
    print("A button down")
    emit("a_down", "")

@socketio.on("a_up")
def a_up(data):
    print("A button up")
    emit("a_up", "")

