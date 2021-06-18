from django.http.response import HttpResponseBadRequest
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.utils.translation import gettext_lazy as _

from .models import *
from django.forms import ModelForm
from django import forms
import ast


class ProjectForm(ModelForm):
    class Meta:
        model = Project
        fields = ['project_number','project_name','assembly_number']

class ContactForm(ModelForm):
    class Meta:
        model = Contact
        fields = ['contact_key', 'mu', 'contactCoord_X', 'contactCoord_Y']
        labels = {
            'contact_key': _('Name of the Contact'),
            'mu': _('Friction in Contact μ'),
            'contactCoord_X': _('Contact Point X Coordinate (mm)'),
            'contactCoord_Y': _('Contact Point Y Coordinate (mm)'),
        }
        # help_texts = {
        #     'name': _('Some useful help text.'),
        # }

class PlungerForm(ModelForm):
    class Meta:
        model = Plunger
        fields = ['plunger_key', 'a','b', 'f']
        labels = {
            'plunger_key': _('Name of the Plunger'),
            'a': _('Distance between Contact Point and Point B (mm)'),
            'b': _('Distance between Point A and Point (mm)'),
            'f': _('Friction in Plunger Joints'),
        }

class SpringForm(ModelForm):
    class Meta:
        model = Spring
        fields = ['spring_key', 'springStiff','freeLen', 'springLen']
        labels = {
            'spring_key': _('Name of the Spring'),
            'springStiff': _('Spring Stiffness (N/mm)'),
            'freeLen': _('Free Spring Length (N/mm)'),
            'springLen': _('Spring Length (N/mm)'),
        }

class AnglesForm(ModelForm):
    class Meta:
        model = Angles
        fields = ['angles_key', 'plungerFric','N', 'FN']
        labels = {
            'angles_key': _('Name of the Angles'),
            'plungerFric': _('Direction of Plunger Friction Forces (deg)'),
            'N': _('Direction of Normal Reaction (deg)'),
            'FN': _('Direction of Friction Force in Contact (deg)'),
        }

class VariablesForm(ModelForm):
    class Meta:
        model = Variables
        fields = ['variables_key', 'Na','Nb', 'NR']
        labels = {
            'angles_key': _('Name of the Variables'),
            'Na': _('Force Reaction in Point A (N)'),
            'Nb': _('Force Reaction in Point B (N)'),
            'NR': _('Force Reaction in Contact Point (N)'),
        }

def index(request):
    return render(request, 'force/index.html', {
        "projectForm": ProjectForm(),
    })

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "force/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "force/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "force/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            
        except IntegrityError:
            return render(request, "force/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "force/register.html")

@csrf_exempt
@login_required
def new_project(request):

    if request.method == "POST":
        byte_str = request.body
        dict_str = byte_str.decode("UTF-8")
        mydata = ast.literal_eval(dict_str)
        
        project_data = ProjectForm(mydata)

        if project_data.is_valid():

            project_creator = project_data.save(commit=False)
            project_creator.user = request.user
            project_creator.save()

            return JsonResponse({"message": "New project is created."}, status=201)
        else:
            print(project_data.errors["project_number"])
            return JsonResponse({"error": project_data.errors["project_number"][0]}, status=400)

def projects(request, query):
    
    if request.method == "GET":
        if query == "all":

            # Get page number
            page = int(request.GET.get("page"))
            end = page*10
            start = end - 10

            # Generate list of projects
            projects = Project.objects.order_by("-datetime")[start:end]

            # Artificially delay speed of response
            # time.sleep(0.3)

            # Return list of projects
            return JsonResponse([{"projects_count": Project.objects.count()}] + 
            [project.serialize() for project in projects], safe=False)

        projects_user = Project.objects.none()
        projects_email = Project.objects.none()
        projects_num = Project.objects.none()
        projects_name = Project.objects.none()
        projects_ass = Project.objects.none()

        # make queries
        try:
            user_name = User.objects.filter(username__icontains=query).first()
            projects_user = Project.objects.filter(user=user_name)
        except User.DoesNotExist:
            pass
        
        try:
            user_email = User.objects.filter(email__icontains=query).first()
            projects_email = Project.objects.filter(user=user_email)
        except User.DoesNotExist:
            pass

        projects_num = Project.objects.filter(project_number__icontains=query)
        projects_name = Project.objects.filter(project_name__icontains=query)
        projects_ass = Project.objects.filter(assembly_number__icontains=query)

        projects = Project.objects.none()
        projects_all = projects.union(projects_user, projects_email,
                                projects_num, projects_name, projects_ass)

        # Get page number
        page = int(request.GET.get("page"))
        end = page*10
        start = end - 10

        # Generate list of projects
        projects = projects_all.order_by("-datetime")[start:end]

        # Artificially delay speed of response
        # time.sleep(0.3)

        # Return list of projects
        
        return JsonResponse([{"projects_count": projects_all.count()}] + 
        [project.serialize() for project in projects], safe=False)

@login_required
def calculation(request, project_num):

    if request.method == "GET":
        project_inst = Project.objects.get(pk=int(project_num))
        contacts = project_inst.contacts.all()
        plungers = project_inst.plungers.all()
        springs = project_inst.springs.all()
        angles = project_inst.angles.all()
        variables = project_inst.variables.all()

        return render(request, 'force/calculation.html', {
            "project": project_inst,
            "Contacts": contacts,
            "Plungers": plungers,
            "Springs": springs,
            "Angles": angles,
            "Variables": variables,
            "ContactForm": ContactForm(),
            "PlungerForm": PlungerForm(),
            "SpringForm": SpringForm(),
            "AnglesForm": AnglesForm(),
            "VariablesForm": VariablesForm(),
        })
    
    if request.method == "POST":
        pass

@login_required
def contact(request, value):

    if request.method == "GET":
        if value != 0:
            project_inst = Project.objects.get(pk=value)
            contact = project_inst.contacts.get(pk=request.GET.get("num"))
            
            return JsonResponse(contact.serialize(), safe=False)
        elif value == 0:
            return JsonResponse({
                "v1": "",
                "v2": "",
                "v3": "",
            }, safe=False)

    if request.method == "POST":
        contact_data = ProjectForm(request.POST)
        project_inst = Project.objects.get(pk=value)

        if contact_data.is_valid():
            contact_creator = contact_data.save(commit=False)
            contact_creator.project = project_inst
            contact_creator.save()

            return JsonResponse({"message": "New Contact was added."}, status=201)
        else: 
            return JsonResponse({"error": contact_data.errors["project_number"][0]}, status=400)


@login_required
def plunger(request, value):

    if request.method == "GET":
        if value != 0:
            project_inst = Project.objects.get(pk=request.GET.get("project_num"))
            contact = project_inst.plungers.get(pk=value)
            
            return JsonResponse(contact.serialize(), safe=False)
        elif value == 0:
            return JsonResponse({
                "v1": "",
                "v2": "",
                "v3": "",
            }, safe=False)

@login_required
def spring(request, value):

    if request.method == "GET":
        if value != 0:
            project_inst = Project.objects.get(pk=request.GET.get("project_num"))
            contact = project_inst.springs.get(pk=value)
            
            return JsonResponse(contact.serialize(), safe=False)
        elif value == 0:
            return JsonResponse({
                "v1": "",
                "v2": "",
                "v3": "",
            }, safe=False)

@login_required
def angles(request, value):

    if request.method == "GET":
        if value != 0:
            project_inst = Project.objects.get(pk=request.GET.get("project_num"))
            contact = project_inst.angles.get(pk=value)
            
            return JsonResponse(contact.serialize(), safe=False)
        elif value == 0:
            return JsonResponse({
                "v1": "",
                "v2": "",
                "v3": "",
            }, safe=False)

@login_required
def variables(request, value):

    if request.method == "GET":
        if value != 0:
            project_inst = Project.objects.get(pk=request.GET.get("project_num"))
            contact = project_inst.variables.get(pk=value)
            
            return JsonResponse(contact.serialize(), safe=False)
        elif value == 0:
            return JsonResponse({
                "v1": "",
                "v2": "",
                "v3": "",
            }, safe=False)