from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Project(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)

    project_number = models.CharField(max_length=6, primary_key=True)
    project_name = models.CharField(max_length=255)
    assembly_number = models.CharField(max_length=8)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_projects")

    def __str__(self):
        return f"{self.project_number} {self.project_name}. {self.assembly_number}"


class Contact(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255, primary_key=True)

    contactFric = models.FloatField()
    contactCoord_X = models.FloatField()
    contactCoord_Y = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_contacts")

    def __str__(self):
        return f"{self.description}"

class Plunger(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255, primary_key=True)

    a = models.FloatField()
    b = models.FloatField()
    plungerFric = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_plungers")


    def __str__(self):
        return f"{self.description}"

class Spring(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255, primary_key=True)

    springStiff = models.FloatField()
    freeLen = models.FloatField()
    springLen = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_springs")

    def __str__(self):
        return f"{self.description}"

class Angles(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255, primary_key=True)

    plungerFric = models.FloatField()
    N = models.FloatField()
    FN = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_angles")

    def __str__(self):
        return f"{self.description}"

class Unknown_variables(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255, primary_key=True)

    Na = models.FloatField()
    Nb = models.FloatField()
    N = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_variables")

    def __str__(self):
        return f"{self.description}"
