from django.db import models

# Create your models here.

class TetrisPlayer(models.Model):
    game_name = models.CharField(max_length=120)
    game_score = models.TextField()
    #cater for the amount of times played

    def __str__(self):
        return self.game_name

class TetrisGameModes(models.Model):
    def __init__(self):
        pass
        # game modes come in here

