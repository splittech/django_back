from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Book, Review, Genre, Collection, Author


User = get_user_model()


class BookListSerializer(serializers.ModelSerializer):
    """Список книг"""
    author = serializers.SlugRelatedField(slug_field="name", read_only=True)
    #tags = serializers.SlugRelatedField(slug_field="name", read_only=True, many=True)
    #genres = serializers.SlugRelatedField(slug_field="name", read_only=True, many=True)

    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'image', 'rating')


class ReviewCreateSerializer(serializers.ModelSerializer):
    """Добавление отзыва"""

    class Meta:
        model = Review
        fields = "__all__"


class UserFixedSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'avatar')
        #fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    """Отзыв"""
    author = UserFixedSerializer()

    class Meta:
        model = Review
        fields = "__all__"


class BookDetailSerializer(serializers.ModelSerializer):
    """Книга"""
    author = serializers.SlugRelatedField(slug_field="name", read_only=True)
    tags = serializers.SlugRelatedField(slug_field="name", read_only=True, many=True)
    genres = serializers.SlugRelatedField(slug_field="name", read_only=True, many=True)
    reviews = ReviewSerializer(many=True)

    class Meta:
        model = Book
        fields = "__all__"


class GenresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"


class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"


class AuthorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"


class CollectionsSerializer(serializers.ModelSerializer):
    books = BookListSerializer(many=True)
    class Meta:
        model = Collection
        fields = "__all__"