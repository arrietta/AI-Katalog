from django.shortcuts import render
from rest_framework import viewsets

# from assistant.filters import ProductFilter
# from assistant.models import Product
# from assistant.serializers import ProductSerializer
from django_filters.rest_framework import DjangoFilterBackend


# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_class = ProductFilter  # Используем кастомн
#

def chat_view(request):
    return render(request, 'chat/chat2.html', {'thread': 0})
