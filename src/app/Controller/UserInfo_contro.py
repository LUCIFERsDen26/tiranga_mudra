from ..Models.UserInfo_Model import UserInfo
from  ..extensions import db
from flask import url_for, flash, request, render_template


def get_user_info_count():
    """Retrieves the count of the last ID in the UserInfo table."""
    user_info = UserInfo.query.order_by(UserInfo.id.desc()).first()
    if user_info:
        return user_info.id
    else:
        return 0  # Or any default value you prefer



def add_userInfo():
    if request.method == "POST":
        mobile_no = request.form.get('mobile')
        state = request.form.get('state')
        pincode = request.form.get('pincode')
        usrname = request.form.get('name')        

        
        # Check for existing user with the same mobile number (contact)
        existing_user = UserInfo.query.filter_by(mobile_no=mobile_no).first()
        if existing_user:
            flash('Error: User with mobile number %s already exists.' % mobile_no)
            return render_template("/index/index.html",show_done=False,show_form=True,count_value=get_user_info_count())

        try:
            new_user = UserInfo(
                mobile_no=mobile_no,  # Assuming 'contact' corresponds to mobile number
                name=usrname,  # Assuming 'portname' represents user's name
                sate=state,  # Assuming 'state' refers to user's state
                pin_code=pincode,  # Assuming 'portcity' is the pin code (if applicable)
               
            )
            db.session.add(new_user)
            db.session.commit()

            return render_template("/index/index.html",show_done=True,show_form=False,count_value=get_user_info_count())  # Redirect to your desired page after successful addition

        except Exception as e:
            db.session.rollback()
            flash('Error: ' + str(e))

    return render_template("/index/index.html",show_done=False,show_form=True,count_value=get_user_info_count())
