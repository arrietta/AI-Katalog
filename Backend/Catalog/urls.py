from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ProductViewSet, MarketplaceViewSet, FavoriteViewSet, ReviewViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'marketplaces', MarketplaceViewSet)
router.register(r'favorites', FavoriteViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
