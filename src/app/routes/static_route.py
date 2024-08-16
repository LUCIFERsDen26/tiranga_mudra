from flask import Blueprint, render_template
from ..Controller.UserInfo_contro import get_user_info_count
bp = Blueprint("static_page", __name__)

@bp.route("/")
def home():
    return render_template("/index/index.html",count_value=get_user_info_count())

@bp.route("/about")
def about():
    return render_template("/about/about.html")

@bp.route("/ourgoal")
def gols():
    return render_template("/ourgoal/ourgoal.html")
