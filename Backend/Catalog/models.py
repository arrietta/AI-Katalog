from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.IntegerField(default=0, primary_key=True)
    name = models.CharField(max_length=255)
    popularity = models.IntegerField(default=0)
    like_count = models.IntegerField(default=0)
    description = models.CharField(max_length=4096, blank=True)
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    brand_name = models.ForeignKey(Brand, on_delete=models.CASCADE, blank=True, null=True)
    image_url = models.URLField(max_length=500, verbose_name="Фото", default="Photo")

    def __str__(self):
        return self.name


class Marketplace(models.Model):
    id = models.IntegerField(default=0, primary_key=True)
    product = models.ForeignKey(Product, related_name='marketplaces', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    link = models.CharField(max_length=1023, default="")
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} - {self.product.name}"


class Specification(models.Model):
    product = models.ForeignKey(Product, related_name='specifications', on_delete=models.CASCADE)
    key = models.TextField()
    value = models.TextField()


class Favorite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='favorites', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='favorited_by', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"


class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField()
    rating = models.PositiveIntegerField()

    def __str__(self):
        return f"Review by {self.user.username} for {self.product.name}"
