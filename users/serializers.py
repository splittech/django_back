from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import serializers

from books.serializers import BookListSerializer, ReviewSerializer
# serializers.py
from djoser.serializers import UserSerializer as DjoserUserSerializer
from djoser.serializers import UserCreateSerializer


User = get_user_model()


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"


class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        #fields = '__all__'


class CustomUserSerializer(DjoserUserSerializer):
    books = BookListSerializer(many=True)
    groups = GroupSerializer(many=True)
    class Meta(DjoserUserSerializer.Meta):
        model = User
        fields = ('username')
        #fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    books = BookListSerializer(many=True)
    favourites = BookListSerializer(many=True)
    groups = GroupSerializer(many=True)
    reviews = ReviewSerializer(many=True)

    class Meta:
        model = User
        #fields = ('username')
        fields = '__all__'


class UsersListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name')
        #fields = '__all__'
