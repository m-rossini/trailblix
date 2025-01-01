import argparse
import logging
from flask import Flask
from flask_cors import CORS
import os
from pymongo import MongoClient, ASCENDING

def parse_args():
    parser = argparse.ArgumentParser(description='Run the Flask application.')
    parser.add_argument('-H', '--host', default=os.getenv('HOST', 'localhost'), help='Host to run the application on (default: localhost)')
    parser.add_argument('-P', '--port', type=int, default=int(os.getenv('PORT', 5001)), help='Port to run the application on (default: 5001)')
    parser.add_argument('-L', '--loglevel', default=os.getenv('LOGLEVEL', 'info'), help='Logging level (default: info)')
    return parser.parse_args()

def setup_logging(loglevel):
    logging.basicConfig(level=getattr(logging, loglevel.upper()))
    logger = logging.getLogger(__name__)
    return logger

def setup_mongodb(logger):
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

    logger = setup_logging(os.getenv('LOGLEVEL', 'info'))
    db = setup_mongodb(logger)
    app.config['db'] = db

    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    from app.routes.general import general
    app.register_blueprint(general)
    
    return app

if __name__ == "__main__":
    args = parse_args()
    logger = setup_logging(args.loglevel)
    app = create_app()
    app.run(host=args.host, port=args.port)