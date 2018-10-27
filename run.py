from flask.helpers import get_debug_flag
from flask_wii import create_app, socketio
from flask_wii.settings import DevelopmentConfig, ProductionConfig
import os

if __name__ == "__main__":
    import eventlet
    eventlet.monkey_patch()

    CONFIG = DevelopmentConfig if get_debug_flag() else ProductionConfig
    app = create_app(CONFIG)

    port = int(os.environ.get("PORT", "5000"))
    socketio.run(app, host="0.0.0.0", port=port)
