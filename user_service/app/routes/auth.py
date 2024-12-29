from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from ..service.service_auth import login as s_login   

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    msg, code = s_login(username, password)

    return jsonify(msg), code

@auth_bp.route('/api/signup', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    db = current_app.config['db']
    if db.users.find_one({'username': username}):
        return jsonify({'message': 'User already exists'}), 400
    
    password_hash = generate_password_hash(password)
    db.users.insert_one({'username': username, 'password_hash': password_hash})
    
    return jsonify({'message': 'User registered successfully'}), 201