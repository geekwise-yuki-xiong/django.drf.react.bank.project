from django.shortcuts import render
from django.contrib.auth.models import User, Group
from accounts.serializers import UserSerializer, GroupSerializer, PasswordSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class PasswordAPIView(APIView):
    def get_object(self, username):
        user = get_object_or_404(User, username=username)
        return user

    def put(self, request):
        serializer = PasswordSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.data['username']
            user = self.get_object(username)
            new_password = serializer.data['password']
            is_same_as_old = user.check_password(new_password)
            if is_same_as_old:
                """
                old password and new passwords should not be the same
                """
                return Response({"password": ["It should be different from your last password."]},
                                status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)
            user.save()
            return Response({'success':True})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)