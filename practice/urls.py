from django.urls import path
from . import views

urlpatterns = [
    path('',views.handle_login,name='handle_login'),
    path('logout/',views.logout_handle,name='logout'),
    path('check-auth/',views.checkAuth,name='cheak-auth'),
    path('add-task/',views.addTask,name='add-task'),
    path('sign-up/',views.handle_signup,name='handle_signup'),
    path('get-tasks/', views.getTasks, name='get_tasks'),
    path('update-task/<int:task_id>/', views.updateTask, name='update_task'),
    # delete-task/19
    path('delete-task/<int:task_id>/', views.deleteTask, name='delete_task'),
]
