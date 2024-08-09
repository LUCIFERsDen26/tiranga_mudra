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



def generate_short_uuid(length=5):
    import shortuuid
    """Generates a random short UUID of specified length.

    Args:
        length: The desired length of the UUID. Defaults to 22.

    Returns:
        A string representing the generated short UUID.
    """

    return shortuuid.ShortUUID().random(length=length)


def add_userInfo():
    if request.method == "POST":
        mobile_no = request.form.get('mobile')
        state = request.form.get('state')
        pincode = request.form.get('pincode')
        usrname = request.form.get('name')        
        reffred_by = request.form.get("reffred_by")
        
        # Check for existing user with the same mobile number (contact)
        existing_user = UserInfo.query.filter_by(mobile_no=mobile_no).first()
        if existing_user:
            flash('Error: User with mobile number %s already exists.' % mobile_no)
            return render_template("/index/index.html",show_done=False,show_form=True,count_value=get_user_info_count())

        # Generate a unique reff_id
        reff_id = generate_short_uuid()

        # Check if reffred_by exists in the reff_id column (if provided)
        if reffred_by:
            referrer_exists = UserInfo.query.filter_by(reff_id=reffred_by).first()
            if not referrer_exists:
                flash('Error: Referred Code, not found.')
                return render_template("/index/index.html",show_done=False,show_form=True,count_value=get_user_info_count())

        try:
            new_user = UserInfo(
                reff_id=reff_id,
                mobile_no=mobile_no,
                name=usrname,
                sate=state,
                pin_code=pincode,
                reff_by=reffred_by if reffred_by else None
            )
            db.session.add(new_user)
            db.session.commit()

            return render_template("/index/index.html",show_done=True,reffrel_link=f"http://82.112.235.229/reference/{reff_id}",reffrel_code=reff_id,show_form=False,count_value=get_user_info_count())
        except Exception as e:
            db.session.rollback()
            flash('Error: ' + str(e))

    return render_template("/index/index.html",show_done=False,show_form=True,count_value=get_user_info_count())
