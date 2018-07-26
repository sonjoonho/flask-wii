from flask_wii import create_app, socketio


app = create_app(debug=True)

if __name__ == "__main__":
    import eventlet
    eventlet.monkey_patch()

    socketio.run(app)