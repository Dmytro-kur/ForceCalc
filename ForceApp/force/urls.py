from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("mail", views.mail, name="mail"),
    path("password_change", views.password_change, name="password_change"),
    path("calculation/<int:project_num>", views.calculation, name="calculation"),

    # API Routes
    path("projects/<str:query>", views.projects, name="projects"),
    path("new_project", views.new_project, name="new_project"),
    path("parameter/<str:item>/<int:value>", views.parameter, name="parameter"),
    path("result/<int:project_num>/<int:value>", views.result, name="result"),
    path("check/<int:project_num>/<int:value>", views.check, name="check"),
    path("compose", views.compose, name="compose"),
    path("unread", views.unread, name="unread"),
    path("email/<str:mailbox>/<int:email_id>", views.email, name="email"),
    path("mailbox/<str:mailbox>", views.mailbox, name="mailbox"),

]