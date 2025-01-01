import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', '/app/uploads')
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')