from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    
    path("mail", views.mail, name="mail"),
    path("mail/inbox", views.mail, name="mail"),
    path("mail/compose", views.mail, name="mail"),
    path("mail/sent", views.mail, name="mail"),
    path("mail/archived", views.mail, name="mail"),

    path("password_change", views.password_change, name="password_change"),
    path("calculation/<int:project_num>", views.calculation, name="calculation"),

    # API Routes
    path("projects/<str:query>", views.projects, name="projects"),
    path("new_project", views.new_project, name="new_project"),

    # MAIL API Routes
    path("compose", views.compose, name="compose"),
    path("unread", views.unread, name="unread"),
    path("email/<str:mailbox>/<int:email_id>", views.email, name="email"),
    path("mailbox/<str:query>/<str:mailbox>", views.mailbox, name="mailbox"),

    # CALCULATION API Routes
    path("parameter/<str:name>/<int:project_num>", views.parameter, name="parameter"),
    path("result/<int:project_num>/<int:value>", views.result, name="result"),
    # path("check/<int:project_num>/<int:value>", views.check, name="check"),
]