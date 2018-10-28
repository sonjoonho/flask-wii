from flask import render_template, Blueprint, request, redirect, url_for
from . import server
import flask_wii
from random import randint


@server.route("/")
def index():
    if request.user_agent.platform == "android":
        return redirect(url_for("client.controller"))
    else:
        
        # FIXME: -- Need to keep track of rooms that exist and ensure that
        #           duplicate rooms are not generated.
       
        room_number = randint(1, 10000)
        return render_template("server/server.html", room_number=room_number)

