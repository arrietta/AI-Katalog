from django.urls import path

from web import views

urlpatterns = [
    path("profile/", views.UserProfileView.as_view(), name="user-profile"),
]