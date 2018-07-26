# Flask stuff
from flask import Blueprint, render_template
# Socket stuff

client = Blueprint("client", __name__)

@client.route("/controller")
def controller():
    render_template("controller.html")
