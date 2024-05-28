from rest_framework import permissions


class IsLibrarian(permissions.BasePermission):
    def has_permission(self, request, view):
            return request.user and request.user.groups.filter(name='Librarians').exists()

