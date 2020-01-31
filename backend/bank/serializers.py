from rest_framework import serializers
from bank.models import Branch, Customer, Account, Product

class BranchSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Branch
        # fields = '__all__'
        fields = ['id', 'bank_name', 'location']

class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'phone', 'address']

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'product_name', 'product_owner']

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'bank_partner', 'holder', 'balance']
