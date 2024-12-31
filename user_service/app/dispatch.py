from flask import Flask
from flask_cors import CORS
import os
import logging
from pymongo import MongoClient, ASCENDING

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def setup_mongodb():
    client = MongoClient("mongodb://mongo-dev-pod-host:27017/")
    db = client["user_management"]
    
    users_collection = db["users"]
    users_collection.create_index([("username", ASCENDING)], unique=True)
    logger.info("Created unique index on username field for users")

    news_collection = db["newsletter"]
    news_collection.create_index([("email", ASCENDING)], unique=True)
    logger.info("Created unique index on email field for newsletter")

    return db

def create_app():
    app = Flask(__name__)
    
    app.config.from_object('config.Config')

    app.config['MONGO_URI'] = os.getenv('MONGO_URI', 'mongodb://localhost:27017/user_management')
    app.config['FLASK_ENV'] = os.getenv('FLASK_ENV', 'development')

    # Enable CORS for all origins
    CORS(app, resources={r"/*": {"origins": "*"}})

    db = setup_mongodb()
    app.config['db'] = db

    from .routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    from .routes.general import general
    app.register_blueprint(general)
    
    return app

app = create_app()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)