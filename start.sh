#!/bin/bash

# Check if .env file exists in src directory
if [ ! -f src/.env ]; then
  # Copy example.env to src directory
  cp src/example.env src/.env
  echo ".env file created in src directory"
else
  echo ".env file already exists in src directory"
fi

# Check for the existence of the migrations directory
if [ -d "migrations" ]; then
  cd src/
  # Migrations directory exists, run the application directly
  python3 -m gunicorn --worker-class gevent --workers 3 --bind 0.0.0.0:5000 wsgi:app --max-requests 10000 --timeout 5 --keep-alive 5

else
  # Migrations directory doesn't exist, initialize and apply migrations
  flask --app src/app db init
  flask --app src/app db migrate -m "Initial migration"
  flask --app src/app db upgrade

  # Check if migrations were successful (optional)
  if [ $? -eq 0 ]; then
    cd src/
    python3 -m gunicorn --worker-class gevent --workers 3 --bind 0.0.0.0:5000 wsgi:app --max-requests 10000 --timeout 5 --keep-alive 5

  else
    echo "Migrations failed. Check logs for details."
    exit 1
  fi
fi
