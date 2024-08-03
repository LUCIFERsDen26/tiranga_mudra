from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()  # SQLAlchemy instance for database interactions
migrate = Migrate()
