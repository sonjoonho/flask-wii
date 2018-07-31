from flask_wii import create_app, socketio
import os

# app = create_app(debug=True)
app = create_app()

if __name__ == "__main__":
    import eventlet
    eventlet.monkey_patch()

    port = int(os.environ.get("PORT", "5000"))
    socketio.run(app, host="0.0.0.0", port=port)
