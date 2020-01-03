from django.contrib import admin
from bank.models import Branch, Customer, Account, Product

# Register your models here.

admin.site.register((
    Branch,
    Customer,
    Account,
    Product,
))