from django.test import TestCase
from .models import *


class VariablesTestCase(TestCase):

    def setUp(self):

        # create User
        testUser = User.objects.create_user(username="TestUser", 
            email='test@example.com',
            password='0000')

        # create Project
        testProject = Project.objects.create(project_number="P01222",
            project_name="Test Project",
            assembly_number="10100333",
            user=testUser)

        # create Contact
        Contact.objects.create(contact_key="Test Contact 1",
            mu=0.15,
            contactCoord_X=0,
            contactCoord_Y=0,
            project=testProject)

        # create Plunger
        Plunger.objects.create(plunger_key="Test Plunger 1",
            a=0.197,
            b=3.56,
            f=0.15,
            project=testProject)

        # create Spring
        Spring.objects.create(spring_key="Test Spring 1",
            springStiff=4.1,
            freeLen=10.7,
            springLen=8.232,
            project=testProject)

        # create Angles
        Angles.objects.create(angles_key="Test Angles 1",
            plungerFric=0,
            N=215.01,
            FN=305.01,
            project=testProject)
            
    def test_math_model(self):
        
        """Put all variables and solve equations by hand
            [ Ra *f*cos( ALPHA_FRICTION[0] ) Rb *f*cos( ALPHA_FRICTION[1] ) NR *( mu*cos(ALPHA_FRICTION[2]) + cos(ALPHA_REACTION[2]) ) ]
            [ Ra *sin( ALPHA_REACTION[0] )   Rb *sin( ALPHA_REACTION[1] )   NR *( mu*sin(ALPHA_FRICTION[2]) + sin(ALPHA_REACTION[2]) ) ]  =  [F;    0;     0]
            [ Ra *( a+b )                    Rb *a                          NR *0                                                       ]"""

        cont = Contact.objects.get(contact_key="Test Contact 1")
        plng = Plunger.objects.get(plunger_key="Test Plunger 1")
        sprg = Spring.objects.get(spring_key="Test Spring 1")
        angl = Angles.objects.get(angles_key="Test Angles 1")

        ALPHA_REACTION = [
            90, 270, angl.N
        ]

        ALPHA_FRICTION = [
            angl.plungerFric, angl.plungerFric, angl.FN
        ]

        LOAD = sprg.springStiff*(sprg.freeLen - sprg.springLen)

        RES = calc_forces(angl.plungerFric, LOAD, plng.a, plng.b, plng.f, cont.mu, angl.N, angl.FN)
        RES.solver()

        self.assertEqual(
            round(
                RES.X[0] *plng.f*cos( ALPHA_FRICTION[0] ) + \
                RES.X[1] *plng.f*cos( ALPHA_FRICTION[1] ) + \
                RES.X[2] *( cont.mu*cos(ALPHA_FRICTION[2]) + cos(ALPHA_REACTION[2]) ), 
            5), round(LOAD, 5))

        self.assertEqual(
            round(
                RES.X[0] *sin( ALPHA_REACTION[0] ) + \
                RES.X[1] *sin( ALPHA_REACTION[1] ) + \
                RES.X[2] *( cont.mu*sin(ALPHA_FRICTION[2]) + sin(ALPHA_REACTION[2]) ), 
            5), 0)

        self.assertEqual(
            round(
                RES.X[0] *( plng.a+plng.b ) + RES.X[1] *plng.a + RES.X[2] *0, 
            5), 0)
