import wikipediaapi
from django.http import HttpResponse

from .models import Question


# Create your views here.
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    print(latest_question_list)
    output = ', '.join([q.question_text for q in latest_question_list])
    return HttpResponse(output)


def searchWiki(request, keyword):
    wiki = wikipediaapi.Wikipedia('ko')
    searchResult = wiki.page(keyword)
    # print(wiki.language())
    # print(wiki.exists(keyword))
    print(searchResult.title)
    print(searchResult.exists())
    print(searchResult.wiki)
    print(searchResult.links)
    print("hihi")
    # print(searchResult.backlinks)
    # print(searchResult)
    # print(searchResult.categorymembers)
    print(searchResult.text)
    print(searchResult.namespace)
    print(searchResult.sections)
    print(searchResult.ATTRIBUTES_MAPPING)

    return HttpResponse(searchResult)
