import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')


if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
  
class Config:
    SECRET_KEY = "mrfrIMEngCl0pAKqWIIBS_g"
    #SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    ENV = "development"
    DEBUG = True
    DATABASE_URI = os.path.join(basedir, 'app.json')
    


class ProductionConfig(Config):
    ENV = "production"
    DEBUG = False
    DATABASE_URI = MONGO_URI = "mongodb://root:tiranga_mudra-ADMIN@user_info_db:27017/user_info?authSource=admin"
    MONGO_DB_NAME = "user_info"
    #SQLALCHEMY_ECHO = False

