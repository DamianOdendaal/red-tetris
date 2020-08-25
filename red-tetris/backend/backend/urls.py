from django.contrib import admin
from django.urls import path
from tetris.views import Players, Modes

urlpatterns = [
    path('admin/', admin.site.urls),
    path('modes/', Modes),
    path('players/', Players),
]
