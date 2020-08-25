from django.db import models

# Create your models here.

class TetrisPlayer(models.Model):
    game_name = models.CharField(max_length=120, default="")
    game_score = models.TextField(default="0")
    number_of_wins = models.TextField(default="0")
    number_of_loses = models.TextField(default="0")
    #cater for the amount of times played

    def __str__(self):
        return self.game_name

class TetrisGameModes(models.Model):
    game_mode_name = models.CharField(max_length=120, default="normal")
    selected_game_mode = models.TextField(default="Normal")

    def __str__(self):
        return self.selected_game_mode

