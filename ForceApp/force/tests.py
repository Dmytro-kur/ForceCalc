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
        testContact = Contact.objects.create(key="Test Contact 1",
            mu=0.15,
            contactCoord_X=0,
            contactCoord_Y=0,
            project=testProject)

        # create Plunger
        testPlunger = Plunger.objects.create(key="Test Plunger 1",
            a=0.197,
            b=3.56,
            f=0.15,
            project=testProject)

        # create Spring
        testSpring = Spring.objects.create(key="Test Spring 1",
            springStiff=4.1,
            freeLen=10.7,
            springLen=8.232,
            project=testProject)

        # create Angles
        testAngle = Angles.objects.create(key="Test Angles 1",
            plungerFric=0,
            N=215.01,
            FN=305.01,
            project=testProject)
            
        # create Unknown_variables
        res = Variables.calc_vars(testAngle.plungerFric, testSpring.force(), 
            testPlunger.a, testPlunger.b, testPlunger.f,
            testContact.mu, testAngle.N, testAngle.FN)
        print(res)

        Variables.objects.create(key="Test Variables 1",
            Na=res[0],
            Nb=res[1],
            N=res[2],
            project=testProject)

    def test_math_model(self):
        """Put all variables and solve equations
            [ Na*f       Nb*f     N*(mu*cos(alpha) + cos(beta))]
            [-Na         Nb       N*(mu*sin(alpha) + sin(beta))]  =  [-F    0     0]
            [ Na*(a+b)  -Nb*a     N*0                          ]"""

        cont = Contact.objects.get(key="Test Contact 1")
        plng = Plunger.objects.get(key="Test Plunger 1")
        sprg = Spring.objects.get(key="Test Spring 1")
        angl = Angles.objects.get(key="Test Angles 1")
        vars = Variables.objects.get(key="Test Variables 1")

        self.assertEqual(round(vars.Na*plng.f*cos(angl.plungerFric) + \
                vars.Nb*plng.f*cos(angl.plungerFric) + \
                vars.N*(cont.mu*cos(angl.FN) + cos(angl.N)), 5), \
                round(-sprg.force(), 5))

        self.assertEqual(round(-vars.Na + vars.Nb + \
            vars.N*(cont.mu*sin(angl.FN) + sin(angl.N)), 5), 0)

        self.assertEqual(round(vars.Na*(plng.a + plng.b) - vars.Nb*plng.a, 5), 0)
