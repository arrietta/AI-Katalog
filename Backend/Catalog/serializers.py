from rest_framework import serializers
from .models import Product, Marketplace, Favorite, Review, Specification, Brand


class MarketplaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marketplace
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields = ['key', 'value']


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):
    marketplaces = serializers.SerializerMethodField()
    reviews = ReviewSerializer(many=True, read_only=True)
    specifications = SpecificationSerializer(many=True, read_only=True)
    brand_name = BrandSerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'popularity', 'like_count', 'marketplaces', 'reviews',
            'description', 'sub_category', 'brand_name', 'image_url', 'specifications'
        ]

    def get_marketplaces(self, obj):
        marketplaces = obj.marketplaces.order_by('price')
        return MarketplaceSerializer(marketplaces, many=True).data


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = '__all__'
