from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    avatar = models.ImageField(upload_to='uploads/', blank=True, default='default_images/avatarka.jpg')

    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'avatar']
