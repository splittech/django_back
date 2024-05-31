from django.urls import path

from books.views import BookListView, BookDetailView, ReviewCreateView, TagsListView, GenresListView, \
    CollectionsListView, PinBookView, UsersListView, AuthorsListView

urlpatterns = [
    path("/<int:pk>/", BookDetailView.as_view()),
    path("/", BookListView.as_view()),
    path("/tops", GenresListView.as_view()),
    path("/collections", CollectionsListView.as_view()),
    path("/pinbook", PinBookView.as_view()),
    path("/genres", GenresListView.as_view()),
    path("/tags", TagsListView.as_view()),
    path("/authors", AuthorsListView.as_view()),
    path("/reviews/create", ReviewCreateView.as_view()),
    path("/readers", UsersListView.as_view()),
]
