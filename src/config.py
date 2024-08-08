import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')


if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
  
class Config:
    SECRET_KEY = "mrfrIMEngCl0pAKqWIIBS_g"
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    ENV = "development"
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_ECHO = True


class ProductionConfig(Config):
    ENV = "production"
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://website:website@user_info_db:3306/user_info'
    SQLALCHEMY_ECHO = False

