from flask import render_template, Blueprint
from .. import socketio

server = Blueprint("server", __name__)

@server.route("/")
def index():
    return render_template("server/index.html")

@socketio.on("message")
def handle_message(message):
    print("recieved message: "+message)

