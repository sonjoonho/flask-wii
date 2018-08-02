from flask import render_template, Blueprint, request, redirect, url_for
from . import server
import flask_wii
from random import randint


@server.route("/")
def index():
    # TODO adding iphone support?
    # Also I don't think this actually works
    if request.user_agent.platform == "android":
        return redirect(url_for("client.controller"))
    else:
        # Not actually checking if the room already exists, but just hope it doesn't
        room_number = randint(1, 10000)
        return render_template("server/server.html", room_number=room_number)


@server.route("/canvas")
def canvas():
    return render_template("server/canvas.html")


# @server.route("/boot")
# def boot():
#     room = "123"
#     return render_template("server/boot.html", room=room)
