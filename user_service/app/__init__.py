from flask import Flask
import os

def create_app():
    app = Flask(__name__)
    
    app.config.from_object('config.Config')

    app.config['MONGO_URI'] = os.getenv('MONGO_URI', 'mongodb://localhost:27017/career_path')
    app.config['FLASK_ENV'] = os.getenv('FLASK_ENV', 'development')

    from .routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    return app