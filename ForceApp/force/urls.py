from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("calculation/<int:project_num>", views.calculation, name="calculation"),

    # API Routes
    path("projects/<str:query>", views.projects, name="projects"),
    path("new_project", views.new_project, name="new_project"),
    path("parameter/<str:item>/<int:value>", views.parameter, name="parameter"),
    path("result/<int:value>", views.result, name="result")

]