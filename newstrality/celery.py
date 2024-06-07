from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

# Django의 설정 모듈을 celery의 기본으로 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'newstrality.settings')

app = Celery('newstrality')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

app.conf.beat_schedule = {
    'run-every-3-hours': {
        'task': 'articles.tasks.newstrality_task',
        'schedule': crontab(hour='*/3', minute=0)
    },
}
