from flask import Blueprint
from ..Controller.UserInfo_contro import add_userInfo
bp = Blueprint("db", __name__)


@bp.route("/submit", methods=['POST'])
def about():
    return add_userInfo()