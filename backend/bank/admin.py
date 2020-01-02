from django.contrib import admin
from bank.models import Branch, Customer, Account, Product

# Register your models here.

admin.site.register((
    Customer,
    Account,
    Product,
))

class ProductInline(admin.StackedInline):
    model = Product

class AccountInline(admin.StackedInline):
    model = Account

@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    inlines = [ProductInline, AccountInline]