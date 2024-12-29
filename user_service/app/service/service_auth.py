from flask import current_app
from werkzeug.security import check_password_hash

def login(username, password):
    db = current_app.config['db']
    user_data = db.users.find_one({'username': username})
    
    if user_data and check_password_hash(user_data['password_hash'], password):
        return 'Login successful', 200
    return 'Unauthorized', 401