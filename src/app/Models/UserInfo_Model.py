from datetime import datetime
from ..extensions import db

class UserInfo(db.Model):

   __tablename__ = "user_info"
   id = db.Column(db.Integer,primary_key=True,autoincrement=True)
   mobile_no = db.Column(db.String, nullable=False,unique=True)   
   name = db.Column(db.String, nullable=False)
   sate = db.Column(db.String, nullable=False)
   pin_code = db.Column(db.String, nullable=False)
   timestamp = db.Column(db.DateTime, default=datetime.utcnow)

def __repr__(self):
    return f'<User Info mobile_no="{self.mobile_no}", name="{self.name}", sate={self.sate}, pin_code="{self.pin_code}", timestamp="{self.timestamp}">'

