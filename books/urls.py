from django.urls import path

from books.views import BookListView, BookDetailView, ReviewCreateView


urlpatterns = [
    path("books/", BookListView.as_view()),
    path("books/<int:pk>/", BookDetailView.as_view()),
    path("reviews", ReviewCreateView.as_view())
]
