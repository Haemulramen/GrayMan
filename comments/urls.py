from django.urls import path
from comments.views import *

urlpatterns = [
    path('', CommentListCreate.as_view()),
    path('<int:id>/', CommentRetrieveUpdateDestroy.as_view()),
]
