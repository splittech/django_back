from django.forms import model_to_dict
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User
from users.serializers import UserSerializer, UsersListSerializer
from .models import Book, Genre, Tag, Collection, Review, Author
from .serializers import BookListSerializer, BookDetailSerializer, ReviewCreateSerializer, GenresSerializer, \
    TagsSerializer, CollectionsSerializer, AuthorsSerializer
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
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        rating = int(request.data.get('rating'))
        user_id = int(request.data.get('author'))
        authenticated_user = request.user

        if rating <= 10 and user_id == authenticated_user.id:
            authenticated_user = request.user
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
    #permission_classes = [permissions.IsAuthenticated]
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


class FavouriteView(APIView):
    """Добавление в избранное"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        authenticated_user = request.user
        book_id = int(request.data.get('book'))
        reader_id = int(request.data.get('reader'))
        if reader_id == authenticated_user.id:
            reader = User.objects.get(pk=reader_id)
            book = Book.objects.get(pk=book_id)
            reader.favourites.add(book)
            reader.save()
            return Response({'book': book_id.__str__()}, 200)
        else:
            return Response({'error': 'tried to favourite book to other user'}, 400)




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


class CollectionDetailView(generics.RetrieveAPIView):
    """Вывод конкретной подборки"""
    queryset = Collection.objects.all()
    serializer_class = CollectionsSerializer


class AuthorsListView(generics.ListAPIView):
    """Вывод авторов"""
    serializer_class = AuthorsSerializer

    def get_queryset(self):
        authors = Author.objects.all()
        return authors


class UsersListView(generics.ListAPIView):
    """Вывод списка читателей"""
    serializer_class = UsersListSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        users = User.objects.filter(groups=2)
        return users