from django.http.response import HttpResponseBadRequest
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm

from .models import *
from django import forms
import ast
import json
import time
import numpy as np

def parse_from_js(request_body):

    byte_str = request_body
    dict_str = byte_str.decode("UTF-8")
    mydata = ast.literal_eval(dict_str.replace('null', 'None'))
    
    ''' ast.literal_eval(node_or_string)
    Safely evaluate an expression node or a string containing a Python literal or container display. 
    The string or node provided may only consist of the following Python literal structures: 
    strings, bytes, numbers, tuples, lists, dicts, sets, booleans, and None.
    This can be used for safely evaluating strings containing Python values from untrusted sources 
    without the need to parse the values oneself. It is not capable of evaluating arbitrarily 
    complex expressions, for example involving operators or indexing.
    Warning It is possible to crash the Python interpreter with a sufficiently large/complex 
    string due to stack depth limitations in Python’s AST compiler.
    Changed in version 3.2: Now allows bytes and set literals.
    Changed in version 3.9: Now supports creating empty sets with 'set()'.'''

    return mydata
        
class ProjectForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['project_number'].widget.attrs.update({
            'id': 'project_number',
            'class': "form-control form-control-sm",
        })
        self.fields['project_name'].widget.attrs.update({
            'id': 'project_name',
            'class': "form-control form-control-sm",
        })
        self.fields['assembly_number'].widget.attrs.update({
            'id': 'assembly_number',
            'class': "form-control form-control-sm",
        })

    class Meta:
        model = Project
        fields = ['project_number','project_name','assembly_number']

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['contact_key', 'mu', 'contactCoord_X', 'contactCoord_Y']

class PlungerForm(forms.ModelForm):
    class Meta:
        model = Plunger
        fields = ['plunger_key', 'a','b', 'f']

class SpringForm(forms.ModelForm):
    class Meta:
        model = Spring
        fields = ['spring_key', 'springStiff','freeLen', 'springLen']

class AnglesForm(forms.ModelForm):
    class Meta:
        model = Angles
        fields = ['angles_key', 'plungerFric','N', 'FN']
        
class PasswordChangeForm2(PasswordChangeForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['old_password'].widget.attrs.update({
            'class': 'form-control form-control-sm'
        })
        self.fields['new_password1'].widget.attrs.update({
            'class': 'form-control form-control-sm'
        })
        self.fields['new_password2'].widget.attrs.update({
            'class': 'form-control form-control-sm'
        })

def index(request):
    return render(request, 'force/index.html', {
        "projectForm": ProjectForm()
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
    # Artificially delay speed of response
    time.sleep(0.3)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "force/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password, 
            first_name = first_name, last_name = last_name)
            user.save()
            
        except IntegrityError:
            return render(request, "force/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "force/register.html")

@login_required
def password_change(request):

    if request.method == "POST":
        form = PasswordChangeForm(user=request.user,
        data=request.POST)

        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            logout(request)
            return HttpResponseRedirect(reverse("login"))
    else:
        return render(request, 'force/password_change.html', {
            "password_change": PasswordChangeForm2(user=request.user),
        })

#####################################################################################
# MAIL #
########
@login_required
def mail(request):
    if request.method == "GET":
        # Authenticated users view their inbox
        # if request.user.is_authenticated:
        return render(request, "force/mail.html")

        # Everyone else is prompted to sign in
        # else:
        #     return HttpResponseRedirect(reverse("login"))

@login_required
def compose(request):

    # Composing a new email must be via POST
    if request.method == "POST":

        # Check recipient emails
        
        data = json.loads(request.body)
        emails = [email.strip() for email in data.get("recipients").split(",")]
        if emails == [""]:
            return JsonResponse({
                "error": "At least one recipient required."
            }, status=400)

        # Convert email addresses to users
        recipients = []
        for email in emails:
            try:
                user = User.objects.get(email=email)
                recipients.append(user)
            except User.DoesNotExist:
                return JsonResponse({
                    "error": f"User with email {email} does not exist."
                }, status=400)

        # Get contents of email
        subject = data.get("subject", "")
        body = data.get("body", "")

        # Create an email
        email = Mail(
            sender=request.user,
            subject=subject,
            body=body,
        )
        email.save()
        for recipient in recipients:
            email.recipients.add(recipient)
            Flag(user=recipient, mail=email,
                read=False, archived=False).save()
        email.save()
        return JsonResponse({"message": "Email sent successfully."}, status=201)


@login_required
def unread(request):
    if request.method == "GET":
        count = Flag.objects.filter(user=request.user, read=False).count()
        return JsonResponse({"count": count})

@login_required
def email(request, mailbox, email_id):

    # One email

    # Query for requested email
    if mailbox == 'inbox' or mailbox == 'archived':
        try:
            email_ = Mail.objects.get(id=email_id)
            # Preventing bad retrieving of email 
            flag = email_.mail_flags.get(user=request.user)

        except Mail.DoesNotExist:
            return JsonResponse({"error": "Email not found."}, status=404)

    if mailbox == 'sent':
        try:
            flag = Mail.objects.get(sender=request.user, pk=email_id)
        except Mail.DoesNotExist:
            return JsonResponse({"error": "Email not found."}, status=404)

    # Return email contents
    if request.method == "GET":
        return JsonResponse(flag.serialize(), safe=False)

    # Update whether email is read or should be archived
    elif request.method == "PUT":

        data = json.loads(request.body)
        if data.get("read") is not None:
            flag.read = data["read"]

            flag.save()
            if data["read"]:
                return JsonResponse({"message": "The message has been read."}, status=201)
            if not data["read"]:
                return JsonResponse({"message": "The message was not read."}, status=201)

        if data.get("archived") is not None:
            flag.archived = data["archived"]

            flag.save()
            if data["archived"]:
                return JsonResponse({"message": "Email was archived."}, status=201)
            if not data["archived"]:
                return JsonResponse({"message": "Email was unarchived."}, status=201)

        return JsonResponse({"message": "Email state wasn't change."}, status=201)

    # Email must be via GET or PUT
    else:
        return JsonResponse({
            "error": "GET or PUT request required."
        }, status=400)

def Read(email, request):
    ser_email = email.serialize()
    try:
        ser_email["read"] = Flag.objects.get(mail=email, user=request).read
    except Flag.DoesNotExist:
        ser_email["read"] = ''
    return ser_email

@login_required
def mailbox(request, query, mailbox):

    # Filter emails returned based on mailbox

    if request.method == "GET":

        ids_1 = set()

        if mailbox == "inbox":

            flags = Flag.objects.filter(user=request.user, archived=False)
            for email in flags:
                ids_1.add(email.mail.id)

        elif mailbox == "sent":

            emails = Mail.objects.filter(sender=request.user)
            for email in emails:
                ids_1.add(email.id)

        elif mailbox == "archived":

            flags = Flag.objects.filter(user=request.user, archived=True)
            for flag in flags:
                ids_1.add(flag.mail.id)

        else:
            return JsonResponse({"error": "Invalid mailbox."}, status=400)

        emails_1 = Mail.objects.filter(id__in=ids_1)

        ids_2 = set()

        if query == "all":
            # Get page number
            page = int(request.GET.get("page"))
            end = page * 50
            start = end - 50

            # Return emails in reverse chronologial order
            emails = emails_1.order_by("-timestamp")[start:end]

            # Artificially delay speed of response
            # time.sleep(0.3)

            return JsonResponse([{"count": emails_1.count()}] + 
            [Read(email, request.user) for email in emails], safe=False)

        # make queries

        # searching for recepients name
        try:
            user_name = User.objects.filter(username__icontains=query)
            for user in user_name:

                emails_user = emails_1.filter(recipients=user)
                for email in emails_user:
                    ids_2.add(email.id)

        except User.DoesNotExist:
            pass

        # searching for sender name
        try:
            user_name = User.objects.filter(username__icontains=query)
            for user in user_name:
                emails_user = emails_1.filter(sender=user)
                for email in emails_user:
                    ids_2.add(email.id)

        except User.DoesNotExist:
            pass

        # searching for recepients email
        try:
            user_email = User.objects.filter(email__icontains=query)
            for user in user_email:
                emails = emails_1.filter(recipients=user)
                for email in emails:
                    ids_2.add(email.id)

        except User.DoesNotExist:
            pass

        # searching for sender email
        try:
            user_email = User.objects.filter(email__icontains=query)
            for user in user_email:
                emails = emails_1.filter(sender=user)
                for email in emails:
                    ids_2.add(email.id)

        except User.DoesNotExist:
            pass

        email_subject = emails_1.filter(subject__icontains=query)
        for email in email_subject:
            ids_2.add(email.id)

        email_body = emails_1.filter(body__icontains=query)
        for email in email_body:
            ids_2.add(email.id)

        emails_2 = emails_1.filter(id__in=ids_2)

        # Get page number
        page = int(request.GET.get("page"))
        end = page*50
        start = end - 50

        # Generate list of projects
        emails = emails_2.order_by("-timestamp")[start:end]

        # Artificially delay speed of response
        # time.sleep(0.3)

        # Return list of emails
        return JsonResponse([{"count": emails_2.count()}] + 
        [Read(email, request.user) for email in emails], safe=False)

########
# MAIL #
#####################################################################################



#####################################################################################
# PROJECT #
########

@login_required
def new_project(request):

    ''' Create new project '''
    
    if request.method == "POST":
        
        mydata = parse_from_js(request.body)
        project_data = ProjectForm(mydata)

        if project_data.is_valid():

            project_creator = project_data.save(commit=False)
            project_creator.user = request.user
            project_creator.save()
        
            return JsonResponse({"message": "New project is created."}, 
            status=201)
        else:
            # error about uniqueness of the value
            return JsonResponse({"errors": project_data.errors}, status=400)
        

def projects(request, query):

    ''' Filtering by query for username, email, 
    project number, project name and assembly.
    
    int(request.GET.get("page")) variable is a page for project list.
    query="all" retrieve all project list'''

    if request.method == "GET":
        if query == "all":

            # Get page number
            page = int(request.GET.get("page"))
            end = page*10
            start = end - 10

            # Generate list of projects
            projects = Project.objects.order_by("-timestamp")[start:end]

            # Artificially delay speed of response
            # time.sleep(0.3)

            # Return list of projects
            return JsonResponse([{"count": Project.objects.count()}] + 
            [project.serialize() for project in projects], safe=False)

        ids = set()

        # make queries
        try:
            user_name = User.objects.filter(username__icontains=query)
            for user in user_name:
                projects_user = Project.objects.filter(user=user)
                for project in projects_user:
                    ids.add(project.id)

        except User.DoesNotExist:
            pass
        
        try:
            user_email = User.objects.filter(email__icontains=query)
            for user in user_email:
                projects_email = Project.objects.filter(user=user)
                for project in projects_email:
                    ids.add(project.id)

        except User.DoesNotExist:
            pass

        projects_num = Project.objects.filter(project_number__icontains=query)
        for project in projects_num:
            ids.add(project.id)

        projects_name = Project.objects.filter(project_name__icontains=query)
        for project in projects_name:
            ids.add(project.id)

        projects_ass = Project.objects.filter(assembly_number__icontains=query)
        for project in projects_ass:
            ids.add(project.id)

        projects_all = Project.objects.filter(id__in=ids)

        # Get page number
        page = int(request.GET.get("page"))
        end = page*10
        start = end - 10

        # Generate list of projects
        projects = projects_all.order_by("-timestamp")[start:end]

        # Artificially delay speed of response
        # time.sleep(0.3)

        # Return list of projects
        
        return JsonResponse([{"count": projects_all.count()}] + 
        [project.serialize() for project in projects], safe=False)
########
# PROJECT #
#####################################################################################





#####################################################################################
# CALCULATION #
########

@login_required
def result(request):

    '''Get resulting reaction forces'''
    
    if request.method == "GET":
        try:
            plungerFric = float(request.GET.get("plungerFric"))
        except ValueError:
            plungerFric = 0
        
        try:
            springStiff = float(request.GET.get("springStiff"))
        except ValueError:
            springStiff = 4.1

        try:
            freeLen = float(request.GET.get("freeLen"))
        except ValueError:
            freeLen = 10.7
        
        try:
            springLen = float(request.GET.get("springLen"))
        except ValueError:
            springLen = 8.9

        load = springStiff*(freeLen-springLen)
        if np.sign(load) == -1:
            return JsonResponse({
                "disclaimer": 'Free length should be higher than dumped spring.'
                }, status=400)

        try:
            a = float(request.GET.get("a"))
        except ValueError:
            a = 1

        try:
            b = float(request.GET.get("b"))
        except ValueError:
            b = 1

        try:
            f = float(request.GET.get("f"))
        except ValueError:
            f = 0.15

        try:
            mu = float(request.GET.get("mu"))
        except ValueError:
            mu = 0.15

        try:
            N = float(request.GET.get("N"))
        except ValueError:
            N = 120

        try:
            FN = float(request.GET.get("FN"))
        except ValueError:
            FN = 210

        try:
            contactCoord_X = float(request.GET.get("contactCoord_X"))
        except ValueError:
            contactCoord_X = 0

        try:
            contactCoord_Y = float(request.GET.get("contactCoord_Y"))
        except ValueError:
            contactCoord_Y = 0

        RES = calc_forces(plungerFric, load, a, b, f, mu, N, FN)
        RES.solver()
        forces = RES.corrected_forces()

        # NRT - normal reaction torque
        # NRFT - normal reaction friction torque
        # TI - torque
        # FTI - friction torque intersection

        torque = calc_torque(contactCoord_X, contactCoord_Y, forces["NR"], N)
        friction_torque = calc_torque(contactCoord_X, contactCoord_Y, forces["NR"] * mu, FN)
        NRT = torque.solver()
        NRFT = friction_torque.solver()
        TI = torque.intersection()
        FTI = friction_torque.intersection()

        return JsonResponse({
            "REACTION": {
                "Na": forces["Na"],
                "Nb": forces["Nb"],
                "NR": forces["NR"],
            },
            "FRICTION_DIRECTION": {
                "Na": forces["Na_friction_direction"],
                "Nb": forces["Nb_friction_direction"],
                "NR": forces["NR_friction_direction"],
            },
            "DIRECTION": {
                "Na": forces["Na_direction"],
                "Nb": forces["Nb_direction"],
                "NR": forces["NR_direction"],
            },
            "TORQUE": {
                "NRT": NRT,
                "NRFT": NRFT,
            },
            "INTERSECTION": {
                "TI": {
                    "X": TI["X"],
                    "Y": TI["Y"],
                },
                "FTI": {
                    "X": FTI["X"],
                    "Y": FTI["Y"],
                }
            },
        })

@login_required
def calculation(request, project_num):

    if request.method == "GET":
        project_inst = Project.objects.get(pk=int(project_num))
        contacts = project_inst.contacts.all()
        plungers = project_inst.plungers.all()
        springs = project_inst.springs.all()
        angles = project_inst.angles.all()

        return render(request, 'force/calculation.html', {
            "project": project_inst,
            "Contacts": contacts,
            "Plungers": plungers,
            "Springs": springs,
            "Angles": angles,
        })

@login_required
def parameter(request, name, project_num):

    if request.method == "GET":

        if request.GET.get("value") != 'None':
            inst = Project.objects.get(pk=project_num)
            if name == "contact":
                param = inst.contacts.get(pk=request.GET.get("value"))
            if name == "plunger":
                param = inst.plungers.get(pk=request.GET.get("value"))
            if name == "spring":
                param = inst.springs.get(pk=request.GET.get("value"))
            if name == "angles":
                param = inst.angles.get(pk=request.GET.get("value"))

            return JsonResponse(param.serialize())

        elif request.GET.get("value") == 'None':
            return JsonResponse({
                "var1": "unknown",
                "var2": "unknown",
                "var3": "unknown",
            })

    if request.method == "POST":
        try:
            inst = Project.objects.get(pk=project_num, user=request.user)
        except Project.DoesNotExist:
            return JsonResponse({
                "disclaimer": 'you do not have the right to change other people\'s data'
                }, status=400)

        mydata = parse_from_js(request.body)
        

        if name == "contact":
            mydata['mu'] = mydata['var1']
            mydata['contactCoord_X'] = mydata['var2']
            mydata['contactCoord_Y'] = mydata['var3']
            data = ContactForm(mydata)

        if name == "plunger":
            mydata['a'] = mydata['var1']
            mydata['b'] = mydata['var2']
            mydata['f'] = mydata['var3']
            data = PlungerForm(mydata)

        if name == "spring":
            mydata['springStiff'] = mydata['var1']
            mydata['freeLen'] = mydata['var2']
            mydata['springLen'] = mydata['var3']
            data = SpringForm(mydata)

        if name == "angles":

            mydata['plungerFric'] = mydata['var1']
            mydata['N'] = mydata['var2']
            mydata['FN'] = mydata['var3']
            try:
                Diff = round(mydata['N'] - mydata['FN'], 5)
            except TypeError:
                print("Input N is None, so for avoiding TypeError, Diff should be 90")
                Diff = 90

            if abs(Diff) != 90:
                return JsonResponse({
                    "errors": {
                        "FN": f'The two directions must be orthogonal.\nDifference is {abs(Diff)}'
                    }}, status=400)

            data = AnglesForm(mydata)

        if data.is_valid():
            param = data.save(commit=False)
            param.project = inst
            param.save()
            param = param.serialize()

            return JsonResponse({
                "key": param['key'],
                "id": param['id'],
                "message": f"{name} group {param['key']} was successfully added",
            }, status=201)
        else:
            return JsonResponse({"errors": data.errors}, status=400)

    if request.method == "PUT":
        try:
            inst = Project.objects.get(pk=project_num, user=request.user)
        except Project.DoesNotExist:
            return JsonResponse({
                "disclaimer": 'you do not have the right to change other people\'s data'
                }, status=400)

        mydata = parse_from_js(request.body)

        if name == "contact":
            a = Contact.objects.get(pk=request.GET.get("value"))
            mydata['contact_key'] = a.contact_key
            mydata['mu'] = mydata['var1']
            mydata['contactCoord_X'] = mydata['var2']
            mydata['contactCoord_Y'] = mydata['var3']
            data = ContactForm(mydata, instance=a)

        if name == "plunger":
            a = Plunger.objects.get(pk=request.GET.get("value"))
            mydata['plunger_key'] = a.plunger_key
            mydata['a'] = mydata['var1']
            mydata['b'] = mydata['var2']
            mydata['f'] = mydata['var3']
            data = PlungerForm(mydata, instance=a)

        if name == "spring":
            a = Spring.objects.get(pk=request.GET.get("value"))
            mydata['spring_key'] = a.spring_key
            mydata['springStiff'] = mydata['var1']
            mydata['freeLen'] = mydata['var2']
            mydata['springLen'] = mydata['var3']
            data = SpringForm(mydata, instance=a)

        if name == "angles":
            a = Angles.objects.get(pk=request.GET.get("value"))
            mydata['angles_key'] = a.angles_key
            mydata['plungerFric'] = mydata['var1']
            mydata['N'] = mydata['var2']
            mydata['FN'] = mydata['var3']
            Diff = round(mydata['N'] - mydata['FN'], 5)

            if abs(Diff) != 90:
                return JsonResponse({
                    "errors": {
                        "FN": f'The two directions must be orthogonal.\nDifference is {Diff}'
                    }}, status=400)

            data = AnglesForm(mydata, instance=a)

        if data.is_valid():
            param = data.save()
            return JsonResponse({
                "message": "Parameter was successfully edited",
            }, status=200)

        else: 
            return JsonResponse({"errors": data.errors}, status=400)

    if request.method == "DELETE":
        
        try:
            inst = Project.objects.get(pk=project_num, user=request.user)
        except Project.DoesNotExist:
            return JsonResponse({
                "disclaimer": 'you do not have the right to change other people\'s data'
                }, status=400)

        if name == "contact":
            a = inst.contacts.get(pk=request.GET.get("value"))
            serial_a = a.serialize()
            a.delete()
            return JsonResponse({
                "message": f"{serial_a['key']} was successfully deleted",
            }, status=200)

        if name == "plunger":
            a = inst.plungers.get(pk=request.GET.get("value"))
            serial_a = a.serialize()
            a.delete()
            return JsonResponse({
                "message": f"{serial_a['key']} was successfully deleted",
            }, status=200)

        if name == "spring":
            a = inst.springs.get(pk=request.GET.get("value"))
            serial_a = a.serialize()
            a.delete()
            return JsonResponse({
                "message": f"{serial_a['key']} was successfully deleted",
            }, status=200)

        if name == "angles":
            a = inst.angles.get(pk=request.GET.get("value"))
            serial_a = a.serialize()
            a.delete()
            return JsonResponse({
                "message": f"{serial_a['key']} was successfully deleted",
            }, status=200)

########
# CALCULATION #
#####################################################################################