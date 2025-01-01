import logging
from flask import current_app
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def login(username, password):
    logger.info("Logging in user")
    db = current_app.config["db"]
    user_data = db.users.find_one({"username": username})
    
    if user_data and check_password_hash(user_data["password_hash"], password):
        logger.info(f"User {username} logged in successfully.")
        user_data['_id'] = str(user_data['_id'])
        return "Login successful", 200, user_data
    
    logger.warning(f"Failed login attempt for username: {username}")
    return "Unauthorized", 401, None

def register(username, password, display_name, birth_date):
    logger.info(f"Registering user: {username}")
    db = current_app.config["db"]
    user_data = db.users.find_one({"email": username})
    
    if user_data:
        logger.warning(f"Registration failed: User {username} already exists. User data: {user_data}")
        return "User already exists", 400, None

    password_hash = generate_password_hash(password)

    to_return_data = {
        "username": username,
        "display_name": display_name,
        "birth_date": birth_date,
    }

    result = db.users.insert_one({
        "username": username,
        "password_hash": password_hash,
        "display_name": display_name,
        "birth_date": birth_date,
        "insert_date": datetime.now(datetime.timezone.utc)
    })
    logger.info(f"User {username} registered successfully.")
    to_return_data['_id'] = str(result.inserted_id)
    return "User registered successfully", 201, to_return_data
