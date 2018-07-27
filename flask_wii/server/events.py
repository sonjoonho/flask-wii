from flask_socketio import emit
from .. import socketio

@socketio.on("joined")
def on_join(data):
    print("connected to room ")
    print(str(data))

@socketio.on("orientation")
def angles(angles):
    print(angles["alpha"])
    # TODO implement rooms, remove broadcast
    emit("angles", angles, broadcast=True)

@socketio.on("A_Press")
def a_press(data):
    print("Pressed A button")

