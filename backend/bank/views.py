from django.shortcuts import render
from django.contrib.auth.models import User, Group
from bank.models import Branch, Customer, Product, Account
from rest_framework import viewsets, permissions
from bank.serializers import UserSerializer, GroupSerializer, BranchSerializer, CustomerSerializer, ProductSerializer, AccountSerializer

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

class BranchViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Branch.objects.all().order_by('id')
    serializer_class = BranchSerializer

    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    # serializer_class = BranchSerializer

    # def get_queryset(self):
    #     return self.request.user.branches.all()
    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)

class CustomerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Customer.objects.all().order_by('id')
    serializer_class = CustomerSerializer

class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer

class AccountViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Account.objects.all().order_by('id')
    serializer_class = AccountSerializer