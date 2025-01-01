import logging
import os
from flask import current_app
from datetime import datetime
from werkzeug.utils import secure_filename

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def upload(username, cv_file):
    filename = secure_filename(cv_file.filename)
    location = current_app.config['UPLOAD_FOLDER']
    cv_file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
    print('Uploaded CV file:', filename, 'for user:', username, 'to:', current_app.config['UPLOAD_FOLDER'])
    
    return "File Saved", 200, location

