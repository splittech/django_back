from django.db import models
from django.contrib.auth.models import AbstractUser

from books.models import Book


class User(AbstractUser):
    avatar = models.ImageField(upload_to='uploads/', blank=True, default='default_images/avatarka.jpg')
    books = models.ManyToManyField(Book, null=True, blank=True)

    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'avatar', 'books', 'groups']

