from flask import Blueprint
from ..Controller.UserInfo_contro import add_user_to_db,get_user_info_count
bp = Blueprint("db", __name__)
from flask import url_for, flash, request, render_template

@bp.route("/submit", methods=['POST'])
def add_userInfo():
    
    if request.method == "POST":
        userInfo = request.get_json()
        print(userInfo)
        success, message_or_reff_id = add_user_to_db(userInfo)
        
        if success:
            reff_id = message_or_reff_id  # Assuming reff_id is returned on success
            
            return {"err":"success","message":reff_id}
            #return render_template("/index/index.html", show_done=True, reffrel_link=reffrel_link, reffrel_code=reff_id, show_form=False, count_value=get_user_info_count())
        else:
            return{"err":"error","message":message_or_reff_id}  # Assuming error message is returned on failure
            #return render_template("/index/index.html", show_done=False, show_form=True, count_value=get_user_info_count())

    return{"err":"error","message":"not a post request"}
