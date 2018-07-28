from flask import render_template
from flask_socketio import emit
from . import client
from .forms import room_form

@client.route("/connect", methods=["GET", "POST"])
def connect():
    form = room_form()
    if form.validate_on_submit():
        room = form.room.data
        print("Request to join room +" + room)
        socketio.emit("room", room)
        return redirect(url_for("controller"))
    return render_template("client/connect.html", form=form)

@client.route("/controller")
def controller():
    return render_template("client/controller.html")
