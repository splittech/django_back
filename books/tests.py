from django.db.models import Q
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
        self.tag = Tag.objects.create(name="Приключение", url="prikluchenie")
        self.genre = Genre.objects.create(name="Фэнтези", url="fentesy")
        self.author = Author.objects.create(name="Джоан Роулинг")
        self.book = Book.objects.create(
            title="Гарри Поттер",
            description="Какое-то описание",
            author=self.author,
            url="harry-potter",
            copies=10,
            rating=0
        )
        self.book.genres.add(self.genre)
        self.book.tags.add(self.tag)

    # Проверка созданных элементов
    def test_tag_creation(self):
        self.assertEqual(str(self.tag), "Приключение")
        self.assertEqual(self.tag.url, "prikluchenie")

    def test_genre_creation(self):
        self.assertEqual(str(self.genre), "Фэнтези")
        self.assertEqual(self.genre.url, "fentesy")

    def test_author_creation(self):
        self.assertEqual(str(self.author), "Джоан Роулинг")

    def test_book_creation(self):
        self.assertEqual(str(self.book), "Гарри Поттер")

    # Проверка книги на соответствие заданным параметрам
    def test_book_same(self):
        self.assertIn(self.genre, self.book.genres.all())
        self.assertIn(self.tag, self.book.tags.all())
        self.assertEqual(str(self.book.author), "Джоан Роулинг")
        self.assertEqual(str(self.book.title), "Гарри Поттер")
        self.assertEqual(str(self.book.url), "harry-potter")
        self.assertEqual(str(self.book.copies), "10")
        self.assertEqual(str(self.book.rating), "0")


class BookReviewsTestCase(APITestCase):
    def setUp(self):
        # Создание базовых объектов для тестирования
        self.tag = Tag.objects.create(name="Приключение", url="prikluchenie")
        self.genre = Genre.objects.create(name="Фэнтези", url="fentesy")
        self.author = Author.objects.create(name="Джоан Роулинг")
        self.book = Book.objects.create(
            title="Гарри Поттер",
            description="Какое-то описание",
            author=self.author,
            url="harry-potter",
            copies=10,
            rating=0
        )
        self.book.genres.add(self.genre)
        self.book.tags.add(self.tag)

        # Создаем группы
        self.librarians_group, created = Group.objects.get_or_create(name='Librarians')
        self.readers_group, created = Group.objects.get_or_create(name='Readers')

        # Создаем пользователя и добавляем его в группу читателей
        self.reader_user = User.objects.create_user(
            username='reader',
            password='testpassword',
            email='reader@example.com'
        )
        self.reader_user.groups.add(self.readers_group)

        # Получаем токен для пользователя через запрос
        response = self.client.post('/auth/token/login/', {'username': self.reader_user.username, 'password': 'testpassword'})
        self.token = response.data['auth_token']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
    def test_book_rating_changed(self):
        # Через запрос добавляем два отзыва к ранее созданной книге
        response = self.client.post('http://127.0.0.1:8000/api/v1/books/reviews/create/', {
            'rating': '2', 'name': 'Плохо', 'text': 'Не понравилось', 'author': str(self.reader_user.pk),
            'book': str(self.book.pk)
        })
        response = self.client.post('http://127.0.0.1:8000/api/v1/books/reviews/create/', {
            'rating': '6', 'name': 'Хорошо', 'text': 'Понравилось', 'author': str(self.reader_user.pk),
            'book': str(self.book.pk)
        })
        self.book.refresh_from_db()
        # Проверяем что рейтинг книги расчитался правильно
        self.assertEqual(str(self.book.rating), response.data['rating'])


class UpdateBookTestCase(APITestCase):
    def setUp(self):
        # Создаем книгу
        self.tag = Tag.objects.create(name="Приключение", url="prikluchenie")
        self.genre = Genre.objects.create(name="Фэнтези", url="fentesy")
        self.author = Author.objects.create(name="Джоан Роулинг")
        self.book = Book.objects.create(
            title="Гарри Поттер",
            description="Какое-то описание",
            author=self.author,
            url="harry-potter",
            copies=10,
            rating=0
        )
        self.book.genres.add(self.genre)
        self.book.tags.add(self.tag)

        # Создаем группы
        self.librarians_group, created = Group.objects.get_or_create(name='Librarians')
        self.readers_group, created = Group.objects.get_or_create(name='Readers')

        # Создаем пользователя и добавляем его в группу читателей
        self.reader_user = User.objects.create_user(
            username='reader',
            password='testpassword',
            email='reader@example.com'
        )
        self.reader_user.groups.add(self.readers_group)

        # Создаем пользователя и добавляем его в группу библиотекарей
        self.librarian_user = User.objects.create_user(
            username='librarian',
            password='testpassword',
            email='librarian@example.com'
        )
        self.librarian_user.groups.add(self.librarians_group)

        # Получаем токен для библиотекаря через запрос
        response = self.client.post('/auth/token/login/',
                                    {'username': self.reader_user.username, 'password': 'testpassword'})
        self.token = response.data['auth_token']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
    def test_pin_book_to_reader(self):
        # Закрепление книги за читателем
        response = self.client.post('http://127.0.0.1:8000/api/v1/books/pinbook/', {
            'book': str(self.book.pk), 'reader': str(self.reader_user.pk)
        })
        self.book.refresh_from_db()
        # Проверка, что количество копий книги уменьшилось
        self.assertEqual(self.book.copies, int(response.data['copies']))
        # Проверка, что у четателя появилась закрепленная книга
        self.assertIn(self.book, self.reader_user.books.all())

class FavouriteBookTestCase(APITestCase):
    def setUp(self):
        # Создаем книгу
        self.tag = Tag.objects.create(name="Приключение", url="prikluchenie")
        self.genre = Genre.objects.create(name="Фэнтези", url="fentesy")
        self.author = Author.objects.create(name="Джоан Роулинг")
        self.book = Book.objects.create(
            title="Гарри Поттер",
            description="Какое-то описание",
            author=self.author,
            url="harry-potter",
            copies=10,
            rating=0
        )
        self.book.genres.add(self.genre)
        self.book.tags.add(self.tag)

        # Создаем группы
        self.librarians_group, created = Group.objects.get_or_create(name='Librarians')
        self.readers_group, created = Group.objects.get_or_create(name='Readers')

        # Создаем пользователя и добавляем его в группу читателей
        self.reader_user = User.objects.create_user(
            username='reader',
            password='testpassword',
            email='reader@example.com'
        )
        self.reader_user.groups.add(self.readers_group)

        # Получаем токен для читателя через запрос
        response = self.client.post('/auth/token/login/',
                                    {'username': self.reader_user.username, 'password': 'testpassword'})
        self.token = response.data['auth_token']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

    def test_add_book_to_favourite(self):
        # Добавление книги в избранное
        response = self.client.post('http://127.0.0.1:8000/api/v1/books/favourite/', {
            'book': str(self.book.pk), 'reader': str(self.reader_user.pk)
        })
        # Проверка, что книга добавилась в избранное
        self.assertIn(self.book, self.reader_user.favourites.all())


class SortingTestCase(APITestCase):
    def setUp(self):
        # Создание базовых объектов для тестирования
        # Создание трех тегов и трех жанров
        self.tag1 = Tag.objects.create(name="Фэнтези", url="fantasy")
        self.tag2 = Tag.objects.create(name="Магия", url="magic")
        self.tag3 = Tag.objects.create(name="Научная фантастика", url="sci-fi")

        self.genre1 = Genre.objects.create(name="Приключения", url="adventure")
        self.genre2 = Genre.objects.create(name="Мистика", url="mystery")
        self.genre3 = Genre.objects.create(name="Экшен", url="action")

        # Создание первого автора и книги с тегами и жанрами
        self.author1 = Author.objects.create(name="Джоан Роулинг")
        self.book1 = Book.objects.create(
            title="Гарри Поттер",
            description="Фэнтези-роман",
            author=self.author1,
            url="harry-potter",
            copies=10,
            rating=0
        )
        self.book1.genres.add(self.genre1, self.genre2)  # Жанры: Приключения и Мистика
        self.book1.tags.add(self.tag1, self.tag2)  # Теги: Фэнтези и Магия

        # Создание второго автора и книги с тегами и жанрами
        self.author2 = Author.objects.create(name="Фрэнк Герберт")
        self.book2 = Book.objects.create(
            title="Дюна",
            description="Научно-фантастический роман",
            author=self.author2,
            url="dune",
            copies=5,
            rating=0
        )
        self.book2.genres.add(self.genre2, self.genre3)  # Жанры: Мистика и Экшен
        self.book2.tags.add(self.tag2, self.tag3)  # Теги: Магия и Научная фантастика

        # Создание третьего автора и книги с тегами и жанрами
        self.author3 = Author.objects.create(name="Джон Толкин")
        self.book3 = Book.objects.create(
            title="Властелин Колец",
            description="Эпический фэнтези-роман",
            author=self.author3,
            url="lord-of-the-rings",
            copies=8,
            rating=0
        )
        self.book3.genres.add(self.genre1, self.genre3)  # Жанры: Приключения и Экшен
        self.book3.tags.add(self.tag1, self.tag3)  # Теги: Фэнтези и Научная фантастика
        self.book1.refresh_from_db()
        self.book2.refresh_from_db()
        self.book3.refresh_from_db()

    def test_sort_genres(self):
        books1 = Book.objects.filter(genres=self.genre1)
        books2 = Book.objects.filter(genres=self.genre2)
        books3 = Book.objects.filter(genres=self.genre3)
        books12 = books1.intersection(books2)
        books13 = books1.intersection(books3)
        books23 = books2.intersection(books3)
        books123 = books12.intersection(books3)
        # Проверяем что количество книг с одним жанром - 2 и это нужные книги
        self.assertEqual(len(books1), 2)
        self.assertEqual(books1[0].title, self.book1.title)
        self.assertEqual(books1[1].title, self.book3.title)
        self.assertEqual(len(books2), 2)
        self.assertEqual(books2[0].title, self.book1.title)
        self.assertEqual(books2[1].title, self.book2.title)
        self.assertEqual(len(books3), 2)
        self.assertEqual(books3[0].title, self.book2.title)
        self.assertEqual(books3[1].title, self.book3.title)
        # Проверяем что количество книг с двумя жанрами - 1 и это нужная книга
        self.assertEqual(len(books12), 1)
        self.assertEqual(books12[0].title, self.book1.title)
        self.assertEqual(len(books13), 1)
        self.assertEqual(books13[0].title, self.book3.title)
        self.assertEqual(len(books23), 1)
        self.assertEqual(books23[0].title, self.book2.title)
        # Проверяем что количество книг с тремя жанрами - 0
        self.assertEqual(len(books123), 0)

    def test_sort_tags(self):
        books1 = Book.objects.filter(tags=self.tag1)
        books2 = Book.objects.filter(tags=self.tag2)
        books3 = Book.objects.filter(tags=self.tag3)
        books12 = books1.intersection(books2)
        books13 = books1.intersection(books3)
        books23 = books2.intersection(books3)
        books123 = books12.intersection(books3)
        # Проверяем что количество книг с одним тегом - 2 и это нужные книга
        self.assertEqual(len(books1), 2)
        self.assertEqual(books1[0].title, self.book1.title)
        self.assertEqual(books1[1].title, self.book3.title)
        self.assertEqual(len(books2), 2)
        self.assertEqual(books2[0].title, self.book1.title)
        self.assertEqual(books2[1].title, self.book2.title)
        self.assertEqual(len(books3), 2)
        self.assertEqual(books3[0].title, self.book2.title)
        self.assertEqual(books3[1].title, self.book3.title)
        # Проверяем что количество книг с двумя тегами - 1 и это нужная книга
        self.assertEqual(len(books12), 1)
        self.assertEqual(books12[0].title, self.book1.title)
        self.assertEqual(len(books13), 1)
        self.assertEqual(books13[0].title, self.book3.title)
        self.assertEqual(len(books23), 1)
        self.assertEqual(books23[0].title, self.book2.title)
        # Проверяем что количество книг с тремя тегами - 0
        self.assertEqual(len(books123), 0)