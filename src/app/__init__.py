from flask import Flask
from .extensions import db,migrate
from .routes import db_route, index_route
import os
import config
def create_app():
    app = Flask(__name__)
    
    environment_configuration = os.environ['CONFIGURATION_SETUP']
    app.config.from_object(environment_configuration)
    
    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(db_route.bp)
    app.register_blueprint(index_route.bp)
    return app
    
    

