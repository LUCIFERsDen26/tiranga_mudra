from flask import Blueprint, render_template
from ..Controller.UserInfo_contro import get_user_info_count
bp = Blueprint("reference_page", __name__)

@bp.route("/reference/<ref_id>")
def reference_page(ref_id):
    return render_template("/refer_page/index.html",show_done=False,show_form=True,count_value=get_user_info_count(),ref_id=ref_id)
