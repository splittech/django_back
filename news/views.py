from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import News
from .serializers import NewsDetailSerializer, NewsListSerializer


class NewsListAPI(generics.ListAPIView):
    """Вывод списка новостей"""
    serializer_class = NewsListSerializer

    def get_queryset(self):
        books = News.objects.all()
        return books


class NewsDetailAPI(generics.RetrieveAPIView):
    """Вывод списка новостей"""
    serializer_class = NewsListSerializer
    queryset = News.objects.all()
