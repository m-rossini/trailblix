from flask import Flask

def create_app():
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object('config')
    
    # Register blueprints
    from .routes.career import career_bp
    app.register_blueprint(career_bp)

    return app