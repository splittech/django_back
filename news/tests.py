from django.test import TestCase
from django.urls import reverse, resolve
from rest_framework import status


class CorrectUrlsTestCase(TestCase):
    def setUp(self):
        self.news_url = '/api/v1/news/'
        self.collections_url = '/api/v1/books/collections'
        self.book_list_url = '/api/v1/books/'
        self.readers_url = '/api/v1/books/readers'
        self.account_url = '/auth/users/me'

    def test_news_news_url_resolves(self):
        response = self.client.get(self.news_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get(self.collections_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get(self.book_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get(self.readers_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        response = self.client.get(self.account_url)
        self.assertEqual(response.status_code, status.HTTP_301_MOVED_PERMANENTLY)