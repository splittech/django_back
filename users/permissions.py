from rest_framework import permissions
from rest_framework.permissions import AllowAny


class IsLibrarian(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='Librarians').exists()


class CustomLoginPermission(AllowAny):
    pass


class CustomRegistrationPermission(AllowAny):
    pass