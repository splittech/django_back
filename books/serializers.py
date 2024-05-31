from rest_framework import serializers
from .models import Book, Review, Genre, Collection


class BookListSerializer(serializers.ModelSerializer):
    """Список книг"""
    author = serializers.SlugRelatedField(slug_field="name", read_only=True)
    tags = serializers.SlugRelatedField(slug_field="name", read_only=True, many=True)
    genres = serializers.SlugRelatedField(slug_field="name", read_only=True, many=True)

    class Meta:
        model = Book
        fields = "__all__"


class ReviewCreateSerializer(serializers.ModelSerializer):
    """Добавление отзыва"""

    class Meta:
        model = Review
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    """Отзыв"""

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


class CollectionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = "__all__"