from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

import math
import numpy as np
import unicodedata as ud

latin_letters= {}

def is_latin(chr):
    return 'LATIN' in ud.name(chr)

""" Math trigonometric functions """
def cos(deg):
    """ take as input deg convert it to rad and return cos(rad) """
    return math.cos(deg*math.pi/180)
def sin(deg):
    """ take as input deg convert it to rad and return sin(rad) """
    return math.sin(deg*math.pi/180)
def tan(deg):
    """ take as input deg convert it to rad and return tan(rad) """
    return math.tan(deg*math.pi/180)

class User(AbstractUser):
    pass

class Mail(models.Model):

    timestamp = models.DateTimeField(auto_now_add=True)

    sender = models.ForeignKey("User", on_delete=models.CASCADE, related_name="emails_sent")
    recipients = models.ManyToManyField("User", related_name="emails_received", blank=True)

    subject = models.CharField(max_length=255)
    body = models.TextField(blank=True)
    

    def serialize(self):
        return {
            "id": self.id,

            # user object or list of objects
            "user_objs": {
                "sender": {
                    "username": self.sender.username,
                    "email": self.sender.email,
                },
                "recipients": {i: user.email for i, user in enumerate(self.recipients.all())},
            },

            # text fields
            "text": {
                "subject": self.subject,
                "body": self.body,
            },

            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
        }
    def __str__(self):
        return f"{self.id}: ({self.sender}) subject - {self.subject}"

class Flag(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_flags")
    mail = models.ForeignKey("Mail", on_delete=models.CASCADE, related_name="mail_flags")

    read = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)

    def serialize(self):
        return {
            "id": self.mail.id,

            # user object or list of objects
            "user_objs": {
                "sender": {
                    "username": self.mail.sender.username,
                    "email": self.mail.sender.email,
                },
                "recipients": {i: user.email for i, user in enumerate(self.mail.recipients.all())},
            },

            # text fields
            "text": {
                "subject": self.mail.subject,
                "body": self.mail.body,
            },

            "timestamp": self.mail.timestamp.strftime("%b %d %Y, %I:%M %p"),

            "read": self.read,
            "archived": self.archived
        }

    def __str__(self):
        if self.read:
            read = 'read'
        else:
            read = 'unread'

        if self.archived:
            box = 'archived'
        else: 
            box = 'inbox'

        return f"Mail \"{self.mail.subject}\" for ({self.user}) is {read} in {box}."

""" Project fields validation """
def validate_project_number(value):

    if len(value) != 6:
        raise ValidationError(
            'The first symbol should be a capital latin letter and next five - digits', code='invalid'
            )
    else:
        chr = value[0]
        num = value[1:]

        if not is_latin(chr) or \
        not chr.isalpha() or \
        'SMALL' in ud.name(chr):

            raise ValidationError(
                'The first symbol should be a capital latin letter', code='invalid'
                )

        if not num.isdigit():
            raise ValidationError(
                'All symbols after first letter should be digits', code='invalid'
                )

def validate_assembly_number(value):

    if len(value) != 8 or \
       not value.isdigit():
        raise ValidationError(
            'The number should comprise of 8 digits', code='invalid'
            )

class Project(models.Model):

    timestamp = models.DateTimeField(auto_now_add=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_projects")

    project_number = models.CharField(max_length=6, unique=True, 
                                    validators=[validate_project_number])
                                    
    project_name = models.CharField(max_length=255)
    assembly_number = models.CharField(max_length=8, validators=[validate_assembly_number])


    def __str__(self):
        return f"{self.project_number} {self.project_name}. {self.assembly_number}"

    def serialize(self):
        timestamp = self.timestamp.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,

            # user object or list of objects
            "user_objs": {
                "user": {
                    "username": self.user.username,
                    "email": self.user.email,
                }
            },
            
            # text fields
            "text": {
                "project_number": self.project_number,
                "project_name": self.project_name,
                "assembly_number": self.assembly_number,
            },

            "timestamp": timestamp,
        }
""" Contact and plunger fields validation"""

def validate_fractional(value):
    if value < 0 or value > 1:
        raise ValidationError(
            'This value should be positive fraction.'
            )

def validate_positive(value):
    if value <= 0:
        raise ValidationError(
            'This value should be positive.'
            )

class Contact(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    contact_key = models.CharField(max_length=255)

    mu = models.FloatField(validators=[validate_fractional])
    contactCoord_X = models.FloatField()
    contactCoord_Y = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="contacts")

    def __str__(self):
        return f"{self.contact_key}"

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "key": self.contact_key,
            "var1": self.mu,
            "var2": self.contactCoord_X,
            "var3": self.contactCoord_Y,
            "datetime": datetime,
        }

class Plunger(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    plunger_key = models.CharField(max_length=255)

    a = models.FloatField(validators=[validate_positive])
    b = models.FloatField(validators=[validate_positive])
    f = models.FloatField(validators=[validate_fractional])
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="plungers")

    def __str__(self):
        return f"{self.plunger_key}"

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "key": self.plunger_key,
            "var1": self.a,
            "var2": self.b,
            "var3": self.f,
            "datetime": datetime,
        }
    
class Spring(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    spring_key = models.CharField(max_length=255)

    springStiff = models.FloatField(validators=[validate_positive])
    freeLen = models.FloatField(validators=[validate_positive])
    springLen = models.FloatField(validators=[validate_positive])
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="springs")

    def __str__(self):
        return f"{self.spring_key}"

    def load(self):
        return self.springStiff*(self.freeLen - self.springLen)

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "key": self.spring_key,
            "var1": self.springStiff,
            "var2": self.freeLen,
            "var3": self.springLen,
            "datetime": datetime,
        }

""" Angles fields validation """

def plungerFric_validation(value):
    if value != 0 and value != 180:
        raise ValidationError(
            'This value should be 0 or 180 deg.'
            )

def validate_contact_angle(value):
    if value < 90 or value > 270:
        raise ValidationError(
            'This value should be from 90 to 270 deg.'
            )

class Angles(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    angles_key = models.CharField(max_length=255)

    plungerFric = models.FloatField(validators=[plungerFric_validation])
    N = models.FloatField(validators=[validate_contact_angle])
    FN = models.FloatField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="angles")

    def __str__(self):
        return f"{self.angles_key}"

    def serialize(self):
        datetime = self.datetime.strftime("%b %d, %Y, %H:%M %p")
        return {
            "id": self.id,
            "key": self.angles_key,
            "var1": self.plungerFric,
            "var2": self.N,
            "var3": self.FN,
            "datetime": datetime,
        }

class calc_forces:

    # plungerFric - direction of friction forces in plunger,
    # load - load of the spring, 
    # a - beam for B-C, 
    # b - beam for A-B, 
    # f - friction coefficient in plunger, 
    # mu - friction coefficient in contact, 
    # N - normal reaction direction, 
    # FN - normal friction force direction

    # Example:
        # Solve the system of equations x0 + 2 * x1 = 1 and 3 * x0 + 5 * x1 = 2:
        # a = np.array([[1, 2], [3, 5]])
        # b = np.array([1, 2])
        # x = np.linalg.solve(a, b)
        # output: array([-1.,  1.])
        # np.allclose(np.dot(a, x), b)
        # output: True

    # All elements in 3-elem list ordered corresponding to joints. 0th - A, 1st - B, 2nd - C


    def __init__(self, plungerFric, load, a, b, f, mu, N, FN):

        self.load = load
        self.a = a
        self.b = b
        self.f = f
        self.mu = mu

        self.ALPHA_REACTION = [
            90, 270, N
        ]

        self.ALPHA_FRICTION = [
            plungerFric, plungerFric, FN
        ]

    def __str__(self):
        call = {
            "Na_direction": self.ALPHA_REACTION[0],
            "Nb_direction": self.ALPHA_REACTION[1],
            "NR_direction": self.ALPHA_REACTION[2],

            "Na_friction_direction": self.ALPHA_FRICTION[0],
            "Nb_friction_direction": self.ALPHA_FRICTION[1],
            "NR_friction_direction": self.ALPHA_FRICTION[2],

            "Na": self.X[0],
            "Nb": self.X[1],
            "NR": self.X[2],
        }
        return str(call)

    def solver(self):

        self.A = np.array([
            [
                self.f * cos( self.ALPHA_FRICTION[0] ),
                self.f * cos( self.ALPHA_FRICTION[1] ),
                cos( self.ALPHA_REACTION[2] ) + self.mu * cos( self.ALPHA_FRICTION[2] )
            ],
            [
                sin( self.ALPHA_REACTION[0] ), 
                sin( self.ALPHA_REACTION[1] ), 
                sin( self.ALPHA_REACTION[2] ) + self.mu * sin( self.ALPHA_FRICTION[2] ) 
            ],
            [ 
                (self.a + self.b),
                (self.a),
                0
            ]
        ])

        self.B = np.array(
            [ self.load, 0, 0 ]
        )

        self.X = np.linalg.solve(self.A, self.B)

    def corrected_forces(self):

        if np.sign(self.X[0]) == -1 and np.sign(self.X[1]) == 1:
            self.ALPHA_REACTION[0] = 270
            self.ALPHA_REACTION[1] = 90
        
        call = {
            "Na_direction": self.ALPHA_REACTION[0],
            "Nb_direction": self.ALPHA_REACTION[1],
            "NR_direction": self.ALPHA_REACTION[2],

            "Na_friction_direction": self.ALPHA_FRICTION[0],
            "Nb_friction_direction": self.ALPHA_FRICTION[1],
            "NR_friction_direction": self.ALPHA_FRICTION[2],

            "Na": self.X[0],
            "Nb": self.X[1],
            "NR": self.X[2],
        }

        return call

class calc_torque:

    def __init__(self, x, y, F, alpha):
        self.x = x
        self.y = y
        self.F = F
        self.alpha = alpha

    def __str__(self):
        return f"{round(self.torque, 3)} N*mm"

    def solver(self):
        self.torque = np.cross(
            [self.x,                   self.y                  , 0],
            [self.F * cos(self.alpha), self.F * sin(self.alpha), 0]
        )

        return self.torque[2]
    
    def intersection(self):

        self.delta = self.alpha + 90
        k_ = tan(self.delta)
        k__ = tan(self.alpha)

        x_intersect = (self.y - k__ * self.x)/(k_ - k__)
        y_intersect = k_ * x_intersect
        
        return {"X": x_intersect, "Y": y_intersect}
