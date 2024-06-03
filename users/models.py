from django.db import models
from django.contrib.auth.models import AbstractUser

from books.models import Book


class User(AbstractUser):
    avatar = models.ImageField(upload_to='uploads/', blank=True, default='default_images/avatarka.jpg')
    books = models.ManyToManyField(Book, null=True, blank=True, related_name="книги", verbose_name="книги")
    favourites = models.ManyToManyField(Book, null=True, blank=True, verbose_name="Избранное")

    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'avatar', 'books', 'groups']

    def get_review(self):
        return self.reviews_set.filter(parent__isnull=True)

