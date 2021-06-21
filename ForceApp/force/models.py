from django.db import models
from django.contrib.auth.models import AbstractUser

import math
import numpy as np

def cos(deg):
    """take as input deg convert it to rad and return cos(rad)"""
    return math.cos(deg*math.pi/180)

def sin(deg):
    """take as input deg convert it to rad and return sin(rad)"""
    return math.sin(deg*math.pi/180)

class User(AbstractUser):
    pass

class Project(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)

    project_number = models.CharField(max_length=6, unique=True)
    project_name = models.CharField(max_length=255)
    assembly_number = models.CharField(max_length=8)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_projects")

    def __str__(self):
        return f"{self.project_number} {self.project_name}. {self.assembly_number}"

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "user": {"username": self.user.username, "email": self.user.email},
            "project_number": self.project_number,
            "project_name": self.project_name,
            "assembly_number": self.assembly_number,
            "datetime": datetime,
        }

class Contact(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    contact_key = models.CharField(max_length=255, unique=True)

    mu = models.FloatField()
    contactCoord_X = models.FloatField()
    contactCoord_Y = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="contacts")

    def __str__(self):
        return f"{self.contact_key}"

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "contact_key": self.contact_key,
            "var1": self.mu,
            "var2": self.contactCoord_X,
            "var3": self.contactCoord_Y,
            "datetime": datetime,
        }

class Plunger(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    plunger_key = models.CharField(max_length=255, unique=True)

    a = models.FloatField()
    b = models.FloatField()
    f = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="plungers")

    def __str__(self):
        return f"{self.plunger_key}"

    def is_valid_plunger(self):
        return round(self.a, 5) > 0 and round(self.b, 5) > 0

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "plunger_key": self.plunger_key,
            "var1": self.a,
            "var2": self.b,
            "var3": self.f,
            "datetime": datetime,
        }

class Spring(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    spring_key = models.CharField(max_length=255, unique=True)

    springStiff = models.FloatField()
    freeLen = models.FloatField()
    springLen = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="springs")

    def __str__(self):
        return f"{self.spring_key}"

    def is_valid_spring(self):
        return round(self.freeLen, 5) > round(self.springLen, 5)

    def force(self):
        return self.springStiff*(self.freeLen - self.springLen)

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "spring_key": self.spring_key,
            "var1": self.springStiff,
            "var2": self.freeLen,
            "var3": self.springLen,
            "datetime": datetime,
        }

class Angles(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    angles_key = models.CharField(max_length=255, unique=True)

    plungerFric = models.FloatField()
    N = models.FloatField()
    FN = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="angles")

    def __str__(self):
        return f"{self.angles_key}"

    def is_valid_angle(self):
        return round(self.N, 5) - 90 == round(self.FN, 5) or round(self.N, 5) + 90 == round(self.FN, 5)

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "angles_key": self.angles_key,
            "var1": self.plungerFric,
            "var2": self.N,
            "var3": self.FN,
            "datetime": datetime,
        }

class Variables(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    variables_key = models.CharField(max_length=255, unique=True)

    Na = models.FloatField()
    Nb = models.FloatField()
    NR = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="variables")

    def __str__(self):
        return f"{self.variables_key}"

    def calc_vars(Pl_F_tr_angle, F, a, b, f, mu, N_angle, F_tr_angle):

        M1 = np.array([[f*cos(Pl_F_tr_angle), f*cos(Pl_F_tr_angle), cos(N_angle)+mu*cos(F_tr_angle)],
                            [-1,              1,              sin(N_angle)+mu*sin(F_tr_angle)],
                            [a+b,           -a,               0]])
        v1 = np.array([-F, 0, 0])
        c1 = np.linalg.solve(M1, v1)
        return c1

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "variables_key": self.variables_key,
            "var1": self.Na,
            "var2": self.Nb,
            "var3": self.NR,
            "datetime": datetime,
        }
