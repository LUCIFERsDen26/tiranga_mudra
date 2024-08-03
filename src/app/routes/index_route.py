from flask import Blueprint, render_template
from ..Controller.UserInfo_contro import get_user_info_count
bp = Blueprint("index_page", __name__)

@bp.route("/")
def home():
    return render_template("/index/index.html",show_done=False,show_form=True,count_value=get_user_info_count())
