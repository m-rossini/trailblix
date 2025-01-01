from flask import request, jsonify, Blueprint

general = Blueprint('general', __name__)

@general.route('/', methods=['GET'])
def root_url():
    data = request.json
    
    return jsonify({'message': 'Welcome User Services. Up and Running'}), 200