from django.test import TestCase
from rest_framework.test import APITestCase
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import Group
from users.models import User
from .models import Tag, Author, Genre, Book, Review


class BookCreationTestCase(TestCase):
    def setUp(self):
        # Создание базовых объектов для тестирования
        self.tag = Tag.objects.create(name="Fantasy", url="fantasy")
        self.genre = Genre.objects.create(name="Adventure", url="adventure")
        self.author = Author.objects.create(name="J.K. Rowling")
        self.book = Book.objects.create(
            title="Harry Potter",
            description="A fantasy novel",
            author=self.author,
            url="harry-potter",
            copies=10,
            rating=0
        )
        self.book.genres.add(self.genre)
        self.book.tags.add(self.tag)

    # Проверка созданных элементов
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

    # Проверка книги на соответствие заданным параметрам
    def test_book_same(self):
        self.assertIn(self.genre, self.book.genres.all())
        self.assertIn(self.tag, self.book.tags.all())
        self.assertEqual(str(self.book.author), "J.K. Rowling")
        self.assertEqual(str(self.book.title), "Harry Potter")
        self.assertEqual(str(self.book.url), "harry-potter")
        self.assertEqual(str(self.book.copies), "10")
        self.assertEqual(str(self.book.rating), "0")


class BookReviewsTestCase(APITestCase):
    def setUp(self):
        # Создание книги
        self.tag = Tag.objects.create(name="Fantasy", url="fantasy")
        self.genre = Genre.objects.create(name="Adventure", url="adventure")
        self.author = Author.objects.create(name="J.K. Rowling")
        self.book = Book.objects.create(
            title="Harry Potter",
            description="A fantasy novel",
            author=self.author,
            url="harry-potter",
            copies=10,
            rating=0
        )
        self.book.genres.add(self.genre)
        self.book.tags.add(self.tag)
        # Создаем группы
        self.readers_group, created = Group.objects.get_or_create(name='Librarians')
        self.readers_group, created = Group.objects.get_or_create(name='Readers')

        # Создаем пользователя и добавляем его в группу читателей
        self.reader_user = User.objects.create_user(
            username='reader',
            password='testpassword',
            email='reader@example.com'
        )
        self.reader_user.groups.add(self.readers_group)

        # Получаем токен
        self.token = self.get_token(self.reader_user)

    def get_token(self, user):
        # Получаем токен для пользователя через запрос
        response = self.client.post('/auth/token/login/', {'username': user.username, 'password': 'testpassword'})
        return response.data['auth_token']

    def test_book_rating_changed(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        # Отправляем запрос к API для получения списка читателей
        response = self.client.post('http://127.0.0.1:8000/api/v1/books/reviews/create/', {
            'rating': '2', 'name': 'Плохо', 'text': 'Не понравилось', 'author': str(self.reader_user.pk),
            'book': str(self.book.pk)
        })
        response = self.client.post('http://127.0.0.1:8000/api/v1/books/reviews/create/', {
            'rating': '6', 'name': 'Плохо', 'text': 'Не понравилось', 'author': str(self.reader_user.pk),
            'book': str(self.book.pk)
        })
        self.book.refresh_from_db()
        # Проверяем статус ответа
        self.assertEqual(str(self.book.rating), response.data['rating'])
