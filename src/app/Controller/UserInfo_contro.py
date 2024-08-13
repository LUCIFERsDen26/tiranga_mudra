from ..Models.UserInfo_Model import UserInfo
from  ..extensions import db
#from flask import url_for, flash, request, render_template


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

def add_user_to_db(userInfo):
    """Adds a new user to the database, handling validations and error handling."""
    
    # Check for existing user with the same mobile number (contact)
    existing_user = UserInfo.query.filter_by(email=userInfo['email']).first()
    if existing_user:
        return False, "Error: User with this email already exists." 

    # Generate a unique reff_id
    reff_id = generate_short_uuid()

    # Check if reffred_by exists in the reff_id column (if provided)
    if userInfo.get('reffred_by'):
        referrer_exists = UserInfo.query.filter_by(reff_id=userInfo.get('reffred_by')).first()
        if not referrer_exists:
            return False, "Error: Referred Code, not found."

    try:
        new_user = UserInfo(
            reff_id=reff_id,
            email=userInfo['email'],
            phone_no = userInfo['phone_no'],
            name=userInfo['name'],
            country=userInfo['country'],
            sate=userInfo['state'],
            pin_code=userInfo['pin_code'],
            reff_by=userInfo.get('reffred_by') if userInfo.get('reffred_by') else None
        )
        
        db.session.add(new_user)
        db.session.commit()
        return True, reff_id
    except Exception as e:
        db.session.rollback()
        return False, "Error: " + str(e)
