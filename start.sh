#!/bin/bash

# Check for the existence of the migrations directory
if [ -d "migrations" ]; then
  # Migrations directory exists, run the application directly
  python -m flask --app src/app run --port 5000 --debug
else
  # Migrations directory doesn't exist, initialize and apply migrations
  flask --app src/app db init
  flask --app src/app db migrate -m "Initial migration"
  flask --app src/app db upgrade

  # Check if migrations were successful (optional)
  if [ $? -eq 0 ]; then
    python -m flask --app src/app run --port 5000 --debug
  else
    echo "Migrations failed. Check logs for details."
    exit 1
  fi
fi
