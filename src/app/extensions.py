from flask import current_app, g
from pymongo import MongoClient
from tinydb import TinyDB

def get_db():
    # Check if the database connection is already established
    if 'db' in g:
        return g.db

    if current_app.config['ENV'] == "development":
        
        # Initialize TinyDB with the path from the app config
        db_path = current_app.config['DATABASE_URI']
        db = TinyDB(db_path)
        g.db = db.table('user_info')
    elif current_app.config['ENV'] == "production":
        
        # Initialize MongoDB client
        mongo_uri = current_app.config['DATABASE_URI']
        client = MongoClient(mongo_uri)
        db_name = current_app.config['MONGO_DB_NAME']
        db = client[db_name]
        g.db = db['user_info']  # MongoDB does not use tables, collections are used

    return g.db

