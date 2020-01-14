from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, PermissionSerializer
from django.contrib.auth.models import User

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class PermissionAPI(generics.RetrieveAPIView):
    serializer_class = PermissionSerializer

    def get(self, request):
        permissions = User.objects.get(pk=1).get_all_permissions()
        print(User.objects.get(pk=1).user_permissions)
        data = {
            'permissions': permissions
        }
        serializer = PermissionSerializer(data)

        return Response(data)

class AllPermissionsAPI(generics.RetrieveAPIView):
    serializer_class = PermissionSerializer

    def get(self, request):
        
        all_permissions = User(is_superuser=True).get_all_permissions()
        user_permissions = User.objects.get(pk=1).get_all_permissions()
        
        data = {p: p in user_permissions for p in all_permissions}
        return Response(data)