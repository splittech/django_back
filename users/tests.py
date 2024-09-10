from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import Group
from users.models import User


class LogInTestCase(APITestCase):
    def setUp(self):
        # Создаем группы
        self.librarians_group, created = Group.objects.get_or_create(name='Librarians')
        self.readers_group, created = Group.objects.get_or_create(name='Readers')

        # Создаем пользователя и добавляем его в группу библиотекарей
        self.reader_user = User.objects.create_user(
            username='librarian',
            password='testpassword',
            email='librarian@example.com'
        )
        self.reader_user.groups.add(self.librarians_group)

        # Получаем токен для библиотекаря через запрос
        response = self.client.post('/auth/token/login/',
                                    {'username': self.reader_user.username, 'password': 'testpassword'})
        self.token = response.data['auth_token']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)

    def test_log_in(self):
        # Устанавливаем заголовок авторизации
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        # Отправляем запрос к API для получения списка читателей
        response = self.client.get('http://127.0.0.1:8000/api/v1/books/readers')
        # Проверяем статус ответа
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class RegisterTestCase(APITestCase):
    def setUp(self):
        # Параметры пользователя
        self.username = 'user123'
        self.email = 'example@mail.com'
        self.password = 'x9p4wlVy'
        self.first_name = 'Владимир'
        self.last_name = 'Василенко'

        # Создаем группы
        self.readers_group, created = Group.objects.get_or_create(name='Librarians')
        self.readers_group, created = Group.objects.get_or_create(name='Readers')

    def test_registration(self):
        # Отправляем запрос к API для регистрации читателя
        response = self.client.post('/auth/users/',
                                    {
                                        'username': self.username,
                                        'email': self.email,
                                        'password': self.password,
                                        'first_name': self.first_name,
                                        'last_name': self.last_name
                                    })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.filter(username=self.username)
        self.assertEqual(user[0].username, self.username)
        self.assertEqual(user[0].email, self.email)
        self.assertEqual(user[0].password, self.password)
        self.assertEqual(user[0].first_name, self.first_name)
        self.assertEqual(user[0].last_name, self.last_name)



