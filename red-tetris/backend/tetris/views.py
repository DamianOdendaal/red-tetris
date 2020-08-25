from django.shortcuts import render
from . models import TetrisPlayer as Player
from .models import TetrisGameModes as Modes
# Create your views here.

class Players():
    def players_view(requests):
        player_objects = Player.objects.all()
        context = {
            'player_object': player_objects
        }

        return render(requests, "tetris/index.html", context)

class Modes():
    def modes_view(requests):
        mode_objects = Modes.objects.all()
        context = {
            'mode_objects': mode_objects
        }
        #instead of rendering the view here we are going to do that in React
        return render(requests, "tetris/index.html", context)
