from django.urls import path
from .views import register_user, login_user

urlpatterns = [
    # Clean endpoints matching frontend axios workflow routes precisely
    path('register/', register_user, name='register_api_node'),
    path('login/', login_user, name='login_api_node'),
]