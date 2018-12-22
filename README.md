# Flask Wii

## Overview

A Flask web application that emulates the features of a Wii controller with just a mobile device. Inspired by: [web-riimote](https://github.com/konaraddio/web-riimote)

Read the blog post at <https://sonjoonho.github.io/flask-wii>

## Usage

You can test this app at <https://flask-wii.herokuapp.com>. Note that this must be done over HTTPS or connection will fail.

Alternatively, you can run it locally.

This project uses Pipenv for dependency management.

To run:

```
pipenv install -e .
pipenv run python3 run.py
```

## Built With

- [Flask](https://github.com/pallets/flask) - Python micro web framework
- [SocketIO](https://socket.io/) - provides realtime, bi-directional communication
- [Flask-SocketIO](https://github.com/miguelgrinberg/Flask-SocketIO) - Flask integration with SocketIO

## Tools
- [Vim](https://www.vim.org/)
- [Pipenv](https://github.com/pypa/pipenv) - dependency management
- [Black](https://github.com/ambv/black) - Python code formatter, to keep style consistent
- [Coffee](https://en.wikipedia.org/wiki/Coffee) - fuel for the brain

## Acknowledgements

- [Pointing cursor](http://nintendo.wikia.com/wiki/File:Cursor_-_Pointing.svg) and [grabbing cursor](http://nintendo.wikia.com/wiki/File:Cursor_-_Grabbing.svg) are from the Nintendo Wiki.
- [Wii wheel](http://mariokartwii.wikia.com/wiki/Wii_Remote) is from the Mario Kart Wiki.

## Future Work 

- This application has only been tested on Chrome and Firefox with Android. In particular, apparently [iPhones use game-based calibration](https://www.w3.org/2008/geolocation/wiki/images/e/e0/Device_Orientation_%27alpha%27_Calibration-_Implementation_Status_and_Challenges.pdf) for DeviceOrientationEvent.alpha, which means additional conversion would have to be implemented in the app.
- The initial phone orientation can be a problem, but I believe this is very device dependent which makes it difficult to debug.
- Latency is not bad, but could be improved.
- Canvas demo
- Actual SSL certificate lol




