from flask import Flask
from .extensions import get_db
from .routes import db_route, static_route, reference_route, getcount_route
from flask_cors import CORS
from datetime import datetime

import os
import config
def create_app():
    app = Flask(__name__)

    CORS(app, origins=['https://api.countrystatecity.in',"https://fonts.gstatic.com"]) 
    environment_configuration = os.environ['CONFIGURATION_SETUP']
    app.config.from_object(environment_configuration)
    
    with app.app_context():
        db = get_db()  # Ensure the database is connected before each request

    app.register_blueprint(db_route.bp)
    app.register_blueprint(static_route.bp)
    app.register_blueprint(getcount_route.bp)
    app.register_blueprint(reference_route.bp)

    return app
    
    


