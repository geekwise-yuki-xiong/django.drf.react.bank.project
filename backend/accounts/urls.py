from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, PermissionAPI, AllPermissionsAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/permissions', PermissionAPI.as_view()),
    path('api/auth/all-permissions', AllPermissionsAPI.as_view())
]