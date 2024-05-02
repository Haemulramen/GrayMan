from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from articles.models import *
from articles.utils import *

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
# Create your views here.

def hello_world(request):
    if request.method == "GET":
        return JsonResponse({
            'status' : 200,
            'data' : 'Hello world!'
        })
    
@require_http_methods(["GET"])
def popular_article(request):
    
    if request.method == "GET":

        driver = webdriver.Chrome()
        driver.get("https://www.chosun.com/politics/")

        politic_elements = driver.find_elements(By.CLASS_NAME, 'story-card__headline')[5:15]
        hrefs = [elem.get_attribute('href') for elem in politic_elements]

        articles = []
        for href in hrefs:
            driver.execute_script("window.open('');")
            driver.switch_to.window(driver.window_handles[1])

            driver.get(href)
            article_contents = driver.find_elements(By.CSS_SELECTOR, '.article-body__content')

            article_text = "\n".join([content.text for content in article_contents])

            driver.close()
            driver.switch_to.window(driver.window_handles[0])

            temp = Article.objects.create(
                title = "sorry",
                text = article_text,
                company = "조선일보",
                link = href
            )

            articles.append(temp.text)

        driver.quit()

        return JsonResponse({
            'status' : 200,
            'message' : '조선일보 최근 가장 많이 본 기사 10',
            'data' : articles
        })
    
@require_http_methods(["DELETE"])
def delete_article(request):

    if request.method == "DELETE":

        all_article = Article.objects.all()
        for article in all_article:
            article.delete()

        return JsonResponse({
            'status' : 200,
            'data' : '모든 기사 데이터 삭제 완료'
        })
    
@require_http_methods(["GET"])
def summarize(request, id):
    
    if request.method == "GET":
        article = get_object_or_404(Article, id=id)
        cn = CreateNews()
        summary = cn.summarize(article.text)

        sum = Summary.objects.create(
                origin = article,
                text = summary,
                correction = "test",
                reason = "test",
            )
        
        sum_json = {
            'text' : sum.text,
            'correction' : sum.correction,
            'reason' : sum.reason
        }
        
        return JsonResponse({
            'status' : 200,
            'data' : sum_json
        })