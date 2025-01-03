import logging
import os
from flask import current_app
from datetime import datetime
from werkzeug.utils import secure_filename

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def __ensure_dir_exists(path):
    logger.info(f">>>Ensuring directory exists: {path}")
    if not os.path.isabs(path):
        path = os.path.abspath(path)
        logger.info(f">>>Converted to absolute path: {path}")
    if not os.path.exists(path):
        try:
            os.makedirs(path)
            logger.info(f"Directory created: {path}")
        except Exception as e:
            logger.error(f"Failed to create directory {path}: {e}")
            raise

def upload(username, stage, cv_file):
    if cv_file and username:
        sec_filename = secure_filename(cv_file.filename)
        sec_username = secure_filename(username)
        sec_stage = secure_filename(stage)

        upload_folder = os.path.join(current_app.config['UPLOAD_FOLDER'], sec_username, sec_stage)
        logger.info(f">>>Upload folder: {upload_folder}")
        __ensure_dir_exists(upload_folder)
        save_path = os.path.join(upload_folder, sec_filename)
        cv_file.save(save_path)
        logger.info(f'User: {username} uploaded CV: {sec_filename}')  # Debug statement
        return 'File uploaded successfully', 200, None

    return "Missing user name of file", 400, None

