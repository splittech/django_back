from rest_framework import serializers
from .models import Book, Review


class BookListSerializer(serializers.ModelSerializer):
    """Список книг"""

    class Meta:
        model = Book
        fields = ("title", "author")


class ReviewCreateSerializer(serializers.ModelSerializer):
    """Добавление отзыва"""

    class Meta:
        model = Review
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    """Отзыв"""

    class Meta:
        model = Review
        fields = ("rating", "name", "text")


class BookDetailSerializer(serializers.ModelSerializer):
    """Книга"""
    authors = serializers.SlugRelatedField(slug_field="name", read_only=True)
    tags = serializers.SlugRelatedField(slug_field="name", read_only=True, many=True)
    genres = serializers.SlugRelatedField(slug_field="name", read_only=True, many=True)
    reviews = ReviewCreateSerializer(many=True)

    class Meta:
        model = Book
        fields = "__all__"