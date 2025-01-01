from flask import request, jsonify, Blueprint

general = Blueprint('general', __name__)

@general.route('/', methods=['GET'])
def root_url():
    data = request.json
    
    return jsonify({'message': 'Welcome to Career Service. Up and Running'}), 200