from flask import Flask
from flask_socketio import SocketIO
from flask_wii.settings import ProductionConfig

socketio = SocketIO()

def create_app(config_object=ProductionConfig):
    app = Flask(__name__)

    app.config.from_object(config_object)

    from flask_wii.server import server as server_blueprint
    from flask_wii.client import client as client_blueprint

    app.register_blueprint(server_blueprint)
    app.register_blueprint(client_blueprint)

    socketio.init_app(app)
    return app
