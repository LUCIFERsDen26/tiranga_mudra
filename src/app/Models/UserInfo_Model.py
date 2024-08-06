from datetime import datetime
from ..extensions import db

class UserInfo(db.Model):

   __tablename__ = "user_info"
   id = db.Column(db.Integer,primary_key=True,autoincrement=True)
   reff_id = db.Column(db.String,nullable=False,unique=True)
   reff_by = db.Column(db.String,nullable=True)
   mobile_no = db.Column(db.String, nullable=False,unique=True)   
   name = db.Column(db.String, nullable=False)
   sate = db.Column(db.String, nullable=False)
   pin_code = db.Column(db.String, nullable=False)
   timestamp = db.Column(db.DateTime, default=datetime.utcnow)

def __repr__(self):
   return f'<User Info:\nrefference_id="{self.reff_id}\n",refference_by="{self.reff_by}"\n,mobile_no="{self.mobile_no}\n",name="{self.name}\n",state={self.sate}\n,pin_code="{self.pin_code}\n",timestamp="{self.timestamp}\n">'

