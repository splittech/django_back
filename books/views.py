from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Book, Genre, Tag
from .serializers import BookListSerializer, BookDetailSerializer, ReviewCreateSerializer, GenresSerializer, \
    TagsSerializer
from django_filters.rest_framework import DjangoFilterBackend

from service.service import BookFilter


class BookListView(generics.ListAPIView):
    """Вывод списка книг"""
    serializer_class = BookListSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = BookFilter
    #permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        books = Book.objects.all()
        return books


class BookDetailView(generics.RetrieveAPIView):
    """Вывод конкретной книги"""
    queryset = Book.objects.filter(draft=False)
    serializer_class = BookDetailSerializer


class ReviewCreateView(generics.CreateAPIView):
    """Добавление отзыва"""
    serializer_class = ReviewCreateSerializer


class TagsListView(generics.ListAPIView):
    """Вывод списка тегов"""
    serializer_class = TagsSerializer

    def get_queryset(self):
        books = Tag.objects.all()
        return books


class GenresListView(generics.ListAPIView):
    """Вывод списка жанров"""
    serializer_class = GenresSerializer

    def get_queryset(self):
        books = Genre.objects.all()
        return books

