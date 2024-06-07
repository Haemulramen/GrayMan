from django.shortcuts import render
from .models import Comment
from .serializers import CommentSerializer
from rest_framework import generics
from newstrality.permissions import CorrectPassword

class CommentListCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [CorrectPassword]
    lookup_field = 'id'
