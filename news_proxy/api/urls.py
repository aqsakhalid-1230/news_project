from django.urls import path
from .views import news_proxy

urlpatterns = [
    path('news/', news_proxy, name='news_proxy'),
]
