from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, CustomUserCreateSerializer, CustomUserSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsLibrarian
from rest_framework.authentication import SessionAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework.settings import api_settings
from rest_framework import status
from rest_framework.authtoken.models import Token

User = get_user_model()


class LibrarianViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(groups__name='Librarians')
    serializer_class = CustomUserSerializer
    permission_classes = [IsLibrarian]


class ReaderViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(groups__name='Readers')
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]


class CustomAuthToken(ObtainAuthToken):
    permission_classes = [AllowAny]
    serializer_class = CustomUserSerializer
    authentication_classes = [SessionAuthentication]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})


class CustomRegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [SessionAuthentication]
    serializer_class = CustomUserCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)