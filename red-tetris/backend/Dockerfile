# Use an official Python runtime as a parent image
FROM python:3.6

# Adding backend directory to make absolute filepaths consistent across services
WORKDIR /app/backend

# Install Python dependencies
COPY requirements.txt /app/backend
RUN pip3 install --upgrade pip -r requirements.txt

# Add the rest of the code
COPY . /app/backend

# Make port 8000 available for the app
EXPOSE 8000

# Be sure to use 0.0.0.0 for the host within the Docker container,
# otherwise the browser won't be able to find it
CMD python3 manage.py runserver 0.0.0.0:8000



# FROM python:3

# # Set environment variables
# ENV PYTHONUNBUFFERED 1

# COPY requirements.txt /

# # Install dependencies.
# RUN pip install -r /requirements.txt

# # Set work directory.
# RUN mkdir /code
# WORKDIR /code

# # Copy project code.
# COPY . /code/

# EXPOSE 80
