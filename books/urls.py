from django.urls import path

from books.views import BookListView, BookDetailView, ReviewCreateView, TagsListView, GenresListView, AuthorsListView

urlpatterns = [
    path("/<int:pk>/", BookDetailView.as_view()),
    path("/", BookListView.as_view()),
    path("/genres", GenresListView.as_view()),
    path("/tags", TagsListView.as_view()),
    path("/authors", AuthorsListView.as_view()),
    path("/reviews", ReviewCreateView.as_view())
]
