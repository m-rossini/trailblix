import logging
import os
from flask import current_app
from werkzeug.utils import secure_filename
from typing import Optional
from dataclasses import dataclass
from pathlib import Path

logger = logging.getLogger(__name__)

@dataclass
class SecureFileInfo:
    filename: str
    save_path: str
    username: str
    stage: str

def __ensure_dir_exists(path):
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

def secure_file_info(
    filename: str, 
    username: str, 
    stage: Optional[str] = None
) -> SecureFileInfo:
    """
    Generates secure file information and path using default upload folder.
    """
    base_upload_folder = os.getenv('UPLOAD_FOLDER', '/app/uploads')
    
    sec_filename = secure_filename(filename)
    sec_username = secure_filename(username)
    sec_stage = secure_filename(stage) if stage else ""
    
    upload_folder = os.path.join(
        base_upload_folder,
        sec_username,
        sec_stage
    )
    save_path = os.path.join(upload_folder, sec_filename)
    
    return SecureFileInfo(
        filename=sec_filename,
        save_path=save_path,
        username=sec_username,
        stage=sec_stage
    )

def upload(save_path, cv_file):
    if cv_file:
        __ensure_dir_exists(os.path.dirname(save_path))
        cv_file.save(save_path)
        logger.debug(f'File uploaded to: {save_path}') 
        return 'File uploaded successfully', 200, None

    return "Missing file", 400, None

def get_file_extension(filename: str) -> str:
    """
    Get lowercase file extension without dot from filename.
    Returns empty string if no extension found.
    """
    return Path(filename).suffix.lower().lstrip('.')