from flask import Blueprint, render_template
from ..Controller.UserInfo_contro import get_user_info_count
bp = Blueprint("getcount_page", __name__)

@bp.route("/count")
def usescount_page():
    return {"err":"success","count_value":get_user_info_count()}
