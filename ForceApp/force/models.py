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

    project_number = models.CharField(max_length=6, primary_key=True)
    project_name = models.CharField(max_length=255)
    assembly_number = models.CharField(max_length=8)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_projects")

    def __str__(self):
        return f"{self.project_number} {self.project_name}. {self.assembly_number}"

    def serialize(self):
        datetime = self.datetime.strftime("%d/%m/%Y %H:%M:%S")
        return {
            "id": self.id,
            "user": [self.user.email, self.user.username],
            "project_number": self.project_number,
            "project_name": self.project_name,
            "assembly_number": self.assembly_number,
            "datetime": datetime,
        }

class Contact(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    key = models.CharField(max_length=255, primary_key=True)

    mu = models.FloatField()
    contactCoord_X = models.FloatField()
    contactCoord_Y = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_contacts")

    def __str__(self):
        return f"{self.description}"

class Plunger(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    key = models.CharField(max_length=255, primary_key=True)

    a = models.FloatField()
    b = models.FloatField()
    f = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_plungers")

    def __str__(self):
        return f"{self.description}"

    def is_valid_plunger(self):
        return round(self.a, 5) > 0 and round(self.b, 5) > 0

class Spring(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    key = models.CharField(max_length=255, primary_key=True)

    springStiff = models.FloatField()
    freeLen = models.FloatField()
    springLen = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_springs")

    def __str__(self):
        return f"{self.description}"

    def is_valid_spring(self):
        return round(self.freeLen, 5) > round(self.springLen, 5)

    def force(self):
        return self.springStiff*(self.freeLen - self.springLen)

class Angles(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    key = models.CharField(max_length=255, primary_key=True)

    plungerFric = models.FloatField()
    N = models.FloatField()
    FN = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_angles")

    def __str__(self):
        return f"{self.description}"

    def is_valid_angle(self):
        return round(self.N, 5) - 90 == round(self.FN, 5) or round(self.N, 5) + 90 == round(self.FN, 5)

class Variables(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    key = models.CharField(max_length=255, primary_key=True)

    Na = models.FloatField()
    Nb = models.FloatField()
    N = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_variables")

    def __str__(self):
        return f"{self.description}"

    def calc_vars(Pl_F_tr_angle, F, a, b, f, mu, N_angle, F_tr_angle):

        M1 = np.array([[f*cos(Pl_F_tr_angle), f*cos(Pl_F_tr_angle), cos(N_angle)+mu*cos(F_tr_angle)],
                            [-1,              1,              sin(N_angle)+mu*sin(F_tr_angle)],
                            [a+b,           -a,               0]])
        v1 = np.array([-F, 0, 0])
        c1 = np.linalg.solve(M1, v1)
        return c1
