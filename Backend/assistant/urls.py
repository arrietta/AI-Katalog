from django.urls import path, include
from rest_framework import routers

from assistant.views import chat_view

# router = routers.DefaultRouter()
# router.register(r'products', ProductViewSet)


urlpatterns = [
    # path('api/', include(router.urls)),
    path("", chat_view, name="chat"),

]