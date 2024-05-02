from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# class Interest(models.Model):
#     CHOICE = (
#         ('SOCIAL', '사회'),
#         ('POLITIC', '정치')
#     )
#     category = models.CharField(choices=CHOICE, max_length=10, unique=True)

class Article(models.Model):
    title = models.TextField(verbose_name="제목")
    text = models.TextField(verbose_name="기사 내용")
    # category = models.ForeignKey(Interest, verbose_name="카테고리", on_delete=models.CASCADE)
    company = models.CharField(max_length=30, verbose_name="언론사")
    link = models.TextField(verbose_name="원본 링크")

class Summary(models.Model):
    origin = models.ForeignKey(Article, verbose_name="원본 기사", on_delete=models.CASCADE)
    text = models.TextField(verbose_name="요약본")
    correction = models.TextField(verbose_name="수정 부분")
    reason = models.TextField(verbose_name="수정 이유")
