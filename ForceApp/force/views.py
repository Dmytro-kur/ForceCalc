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
        fields = ['mu','contactCoord_X', 'contactCoord_Y']

class PlungerForm(ModelForm):
    class Meta:
        model = Plunger
        fields = ['a','b', 'f']

class SpringForm(ModelForm):
    class Meta:
        model = Spring
        fields = ['springStiff','freeLen', 'springLen']

class AnglesForm(ModelForm):
    class Meta:
        model = Angles
        fields = ['plungerFric','N', 'FN']

class VariablesForm(ModelForm):
    class Meta:
        model = Variables
        fields = ['Na','Nb', 'N']

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
def calculation(request, project):

    if request.method == "GET":
        project_inst = Project.objects.get(project_number=project)
        contacts = project_inst.contacts.all()
        plungers = project_inst.plungers.all()
        springs = project_inst.springs.all()
        angles = project_inst.angles.all()
        variables = project_inst.variables.all()

        return render(request, 'force/calculation.html', {
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

        print("THIS IS A REQUEST:",request.GET['project'])
        # project_inst = Project.objects.get(project_number=request.GET.get("project"))
        # contact = project_inst.contacts.get(contact_key=value)

        return JsonResponse({"contact": 1}, status=201)