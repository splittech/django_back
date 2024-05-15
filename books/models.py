from django.db import models
from datetime import date

from django.urls import reverse


class Tag(models.Model):
    """Теги"""
    name = models.CharField("Тег", max_length=150)
    #description = models.TextField("Описание")
    url = models.SlugField(max_length=160, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тег"
        verbose_name_plural = "Теги"


class Author(models.Model):
    """Авторы"""
    name = models.CharField("Имя", max_length=100)
    #age = models.PositiveSmallIntegerField("Возраст", default=0)
    #description = models.TextField("Описание")
    #image = models.ImageField("Изображение", upload_to="actors/")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('actor_detail', kwargs={"slug": self.name})

    class Meta:
        verbose_name = "Автор"
        verbose_name_plural = "Авторы"


class Genre(models.Model):
    """Жанры"""
    name = models.CharField("Жанр", max_length=100)
    #description = models.TextField("Описание")
    url = models.SlugField(max_length=160, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Жанр"
        verbose_name_plural = "Жанры"


class Book(models.Model):
    """Книги"""
    title = models.CharField("Название", max_length=100)
    description = models.TextField("Описание")
    #year = models.PositiveSmallIntegerField("Дата выхода", default=2019)
    genres = models.ManyToManyField(Genre, verbose_name="Жанры")
    tags = models.ManyToManyField(Tag, verbose_name="Теги")
    author = models.ForeignKey(
        Author, verbose_name="Автор", on_delete=models.SET_NULL, null=True
    )
    url = models.SlugField(max_length=130, unique=True)
    draft = models.BooleanField("Черновик", default=False)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("book_detail", kwargs={"slug": self.url})

    def get_review(self):
        return self.reviews_set.filter(parent__isnull=True)

    class Meta:
        verbose_name = "Книга"
        verbose_name_plural = "Книги"


class BookCopy(models.Model):
    """Книги"""
    book = models.ForeignKey(
        Book, verbose_name="Книга", on_delete=models.SET_NULL, null=True
    )
    takenTime = models.DateTimeField(null=True, editable=False)
    returnTime = models.DateTimeField(null=True, editable=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Книга"
        verbose_name_plural = "Книги"

class Review(models.Model):
    """Отзывы"""
    rating = models.IntegerField()
    name = models.CharField("Имя", max_length=100)
    text = models.TextField("Сообщение", max_length=5000)
    parent = models.ForeignKey(
        'self', verbose_name="Родитель", on_delete=models.SET_NULL, blank=True, null=True
    )
    book = models.ForeignKey(Book, verbose_name="Книга", on_delete=models.CASCADE, related_name="reviews")

    def __str__(self):
        return f"{self.name} - {self.movie}"

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
