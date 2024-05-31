from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import serializers

from books.serializers import BookListSerializer
from users.models import User
# serializers.py
from djoser.serializers import UserSerializer as DjoserUserSerializer
from djoser.serializers import UserCreateSerializer


Userr = get_user_model()


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"


class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = Userr
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        #fields = '__all__'


class CustomUserSerializer(DjoserUserSerializer):
    books = BookListSerializer(many=True)
    groups = GroupSerializer(many=True)
    class Meta(DjoserUserSerializer.Meta):
        model = Userr
        fields = ('username')
        #fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    books = BookListSerializer(many=True)
    groups = GroupSerializer(many=True)

    class Meta:
        model = Userr
        #fields = ('username')
        fields = '__all__'


class UsersListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userr
        fields = ('id', 'first_name', 'last_name')
        #fields = '__all__'
