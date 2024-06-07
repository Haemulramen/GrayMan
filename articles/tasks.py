from celery import shared_task
import requests

@shared_task
def newstrality_task():
    try:
        response = requests.get("http://localhost:8000/news/")
        response.raise_for_status()
        print(f'API response: {response.json()}')
    except requests.RequestException as e:
        print(f'Request failed: {e}')