from flask import Flask

from flask_socketio import SocketIO

from flask_wii.server.views import server
from flask_wii.client.views import client

socketio = SocketIO(app)


def create_app(debug=False):
    app = Flask(__name__)
    app.debug = debug

    app.config.from_object("config")

    app.register_blueprint(server)
    app.register_blueprint(client)

    socketio.init_app(app)
    return app

