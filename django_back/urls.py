"""
URL configuration for django_back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView

from users.views import CustomRegisterView, CustomAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),

    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/login/', CustomAuthToken.as_view(), name='auth-token-login'),

    path('auth/users/', CustomRegisterView.as_view(), name='auth-user-register'),

    path('api-auth/', include('rest_framework.urls')),

    path('ckeditor/', include('ckeditor_uploader.urls')),

    path('auth/', include('dj_rest_auth.urls')),

    path('auth/', include('djoser.urls')),

    path('auth/', include('djoser.urls.authtoken')),

    path('auth/', include('djoser.urls.jwt')),

    path('api/v1/books', include('books.urls')),

    path('api/v1/news', include('news.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
