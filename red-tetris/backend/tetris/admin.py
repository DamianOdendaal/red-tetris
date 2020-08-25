from django.contrib import admin
from .models import TetrisPlayer
from .models import TetrisGameModes


admin.site.register(TetrisPlayer)
admin.site.register(TetrisGameModes)