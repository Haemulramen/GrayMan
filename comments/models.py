from django.db import models

class Comment(models.Model):
    article_id = models.IntegerField(verbose_name="기사 ID")
    content = models.TextField()
    password = models.CharField(max_length=20)

    def __str__(self):
        return self.content
