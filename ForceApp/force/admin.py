from django.contrib import admin
from .models import *

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    filter_horizontal = ("user_permissions",)
    list_display = ("id", "username", "last_login",
                    "first_name", "last_name", 
                    "email", "is_staff", "is_superuser",
                    "is_active", "date_joined")

admin.site.register(Project)
admin.site.register(Contact)
admin.site.register(Plunger)
admin.site.register(Spring)
admin.site.register(Angles)
admin.site.register(Unknown_variables)

