# from django.db import models
#
#
# class Product(models.Model):
#     product_id = models.CharField(max_length=20, unique=True, verbose_name="ID", primary_key=True, db_index=True)
#     market_place = models.CharField(max_length=50, verbose_name="Market Place", default="Kaspi")
#     name = models.CharField(max_length=255, verbose_name="Название", default="Name")
#     price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена", default=0)
#     description = models.TextField(blank=True, verbose_name="Характеристики и описание", default="описание")
#     category = models.CharField(max_length=255, verbose_name="Категория", default="Категория")
#     sub_category = models.CharField(max_length=255, verbose_name="Под Категория", default="Под Категория")
#     image_url = models.URLField(max_length=500, verbose_name="Фото", default="Photo")
#     product_url = models.URLField(max_length=500, verbose_name="Сылка", default="Link")
#
#     def __str__(self):
#         return f"{self.name} - {self.price}Тг"
