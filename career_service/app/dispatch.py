from flask import Flask
from flask_cors import CORS
import os
import logging
from pymongo import MongoClient, ASCENDING
import argparse

# Configure logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def create_app(log_level='INFO'):
    app = Flask(__name__)
    
    app.config.from_object('config.Config')

    app.config['FLASK_ENV'] = os.getenv('FLASK_ENV', 'development')

    # Enable CORS for all origins
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Configure logging level
    logging.basicConfig(level=getattr(logging, log_level.upper(), logging.INFO))
    logger.setLevel(getattr(logging, log_level.upper(), logging.INFO))
    logger.info(f"Logging level set to {log_level.upper()}")

    from .routes.file_management import file_management
    app.register_blueprint(file_management)

    from .routes.general import general
    app.register_blueprint(general)
    
    return app

def parse_args():
    parser = argparse.ArgumentParser(description='Run the Flask app.')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='Host to run the app on')
    parser.add_argument('--port', type=int, default=5001, help='Port to run the app on')
    parser.add_argument('--log-level', type=str, default='INFO', choices=['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'], help='Set the logging level')
    return parser.parse_args()

# Create a default app instance for 'flask run'
app = create_app()

if __name__ == '__main__':
    args = parse_args()
    app = create_app(args.log_level)
    debug_mode = args.log_level.upper() == 'DEBUG'
    app.run(host=args.host, port=args.port, debug=debug_mode)