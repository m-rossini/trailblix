import os  
import logging
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename  
from service.service_file import upload as s_upload

# Configure logger
logger = logging.getLogger(__name__)

fm_bp = Blueprint('upload', __name__)

@fm_bp.route('/api/upload-cv', methods=['POST'])
def upload():
    cv_file = request.files.get('cvFile')
    username = request.form.get('username')
    stage = request.form.get('stage')
    logger.info('Uploading CV.user: %s, stage: %s ', username, stage)

    if cv_file:
        msg, code, to_return = s_upload(username, stage, cv_file)
        response = {
            'message': msg,
            'data': to_return
        }
        return jsonify(response) , code

    return jsonify({'message': 'No file provided'}), 400

