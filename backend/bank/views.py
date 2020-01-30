from django.shortcuts import render
from bank.models import Branch, Customer, Product, Account
from rest_framework import viewsets, permissions
from bank.serializers import BranchSerializer, CustomerSerializer, ProductSerializer, AccountSerializer


# Create your views here.
class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all().order_by('id')
    # serializer_class = BranchSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = BranchSerializer

    def get_queryset(self):
        return self.request.user.owner.all()
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

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