from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsLibrarian, IsReader


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class LibrarianViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(groups__name='Librarians')
    serializer_class = UserSerializer
    permission_classes = [IsLibrarian]


class ReaderViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(groups__name='Readers')
    serializer_class = UserSerializer
    permission_classes = [IsReader]
