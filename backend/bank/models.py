from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

# Create your models here.

class Branch(models.Model):
    class Meta:
        verbose_name_plural = 'branches'

    bank_name = models.CharField(max_length=300)
    location = models.CharField(max_length=300)
    owner = models.ForeignKey(
        User,
        related_name="owner",
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return(f"{self.bank_name} | {self.location}")

class Customer(models.Model):
    name = models.CharField(max_length=300)
    email = models.EmailField(max_length=300)
    phone = models.CharField(max_length=300)
    address = models.CharField(max_length=300)

    def __str__(self):
        return(f"{self.name} | {self.email}")

class Product(models.Model):
    product_name = models.CharField(max_length=300)
    product_owner = models.CharField(max_length=300)
    
    def __str__(self):
        return(f"{self.product_owner} >> {self.product_name}")

class Account(models.Model):
    bank_partner = models.CharField(max_length=300)
    holder = models.CharField(max_length=300)
    balance = models.DecimalField(max_digits=15, decimal_places=2, validators=[MinValueValidator(0)])

    def __str__(self):
        return(f"{self.holder} | {self.bank_partner} | Balance: ${self.balance}")
