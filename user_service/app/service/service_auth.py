import logging
from flask import current_app
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime, timezone

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def login(username, password):
    logger.info("Logging in user")
    db = current_app.config["db"]
    user_data = db.users.find_one({"username": username})
    
    if user_data and check_password_hash(user_data["password_hash"], password):
        logger.info(f"User {username} logged in successfully.")
        user_data['_id'] = str(user_data['_id'])
        del user_data["password_hash"]
        return "Login successful", 200, user_data
    
    logger.warning(f"Failed login attempt for username: {username}")
    return "Unauthorized", 401, None

def register(username, password, display_name, birth_date,consent_data=False,marketing_consent_data=False):
    logger.info(f"Registering user: {username}")
    db = current_app.config["db"]
    user_data = db.users.find_one({"email": username})
    
    if user_data:
        logger.warning(f"Registration failed: User {username} already exists. User data: {user_data}")
        return "User already exists", 400, None

    password_hash = generate_password_hash(password)

    user_data = {
        "username": username,
        "password_hash": password_hash,
        "display_name": display_name,
        "birth_date": birth_date,
        "consent_data": consent_data,
        "marketing_consent_data": marketing_consent_data,
        "insert_date": datetime.now(timezone.utc)
    }

    result = db.users.insert_one(user_data)
    user_data['_id'] = str(result.inserted_id)
    del user_data["password_hash"]
    del user_data["insert_date"]

    logger.info(f"User {username} registered successfully.")
    return "User registered successfully", 201, user_data

def update_profile(username, password, display_name, birth_date,consent_data=False,marketing_consent_data=False):
    db = current_app.config["db"]
    
    user_data = db.users.find_one({"username": username})
    if not user_data:
        logger.warning(f"Update failed: User {username} not found")
        return "User not found", 404, None
    
    update_fields = {}
    if display_name is not None:
        update_fields["display_name"] = display_name
    if birth_date is not None:
        update_fields["birth_date"] = birth_date
    if password is not None:
        update_fields["password_hash"] = generate_password_hash(password)    
    if consent_data is not None:
        update_fields["consent_data"] = consent_data
    if marketing_consent_data is not None:
        update_fields["marketing_consent_data"] = marketing_consent_data

    if not update_fields:
        return "No changes requested", 304, None
    
    update_fields["updated_at"] = datetime.now(timezone.utc)
    try:
        result = db.users.update_one(
            {"username": username},
            {"$set": update_fields}
        )
        
        return ("No changes made", 304, None) if result.modified_count == 0 else ("Profile updated successfully", 200, update_fields)
        
    except Exception as e:
        logger.error(f"Error updating profile for user {username}: {str(e)}")
        return "Internal server error", 500, None