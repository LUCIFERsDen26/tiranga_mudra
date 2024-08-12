from datetime import datetime
from ..extensions import db

from sqlalchemy import Column, Integer, String

class UserInfo(db.Model):
   __tablename__ = "user_info"
   id = db.Column(db.Integer, primary_key=True, autoincrement=True)
   timestamp = db.Column(db.DateTime, default=datetime.utcnow)
   reff_id = db.Column(db.String(8), nullable=False, unique=True)
   
   email = db.Column(db.String(40), nullable=False, unique=True)
   name = db.Column(db.String(30), nullable=False)
   country = db.Column(db.String(50), nullable=False)
   sate = db.Column(db.String(50), nullable=False)
   pin_code = db.Column(db.String(10), nullable=False)
   reff_by = db.Column(db.String(8), nullable=True)


def __repr__(self):
   return f'<User Info:\nrefference_id="{self.reff_id}\n",refference_by="{self.reff_by}"\n,mobile_no="{self.mobile_no}\n",name="{self.name}\n",state={self.sate}\n,pin_code="{self.pin_code}\n",timestamp="{self.timestamp}\n">'

