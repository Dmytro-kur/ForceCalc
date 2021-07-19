from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

import math
import numpy as np



def cos(deg):
    """take as input deg convert it to rad and return cos(rad)"""
    return math.cos(deg*math.pi/180)

def sin(deg):
    """take as input deg convert it to rad and return sin(rad)"""
    return math.sin(deg*math.pi/180)




def validate_positive(value):
    if value <= 0:
        raise ValidationError('This value should be posotive.')

def validate_fractional(value):
    if value < 0 or value > 1:
        raise ValidationError('This value should be from 0 to 1.')

def validate_contact_angle(value):
    if value < 90 or value > 270:
        raise ValidationError('This value should be from 90 to 270.')

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
    key = models.CharField(max_length=255)

    mu = models.FloatField(validators=[validate_fractional])
    contactCoord_X = models.FloatField()
    contactCoord_Y = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="contacts")

    def __str__(self):
        return f"{self.key}"

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "key": self.key,
            "var1": self.mu,
            "var2": self.contactCoord_X,
            "var3": self.contactCoord_Y,
            "datetime": datetime,
        }

class Plunger(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    key = models.CharField(max_length=255)

    a = models.FloatField(validators=[validate_positive])
    b = models.FloatField(validators=[validate_positive])
    f = models.FloatField(validators=[validate_fractional])
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="plungers")

    def __str__(self):
        return f"{self.key}"

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "key": self.key,
            "var1": self.a,
            "var2": self.b,
            "var3": self.f,
            "datetime": datetime,
        }

class Spring(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    key = models.CharField(max_length=255)

    springStiff = models.FloatField(validators=[validate_positive])
    freeLen = models.FloatField(validators=[validate_positive])
    springLen = models.FloatField(validators=[validate_positive])
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="springs")

    def __str__(self):
        return f"{self.key}"

    def force(self):
        return self.springStiff*(self.freeLen - self.springLen)

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "key": self.key,
            "var1": self.springStiff,
            "var2": self.freeLen,
            "var3": self.springLen,
            "datetime": datetime,
        }

class Angles(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    key = models.CharField(max_length=255)

    plungerFric = models.FloatField()
    N = models.FloatField(validators=[validate_contact_angle])
    FN = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="angles")

    def __str__(self):
        return f"{self.key}"

    # def is_valid_angle(self):
    #     return round(self.N, 5) - 90 == round(self.FN, 5) or round(self.N, 5) + 90 == round(self.FN, 5)

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "key": self.key,
            "var1": self.plungerFric,
            "var2": self.N,
            "var3": self.FN,
            "datetime": datetime,
        }

class Variables(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    key = models.CharField(max_length=255, blank=False)

    Na = models.FloatField()
    Nb = models.FloatField()
    NR = models.FloatField()
    
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="variables")
    
    contact_input = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name="variables")
    plunger_input = models.ForeignKey(Plunger, on_delete=models.CASCADE, related_name="variables")
    spring_input = models.ForeignKey(Spring, on_delete=models.CASCADE, related_name="variables")
    angles_input = models.ForeignKey(Angles, on_delete=models.CASCADE, related_name="variables")
    
    agree = models.BooleanField()

    # Access policy also should be implemented: 
    # - Specialist user only can create project and make a calculations
    # - Designer can change the input but cannot add input
    # Validators for some angles field that restricted values:
    # for positive length for friction angles
    # mobile responsiveness should be worked 
    # (by adding a buttons like zoom up zoom down, moving button)
    # styling (waves on the buttons)
    # Fast feedback when put values in input field
    
    
    def __str__(self):
        return f"{self.key}"

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
            "key": self.key,
            "var1": self.Na,
            "var2": self.Nb,
            "var3": self.NR,
            "datetime": datetime,
            "contact": self.contact_input.serialize(),
            "plunger": self.plunger_input.serialize(),
            "spring": self.spring_input.serialize(),
            "angles": self.angles_input.serialize(),
        }
