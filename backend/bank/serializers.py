from django.contrib.auth.models import User, Group
from rest_framework import serializers
from bank.models import Branch, Customer, Account, Product

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']

class BranchSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Branch
        fields = ['id', 'bank_name', 'location']
        paginate_by = 50
        ordering = ['-id']

class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'phone', 'address']
        paginate_by = 50
        ordering = ['-id']

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'product_name', 'product_owner']
        paginate_by = 50
        ordering = ['-id']

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'bank_partner', 'holder', 'balance']
        paginate_by = 50
        ordering = ['-id']
