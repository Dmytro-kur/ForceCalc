from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError

from .models import *

def index(request):
    return render(request, 'force/index.html')

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

def projects(request):

    # Get filters
    datetime = request.GET.get("datetime")
    project_number = request.GET.get("project_number")
    project_name = request.GET.get("project_name")
    assembly_number = request.GET.get("assembly_number")
    username = request.GET.get("user")
    user = User.objects.get(username=username)

    projects = Project.objects.all()

    # make queries
    if datetime:
        projects = projects.filter(datetime=datetime)
    if project_number:
        projects = projects.filter(project_number=project_number)
    if project_name:
        projects = projects.filter(project_name=project_name)
    if assembly_number:
        projects = projects.filter(assembly_number=assembly_number)
    if user:
        projects = projects.filter(user=user)

    # Get start and end points
    start = int(request.GET.get("start"))
    end = int(request.GET.get("end"))

    # Generate list of projects
    projects = projects.order_by("-datetime")[start:end]

    # Artificially delay speed of response
    # time.sleep(0.3)

    # Return list of projects
    return JsonResponse([project.serialize() for project in projects] + 
    [{"project_count": Project.objects.all().count()}], safe=False)


@login_required
def calculation(request):
    return render(request, 'force/calculation.html')

