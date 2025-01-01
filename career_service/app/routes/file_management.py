import os  
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename  
from ..service.service_file import upload as s_upload

auth_bp = Blueprint('upload', __name__)

@auth_bp.route('/api/upload', methods=['POST'])
def upload():
    cv_file = request.files.get('cvFile')
    username = request.form.get('username')

    if cv_file:
        msg, code, to_return = s_upload(username, cv_file)
        response = {
            'message': msg,
            'data': to_return
        }
        return jsonify(response) , code

    return jsonify({'message': 'No file provided'}), 400

