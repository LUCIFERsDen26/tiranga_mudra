# Use a slim Python base image
FROM python:3.11-slim-buster

# Set the working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .
RUN chmod +x start.sh
# Expose the port your Flask app will listen on
EXPOSE 5000

# Command to run the Flask app
CMD ["./start.sh"]

