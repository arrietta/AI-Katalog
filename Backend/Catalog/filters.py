import django_filters
from .models import Product, Marketplace


class ProductFilter(django_filters.FilterSet):


    class Meta:
        model = Product
        fields = {
            'id': ['exact', 'in'],
            'brand_name': ['exact', 'in'],
            'sub_category': ['exact', 'in'],
        }


class MarketplaceFilter(django_filters.FilterSet):
    class Meta:
        model = Marketplace
        fields = {
            'price': ['gte', 'lte'],
        }
