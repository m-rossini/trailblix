import argparse
import logging
from flask import Flask
from flask_cors import CORS
import os
from pymongo import MongoClient, ASCENDING

def setup_mongodb(logger, mongo_uri):
    client = MongoClient(mongo_uri)
    db = client["user_management"]
    
    users_collection = db["users"]
    users_collection.create_index([("username", ASCENDING)], unique=True)
    logger.info("Created unique index on username field for users")

    news_collection = db["newsletter"]
    news_collection.create_index([("email", ASCENDING)], unique=True)
    logger.info("Created unique index on email field for newsletter")

    return db

def setup_logging(loglevel):
    logging.basicConfig(level=getattr(logging, loglevel.upper()))
    logger = logging.getLogger(__name__)
    return logger

def create_app():
    app = Flask(__name__)
    
    app.config.from_object("config.flask_config.Config")
    app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://mongo-dev-pod-host:27017/")
    CORS(app, resources={r"/*": {"origins": "*"}})

    db = setup_mongodb(logger, app.config["MONGO_URI"])
    app.config["db"] = db
    
    from routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    from routes.general import general
    app.register_blueprint(general)

    return app

def parse_args():
    parser = argparse.ArgumentParser(description="Run the Flask application.")
    parser.add_argument("-H", "--host", default=os.getenv("HOST", "localhost"), help="Host")
    parser.add_argument("-P", "--port", type=int, default=int(os.getenv("PORT", 5000)), help="Port")
    parser.add_argument("-L", "--loglevel", default=os.getenv("LOGLEVEL", "info"), help="Logging level")
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_args()
    logger = setup_logging(args.loglevel)
    app = create_app()
    app.run(host=args.host, port=args.port)