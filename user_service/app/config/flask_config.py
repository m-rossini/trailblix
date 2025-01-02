import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')