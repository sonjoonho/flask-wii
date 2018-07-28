from flask import render_template, redirect, url_for
from flask_socketio import emit
from . import client
from .forms import room_form

@client.route("/controller", methods=["GET", "POST"])
def controller():
    form = room_form()
    if form.validate_on_submit():
        room = form.room.data
        print("Request to join room +" + room)
        return render_template("client/controller.html", room=room)
    return render_template("client/connect.html", form=form)
