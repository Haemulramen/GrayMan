from django.urls import path
from articles.views import *

urlpatterns = [
    path('', popular_article, name = 'popular_article'),
    path('delete/', delete_article, name='delete_article'),
    path('sum/<int:id>/', summarize, name='summarize'),
]