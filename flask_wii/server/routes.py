from flask import render_template, Blueprint, request, redirect, url_for
from . import server
import flask_wii
print(flask_wii.__file__)

@server.route("/")
def index():
    # TODO adding iphone support?
    if request.user_agent.platform == "android":
        return redirect(url_for("client.controller"))
    else:
        return render_template("server/server.html")

@server.route("/canvas")
def canvas():
    return render_template("server/canvas.html")

# @server.route("/boot")
# def boot():
#     room = "123"
#     return render_template("server/boot.html", room=room)
