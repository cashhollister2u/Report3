from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from endpoints import user_bp
from extensions import bcrypt 

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

bcrypt.init_app(app)
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(user_bp, url_prefix='/user')
#app.register_blueprint(admin_bp, url_prefix='/admin')

app.run(debug=True)
