from django.urls import path

from .views import NewsListAPI, NewsDetailAPI


urlpatterns = [
    path("/", NewsListAPI.as_view()),
    path("/<int:pk>/", NewsDetailAPI.as_view()),
]
