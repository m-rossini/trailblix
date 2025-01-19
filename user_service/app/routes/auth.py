from flask import Blueprint, request, jsonify, current_app
from service.service_auth import login as s_login 
from service.service_auth import register as s_register  
from service.service_auth import update_profile as s_update_profile   

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('email')
    password = data.get('password')
    
    msg, code, to_return = s_login(username, password)
    response = {
        "message": msg,
        "data": to_return
    }
    return jsonify(response), code

@auth_bp.route('/api/signup', methods=['POST'])
def register():
    data = request.json
    username = data.get('email')
    password = data.get('password')
    display_name = data.get('displayName')
    birth_date = data.get('birthDate')
    
    msg, code, to_return = s_register(username, password, display_name, birth_date)
    response = {
        "message": msg,
        "data": to_return
    }
    return jsonify(response), code

@auth_bp.route('/api/update-profile', methods=['PUT'])
def update_user_profile():
    data = request.json
    username = data.get('email')
    display_name = data.get('displayName')
    birth_date = data.get('birthDate')
    password = data.get('password')

    msg, code, to_return = s_update_profile(username, password, display_name, birth_date)
    response = {
        "message": msg,
        "data": to_return
    }
    return jsonify(response), code