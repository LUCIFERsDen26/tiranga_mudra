#!/bin/bash

# Check if .env file exists in src directory
if [ ! -f src/.env ]; then
  # Copy example.env to src directory
  cp src/example.env src/.env
  echo ".env file created in src directory"
else
  echo ".env file already exists in src directory"
fi

# Start the Flask application with Gunicorn
cd src/
python3 -m gunicorn --worker-class gevent --workers 3 --bind 0.0.0.0:5000 wsgi:app --max-requests 10000 --timeout 5 --keep-alive 5
