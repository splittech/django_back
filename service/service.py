from django.contrib.auth.models import User
from django_filters import rest_framework as filters
from books.models import Book


def get_client_ip(request):
    """Получение IP пользователя"""

    x_forward_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forward_for:
        ip = x_forward_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class BookFilter(filters.FilterSet):
    title = CharFilterInFilter(field_name='title', lookup_expr='in')
    author = CharFilterInFilter(field_name='author__name', lookup_expr='in')
    genres = CharFilterInFilter(field_name='genres__name', lookup_expr='in')
    tags = CharFilterInFilter(field_name='tags__name', lookup_expr='in')

    class Meta:
        model = Book
        fields = ['title', 'genres', 'tags']


# def pin_book(reader_id, book_id):
#     book = Book.objects.get(pk=book_id)
#     bookCopy = BookCopy.filter(book=book)
#
#     reader = User.objects.get(pk=reader_id)
#
#
#     book.update()