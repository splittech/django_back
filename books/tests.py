from django.test import TestCase

from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Tag, Author, Genre, Book, Review

class ModelsTestCase(TestCase):
    def setUp(self):
    # Создание базовых объектов для тестирования
        self.tag = Tag.objects.create(name="Fantasy", url="fantasy")
        self.genre = Genre.objects.create(name="Adventure", url="adventure")
        self.author = Author.objects.create(name="J.K. Rowling")
        self.book = Book.objects.create(
            title="Harry Potter",
            description="A fantasy novel",
            author=self.author,
            genres=None,
            tags=None,
            url="harry-potter",
            copies=0,
            rating=0
        )
    def test_tag_creation(self):
        self.assertEqual(str(self.tag), "Fantasy")
        self.assertEqual(self.tag.url, "fantasy")

    def test_genre_creation(self):
        self.assertEqual(str(self.genre), "Adventure")
        self.assertEqual(self.genre.url, "adventure")

    def test_author_creation(self):
        self.assertEqual(str(self.author), "J.K. Rowling")

    def test_book_creation(self):
        self.assertEqual(str(self.book), "Harry Potter")