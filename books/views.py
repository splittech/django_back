from django.forms import model_to_dict
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User
from users.serializers import UserSerializer, UsersListSerializer
from .models import Book, Genre, Tag, Collection, Review
from .serializers import BookListSerializer, BookDetailSerializer, ReviewCreateSerializer, GenresSerializer, \
    TagsSerializer, CollectionsSerializer
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
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer


class ReviewCreateView(APIView):
    """Добавление отзыва"""
    #permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        rating = int(request.data.get('rating'))
        if rating <= 10:
            serializer = ReviewCreateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            book_id = request.data.get('book')
            reviews = Review.objects.filter(book=book_id)
            counter = 0
            sum = 0
            book_rating = 0
            for review in reviews:
                counter = counter + 1
                sum = sum + review.rating
                book_rating = sum / counter
            book = Book.objects.get(pk=book_id)
            book.rating = book_rating
            book.save()
            return Response({'rating': book_rating.__str__()}, 200)
        else:
            return Response({'error': 'Rating is more than 10'}, 400)


class PinBookView(APIView):
    """Закрепление книги"""
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        book_id = int(request.data.get('book'))
        reader_id = int(request.data.get('reader'))
        reader = User.objects.get(pk=reader_id)
        if not reader.groups.filter(name='Librarian').exists():
            book = Book.objects.get(pk=book_id)
            # if reader.books. < 1:
            #     return Response({'error': 'no copies available'}, 400)
            if book.copies < 1:
                return Response({'error': 'no copies available'}, 400)
            #else:
            book.copies = book.copies - 1
            book.save()
            reader.books.add(book)
            return Response({'copies': book.copies.__str__()}, 200)
        else:
            return Response({'error': 'tried to pin to librarian'}, 400)

class TagsListView(generics.ListAPIView):
    """Вывод списка тегов"""
    serializer_class = TagsSerializer

    def get_queryset(self):
        tags = Tag.objects.all()
        return tags


class GenresListView(generics.ListAPIView):
    """Вывод списка жанров"""
    serializer_class = GenresSerializer

    def get_queryset(self):
        genres = Genre.objects.all()
        return genres


class CollectionsListView(generics.ListAPIView):
    """Вывод подборок"""
    serializer_class = CollectionsSerializer

    def get_queryset(self):
        collections = Collection.objects.all()
        return collections


class UsersListView(generics.ListAPIView):
    """Вывод списка читателей"""
    serializer_class = UsersListSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        users = User.objects.filter(groups=2)
        return users