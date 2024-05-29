import json
from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from articles.models import *
from articles.utils import *

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from .embedding import get_result


@require_http_methods(["GET"])
def popular_article(request):
    
    if request.method == "GET":

        driver = webdriver.Chrome()
        driver.get("https://www.chosun.com/politics/")

        politic_elements = driver.find_elements(By.CLASS_NAME, 'story-card__headline')[5:15]
        hrefs = [elem.get_attribute('href') for elem in politic_elements]

        chosun_articles = []

        for href in hrefs:
            driver.execute_script("window.open('');")
            driver.switch_to.window(driver.window_handles[1])

            driver.get(href)
            title = driver.find_element(By.CSS_SELECTOR, '.article-header__headline')
            title = title.text
            article_contents = driver.find_elements(By.CSS_SELECTOR, '.article-body__content')

            article_text = "\n".join([content.text for content in article_contents])

            driver.close()
            driver.switch_to.window(driver.window_handles[0])

            temp = Article.objects.create(
                title = title,
                text = article_text,
                company = "조선일보",
                link = href
            )

            chosun_articles.append(temp.text)

        driver.get("https://www.hani.co.kr/")

        article_count = 0

        driver.find_element(By.CSS_SELECTOR, 'label[for="most-read-category-full-1"]').click()
        politic_elements = driver.find_elements(By.CLASS_NAME, 'ArticleBottomMostReadList_subListItem__SwW3j')[:10]
        hrefs = [elem.get_attribute('href') for elem in politic_elements]

        
        for href in hrefs:
            driver.execute_script("window.open('');")
            driver.switch_to.window(driver.window_handles[1])

            driver.get(href)
            try:
                title = driver.find_element(By.CSS_SELECTOR, '.ArticleDetailView_title__9kRU_')
                title = title.text
            except:
                driver.close()
                driver.switch_to.window(driver.window_handles[0])
                continue
            article_content = driver.find_elements(By.CSS_SELECTOR, '.article-text')
            article_content = article_content[0].text

            driver.close()
            driver.switch_to.window(driver.window_handles[0])

            temp = Article.objects.create(
                title = title,
                text = article_content,
                company = "한겨레 신문",
                link = href
            )

            article_count = article_count + 1
            if article_count == 5:
                break

        article_count = 0

        driver.find_element(By.CSS_SELECTOR, 'label[for="most-read-category-full-2"]').click()
        social_elements = driver.find_elements(By.CLASS_NAME, 'ArticleBottomMostReadList_subListItem__SwW3j')[:10]
        hrefs = [elem.get_attribute('href') for elem in social_elements]

        for href in hrefs:
            driver.execute_script("window.open('');")
            driver.switch_to.window(driver.window_handles[1])

            driver.get(href)
            try:
                title = driver.find_element(By.CSS_SELECTOR, '.ArticleDetailView_title__9kRU_')
                title = title.text
            except:
                driver.close()
                driver.switch_to.window(driver.window_handles[0])
                continue
            article_content = driver.find_elements(By.CSS_SELECTOR, '.article-text')
            article_content = article_content[0].text

            driver.close()
            driver.switch_to.window(driver.window_handles[0])

            temp = Article.objects.create(
                title = title,
                text = article_content,
                company = "한겨레 신문",
                link = href
            )

            article_count = article_count + 1
            if article_count == 5:
                break
        
        driver.quit()

        return JsonResponse({
            'status' : 200,
            'message' : '조선일보, 한겨레신문 각 10개씩 기사 크롤링 및 요약본 DB 저장 완료'
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
        
   
@require_http_methods(["OPTIONS", "POST"])
def chatting(request):
    try:
        data = json.loads(request.body)
        print(data)
        user_question = data.get('question')
        if user_question:
            answer = get_result(user_question)
            return JsonResponse({'answer': answer})
        else:
            return JsonResponse({'error': 'No question provided'}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)