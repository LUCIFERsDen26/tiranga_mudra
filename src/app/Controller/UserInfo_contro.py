from tinydb import TinyDB, Query
from tinydb.table import Table
from pymongo.collection import Collection
import shortuuid

from ..extensions import get_db

def generate_short_uuid(length=5):
    """Generates a random short UUID of specified length.

    Args:
        length: The desired length of the UUID. Defaults to 5.

    Returns:
        A string representing the generated short UUID.
    """
    return shortuuid.ShortUUID().random(length=length)

def get_user_info_count():
    """Retrieves the count of documents or items in the UserInfo database."""
    db = get_db()
    
    if isinstance(db, Table):
        # TinyDB: Count the number of items in the table
        User = Query()
        return len(db.all())
    elif isinstance(db, Collection):
        # PyMongo: Count the number of documents in the collection
        return db.count_documents({})
    else:
        raise TypeError("Unsupported database type")

def add_user_to_db(userInfo):
    """Adds a new user to the database, handling validations and error handling."""
    db = get_db()
    
    if isinstance(db, Table):
        User = Query()

        # Check for existing user with the same phone number
        existing_user = db.search(User.phone_no == userInfo['phone_no'])
        if existing_user:
            return False, "Error: User with this phone number already exists."

        # Check for referred_by
        if userInfo.get('reff_by'):
            referrer_exists = db.search(User.reff_id == userInfo.get('reff_by'))
            if not referrer_exists:
                return False, "Error: Referred Code, not found."

        # Generate a unique reff_id
        reff_id = generate_short_uuid()

        try:
            new_user = {
                'reff_id': reff_id,
                'phone_no': userInfo['phone_no'],
                'name': userInfo['name'],
                'country': userInfo['country'],
                'state': userInfo['state'],
                'reff_by': userInfo.get('reff_by') if userInfo.get('reff_by') else None
            }
            db.insert(new_user)
            return True, reff_id
        except Exception as e:
            return False, "Error: " + str(e)

    elif isinstance(db, Collection):
        # Check for existing user with the same phone number
        if db.find_one({'phone_no': userInfo['phone_no']}):
            return False, "Error: User with this phone number already exists."

        # Check for referred_by
        if userInfo.get('reff_by'):
            if not db.find_one({'reff_id': userInfo.get('reff_by')}):
                return False, "Error: Referred Code, not found."

        # Generate a unique reff_id
        reff_id = generate_short_uuid()

        try:
            new_user = {
                'reff_id': reff_id,
                'phone_no': userInfo['phone_no'],
                'name': userInfo['name'],
                'country': userInfo['country'],
                'state': userInfo['state'],
                'reff_by': userInfo.get('reff_by') if userInfo.get('reff_by') else None
            }
            db.insert_one(new_user)
            return True, reff_id
        except Exception as e:
            return False, "Error: " + str(e)

    else:
        raise TypeError("Unsupported database type")