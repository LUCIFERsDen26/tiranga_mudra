#!/bin/bash

# Function to start Flask application in debug mode
start_flask_debug() {
  # Overwrite .env file with the debug configuration
  echo "CONFIGURATION_SETUP=\"config.DevelopmentConfig\"" > src/.env
  echo "Running Flask application in debug mode..."

  # Run Flask application with --debug and --reload
  flask --app src/app run --debug --reload
}

# Function to start Flask application with Gunicorn
start_flask_production() {
  # Overwrite .env file with the debug configuration
  echo "CONFIGURATION_SETUP=\"config.ProductionConfig\"" > src/.env
  echo "Starting Flask application with Gunicorn..."

  # Start the Flask application with Gunicorn
  cd src/
  python3 -m gunicorn --worker-class gevent --workers 3 --bind 0.0.0.0:5000 wsgi:app --max-requests 10000 --timeout 5 --keep-alive 5
}

# Check if .env file exists in src directory
if [ ! -f src/.env ]; then
  # Copy example.env to src directory
  cp src/example.env src/.env
  echo ".env file created in src directory"
else
  echo ".env file already exists in src directory"
fi

# Check if the 'debug' argument is passed
if [ "$1" == "debug" ]; then
  start_flask_debug
else
  start_flask_production
fi
