import argparse
import logging
from flask import Flask
from flask_cors import CORS
import os

def setup_logging(loglevel):
    logging.basicConfig(level=getattr(logging, loglevel.upper()))
    logger = logging.getLogger(__name__)
    return logger

def create_app():
    app = Flask(__name__)
    
    app.config.from_object('config.flask_config.Config')

    app.config['FLASK_ENV'] = os.getenv('FLASK_ENV', 'development')

    CORS(app, resources={r"/*": {"origins": "*"}})

    from routes.file_management import fm_bp
    app.register_blueprint(fm_bp)

    from routes.general import general
    app.register_blueprint(general)
    
    return app

def parse_args():
    parser = argparse.ArgumentParser(description='Run the Flask application.')
    parser.add_argument('-H', '--host', default=os.getenv('HOST', 'localhost'), help='Host to run the application on (default: localhost)')
    parser.add_argument('-P', '--port', type=int, default=int(os.getenv('PORT', 5001)), help='Port to run the application on (default: 5001)')
    parser.add_argument('-L', '--loglevel', default=os.getenv('LOGLEVEL', 'info'), help='Logging level (default: info)')
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_args()
    logger = setup_logging(args.loglevel)
    app = create_app()
    app.run(host=args.host, port=args.port)