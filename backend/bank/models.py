from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

# Create your models here.

class Branch(models.Model):
    class Meta:
        verbose_name_plural = 'branches'

    bank_name = models.CharField(max_length=300)
    location = models.CharField(max_length=300)

    def __str__(self):
        return(f"{self.bank_name}")

class Customer(models.Model):
    name = models.CharField(max_length=300)
    email = models.EmailField(max_length=300)
    phone = models.CharField(max_length=300)
    address = models.CharField(max_length=300)

    def __str__(self):
        return(f"{self.name} | {self.email}")

class Product(models.Model):
    options = (
        ('savings', 'SAVINGS'),
        ('checking', 'CHECKING'),
        ('credit-line', 'CREDIT-LINE'),
        ('debit-line', 'DEBIT-LINE'),
        ('loans', 'LOANS'),
    )
    product_options = models.CharField(
        max_length=300,
        choices=options,
        default=options[0],
    )

    product_owner = models.ForeignKey(
        Branch,
        on_delete=models.CASCADE,
    )
    
    def __str__(self):
        return(f"{self.product_owner} | {self.product_options}")

class Account(models.Model):
    bank_partner = models.ForeignKey(
        Branch,
        on_delete=models.CASCADE,
    )
    holder = models.OneToOneField(
        Customer,
        on_delete=models.CASCADE,
    )

    balance = models.DecimalField(max_digits=15, decimal_places=2, validators=[MinValueValidator(0)])

    def __str__(self):
        return(f"{self.holder.name} | Balance: ${self.balance}")
