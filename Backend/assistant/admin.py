# from django.contrib import admin
# from .models import Product
#
#
# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ("product_id", "name", "price", "market_place", "category", "sub_category")
#     list_filter = ("market_place", "category", "sub_category")
#     search_fields = ("product_id", "name", "description", "category", "sub_category")
#     ordering = ("-price",)
#     readonly_fields = ("product_url", "image_url")
#     fieldsets = (
#         (None, {
#             "fields": ("product_id", "name", "price", "description")
#         }),
#         ("Категории", {
#             "fields": ("category", "sub_category")
#         }),
#         ("Доп. информация", {
#             "fields": ("market_place", "image_url", "product_url")
#         }),
#     )
