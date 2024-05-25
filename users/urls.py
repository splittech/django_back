from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LibrarianViewSet, ReaderViewSet

router = DefaultRouter()
router.register(r'librarians', LibrarianViewSet)
router.register(r'readers', ReaderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
