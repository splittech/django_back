from rest_framework.response import Response
from rest_framework.views import APIView

from .models import News
from .serializers import NewsDetailSerializer, NewsListSerializer


class NewsListAPI(APIView):
    def get(self, request):
        news = News.objects.all()
        serializer = NewsListSerializer(news, many=True)
        return Response(serializer.data)


class NewsDetailAPI(APIView):
    def get(self, request, pk):
        news = News.objects.get(pk=pk)
        serializer = NewsDetailSerializer(news)
        return Response(serializer.data)
