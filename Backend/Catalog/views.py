from django.db.models import Min, Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters

from .filters import ProductFilter, MarketplaceFilter
from .models import Product, Marketplace, Favorite, Review
from .pagination import CustomPageNumberPagination
from .serializers import ProductSerializer, MarketplaceSerializer, FavoriteSerializer, ReviewSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = CustomPageNumberPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter



class MarketplaceViewSet(viewsets.ModelViewSet):
    queryset = Marketplace.objects.select_related('product').all()
    serializer_class = MarketplaceSerializer


    def get_queryset(self):
        return Product.objects.annotate(min_price=Min('marketplaces__price'))

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        if isinstance(rep['link'], str):
            rep['link'] = rep['link'].strip('"')
        return rep


class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
