from django.urls import path
from articles.views import *

urlpatterns = [
    path('', popular_article, name = 'popular_article'),
    path('delete/', delete_article, name='delete_article'),
    path('sum/<int:id>/', summarize, name='summarize'),
    path('chatting/', chatting, name = 'chatting'),
    path('<int:id>/', article_comment_list, name='article_comment_list'),
    path('user_article/',user_article_input, name='user_article_input'),
]