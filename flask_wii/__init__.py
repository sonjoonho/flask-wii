from flask import Flask

from flask_socketio import SocketIO


socketio = SocketIO()


def create_app(debug=False):
    app = Flask(__name__)
    app.debug = debug

    app.config.from_object("config")

    from flask_wii.server import server as server_blueprint
    from flask_wii.client import client as client_blueprint

    app.register_blueprint(server_blueprint)
    app.register_blueprint(client_blueprint)

    socketio.init_app(app)
    return app
