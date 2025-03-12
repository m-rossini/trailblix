import logging
from flask import Blueprint, request, jsonify, current_app
from service.service_file import (
    upload as s_upload,
    secure_file_info,
)
from domain.text_extraction import PDFFileManager, DOCXFileManager, get_text_from_file

logger = logging.getLogger(__name__)

fm_bp = Blueprint("upload", __name__)


@fm_bp.route("/api/upload-cv", methods=["POST"])
def upload():
    cv_file = request.files.get("cvFile")
    username = request.form.get("username")
    stage = request.form.get("stage")
    logger.info("Uploading CV.user: %s, stage: %s ", username, stage)

    if cv_file:
        file_info = secure_file_info(cv_file.filename, username, stage)
        logger.info("Secure file info: %s", file_info)
        msg, code, to_return = s_upload(file_info.save_path, cv_file)

        text_from_file = get_text_from_file(file_info)
        logger.info("Text from file: %s", text_from_file)
        response = {"message": msg, "data": to_return}
        return jsonify(response), code

    return jsonify({"message": "No file provided"}), 400
