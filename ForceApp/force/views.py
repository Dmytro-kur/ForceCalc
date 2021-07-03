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
from django import forms
import ast

def parse_from_js(request_body):

    byte_str = request_body
    dict_str = byte_str.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)

    return mydata
        
class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['project_number','project_name','assembly_number']

class ContactForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['key'].widget.attrs.update({
            'id': 'id_contact_key'
        })
    class Meta:
        model = Contact
        fields = ['key', 'mu', 'contactCoord_X', 'contactCoord_Y']
        labels = {
            'contact_key': _('Name of the Contact'),
            'mu': _('Friction in Contact μ'),
            'contactCoord_X': _('Contact Point X Coordinate (mm)'),
            'contactCoord_Y': _('Contact Point Y Coordinate (mm)'),
        }
        # help_texts = {
        #     'name': _('Some useful help text.'),
        # }

class PlungerForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['key'].widget.attrs.update({
            'id': 'id_plunger_key'
        })
    class Meta:
        model = Plunger
        fields = ['key', 'a','b', 'f']
        labels = {
            'key': _('Name of the Plunger'),
            'a': _('Distance between Contact Point and Point B (mm)'),
            'b': _('Distance between Point A and Point (mm)'),
            'f': _('Friction in Plunger Joints'),
        }

class SpringForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['key'].widget.attrs.update({
            'id': 'id_spring_key'
        })
    class Meta:
        model = Spring
        fields = ['key', 'springStiff','freeLen', 'springLen']
        labels = {
            'key': _('Name of the Spring'),
            'springStiff': _('Spring Stiffness (N/mm)'),
            'freeLen': _('Free Spring Length (N/mm)'),
            'springLen': _('Spring Length (N/mm)'),
        }

class AnglesForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['key'].widget.attrs.update({
            'id': 'id_angles_key'
        })
    class Meta:
        model = Angles
        fields = ['key', 'plungerFric','N', 'FN']
        labels = {
            'key': _('Name of the Angles'),
            'plungerFric': _('Direction of Plunger Friction Forces (deg)'),
            'N': _('Direction of Normal Reaction (deg)'),
            'FN': _('Direction of Friction Force in Contact (deg)'),
        }

class VariablesForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['key'].widget.attrs.update({
            'id': 'id_variables_key'
        })
    class Meta:
        model = Variables
        fields = ['key', 'Na','Nb', 'NR']
        labels = {
            'key': _('Result name'),
            'Na': _('Force Reaction in Point A (N)'),
            'Nb': _('Force Reaction in Point B (N)'),
            'NR': _('Force Reaction in Contact Point (N)'),
        }

def index(request):
    return render(request, 'force/index.html', {
        "projectForm": ProjectForm(),
    })

@csrf_protect
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

@csrf_protect
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

@csrf_protect
@login_required
def new_project(request):

    if request.method == "POST":

        mydata = parse_from_js(request.body)
        project_data = ProjectForm(mydata)

        if project_data.is_valid():

            project_creator = project_data.save(commit=False)
            project_creator.user = request.user
            project_creator.save()

            return JsonResponse({"message": "New project is created."}, status=201)
        else:
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
def result(request, value):

    pass

@csrf_protect
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

    if request.method == "DELETE":
        pass

@csrf_protect
@login_required
def parameter(request, item, value):

# value - project number
    if request.method == "GET":
        if int(request.GET.get("num")) != 0:
            inst = Project.objects.get(pk=value)

            if item == "contact":
                param = inst.contacts.get(pk=request.GET.get("num"))
            if item == "plunger":
                param = inst.plungers.get(pk=request.GET.get("num"))
            if item == "spring":
                param = inst.springs.get(pk=request.GET.get("num"))
            if item == "angles":
                param = inst.angles.get(pk=request.GET.get("num"))

            return JsonResponse(param.serialize())

        elif int(request.GET.get("num")) == 0:
            return JsonResponse({
                "var1": "",
                "var2": "",
                "var3": "",
            })

    if request.method == "POST":

        mydata = parse_from_js(request.body)
        
        if item == "contact":
            mydata['mu'] = mydata['var1']
            mydata['contactCoord_X'] = mydata['var2']
            mydata['contactCoord_Y'] = mydata['var3']
            data = ContactForm(mydata)

        if item == "plunger":
            mydata['a'] = mydata['var1']
            mydata['b'] = mydata['var2']
            mydata['f'] = mydata['var3']
            data = PlungerForm(mydata)

        if item == "spring":
            mydata['springStiff'] = mydata['var1']
            mydata['freeLen'] = mydata['var2']
            mydata['springLen'] = mydata['var3']
            data = SpringForm(mydata)

        if item == "angles":
            mydata['plungerFric'] = mydata['var1']
            mydata['N'] = mydata['var2']
            mydata['FN'] = mydata['var3']
            data = AnglesForm(mydata)

        if data.is_valid():
            inst = Project.objects.get(pk=value)
            param = data.save(commit=False)
            param.project = inst
            param.save()

            return JsonResponse({
                "key": param.key,
                "id": param.id,
                "message": "Parameter was successfully added",
            }, status=201)
        else: 
            return JsonResponse({"error": data.errors}, status=400)

    if request.method == "PUT":
        mydata = parse_from_js(request.body)

        if item == "contact":
            a = Contact.objects.get(pk=request.GET.get("num"))
            mydata['key'] = a.key
            mydata['mu'] = mydata['var1']
            mydata['contactCoord_X'] = mydata['var2']
            mydata['contactCoord_Y'] = mydata['var3']
            data = ContactForm(mydata, instance=a)

        if item == "plunger":
            a = Plunger.objects.get(pk=request.GET.get("num"))
            mydata['key'] = a.key
            mydata['a'] = mydata['var1']
            mydata['b'] = mydata['var2']
            mydata['f'] = mydata['var3']
            data = PlungerForm(mydata, instance=a)

        if item == "spring":
            a = Spring.objects.get(pk=request.GET.get("num"))
            mydata['key'] = a.key
            mydata['springStiff'] = mydata['var1']
            mydata['freeLen'] = mydata['var2']
            mydata['springLen'] = mydata['var3']
            data = SpringForm(mydata, instance=a)

        if item == "angles":
            a = Angles.objects.get(pk=request.GET.get("num"))
            mydata['key'] = a.key
            mydata['plungerFric'] = mydata['var1']
            mydata['N'] = mydata['var2']
            mydata['FN'] = mydata['var3']
            data = AnglesForm(mydata, instance=a)

        if data.is_valid():
            param = data.save()
            return JsonResponse({
                "message": "Parameter was successfully edited",
            }, status=200)
        else: 
            return JsonResponse({"error": data.errors}, status=400)

    if request.method == "DELETE":
        inst = Project.objects.get(pk=value)
        if item == "contact":
            a = inst.contacts.get(pk=request.GET.get("num"))
            key = a.key
            a.delete()
            return JsonResponse({
                "message": f"Contact {key} was successfully deleted",
            }, status=200)

        if item == "plunger":
            a = inst.plungers.get(pk=request.GET.get("num"))
            key = a.key
            a.delete()
            return JsonResponse({
                "message": f"Plunger {key} was successfully deleted",
            }, status=200)

        if item == "spring":
            a = inst.springs.get(pk=request.GET.get("num"))
            key = a.key
            a.delete()
            return JsonResponse({
                "message": f"Spring {key} was successfully deleted",
            }, status=200)

        if item == "angles":
            a = inst.angles.get(pk=request.GET.get("num"))
            key = a.key
            a.delete()
            return JsonResponse({
                "message": f"Angles {key} was successfully deleted",
            }, status=200)

