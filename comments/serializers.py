from rest_framework import serializers
from .models import Comment
from .utils import CreateComment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

    def validate_content(self, value):
        commment_checker = CreateComment()
        toxicity = commment_checker.comment_moderation(value)
        
        if toxicity == False:
            return value
        else:
            raise serializers.ValidationError("This comment is toxic")
