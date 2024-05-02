# Generated by Django 5.0.4 on 2024-05-01 07:13

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Article",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("text", models.TextField(verbose_name="기사 내용")),
                ("company", models.CharField(max_length=30, verbose_name="언론사")),
            ],
        ),
    ]
