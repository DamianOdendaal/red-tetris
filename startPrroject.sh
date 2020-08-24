'''
    Shell script that will run the docker compose and 
    start the project so that we can have a simple quick 
    way to begin using the application
'''

docker-compose run --rm backend python3 manage.py startapp char_count