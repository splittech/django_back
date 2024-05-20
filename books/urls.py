from django.urls import path

from books.views import BookListView, BookDetailView, ReviewCreateView


urlpatterns = [
    path("/<int:pk>/", BookDetailView.as_view()),
    path("/", BookListView.as_view()),
    path("/reviews", ReviewCreateView.as_view())
]
