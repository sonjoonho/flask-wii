from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import InputRequired

class room_form(FlaskForm):
    room = StringField("Room", validators=[InputRequired()])



