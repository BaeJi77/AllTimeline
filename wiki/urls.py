from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('search/<keyword>', views.searchWiki, name ='search'),
]