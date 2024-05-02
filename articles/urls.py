from django.urls import path
from articles.views import *

urlpatterns = [
    path('', popular_article, name = 'popular_article'),
]