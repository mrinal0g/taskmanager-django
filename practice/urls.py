from django.urls import path
from . import views

urlpatterns = [
    path('',views.signup,name='signup'),
    path('login/',views.handle_login,name='login'),
    path('home/',views.home,name='home'),
    path('logout/',views.logout_handle,name='logout'),
]