from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import Group
from users.models import User


class SimpleAPITests(APITestCase):
    def setUp(self):
        # Получаем или создаем группу "Readers"
        self.readers_group, created = Group.objects.get_or_create(name='Readers')

        # Создаем пользователя и добавляем его в группу "Readers"
        self.reader_user = User.objects.create_user(
            username='reader',
            password='testpassword',
            email='reader@example.com'
        )
        self.reader_user.groups.add(self.readers_group)

        # Получаем токен для аутентификации
        self.token = self.get_token(self.reader_user)

    def get_token(self, user):
        # Получаем JWT токен для пользователя
        response = self.client.post('/auth/jwt/create/', {'username': user.username, 'password': 'testpassword'})
        return response.data['access']

    def test_get_readers_list(self):
        # Устанавливаем заголовок авторизации
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        # Отправляем запрос к API для получения списка читателей
        response = self.client.get('http://127.0.0.1:8000/api/v1/books/readers')
        # Проверяем статус ответа
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Проверяем, что список читателей не пуст
        self.assertGreater(len(response.data), 0)

# def test_get_librarians_list(self):
# # Устанавливаем заголовок авторизации
# self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
#
# # Отправляем запрос к API для получения списка библиотекарей
# response = self.client.get('/api/v1/users/librarians/')
#
# # Проверяем статус ответа
# self.assertEqual(response.status_code, status.HTTP_200_OK)
#
# # Проверяем, что список библиотекарей не пуст
# self.assertGreater(len(response.data), 0)
