import os
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from Auth import creds
from endpoints import user_bp
from extensions import db, bcrypt 

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

db_uri = os.getenv('DATABSE_URL', 'sqlite:///site.db')
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = creds.secretJWT

db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(user_bp, url_prefix='/user')
#app.register_blueprint(admin_bp, url_prefix='/admin')

def run():
    # define and create db tables
    with app.app_context():
        db.create_all()
    app.run(debug=True)

run()