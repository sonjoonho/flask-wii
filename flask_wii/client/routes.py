from flask import render_template
from . import client

@client.route("/controller")
def controller():
    return render_template("client/controller.html")
