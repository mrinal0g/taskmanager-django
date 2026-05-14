import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from practice.models import Task
from django.contrib.auth.models import User

# Tells django even if you do not receive any csrf token, Allow the request
@csrf_exempt
def handle_login(request):
    if request.method == 'POST':  
        # json.loads - It converts the Json object into a python dictionary
        data = json.loads(request.body)
        email = data.get('username')
        passwrd = data.get('password')
        user = authenticate(request,username=email,password=passwrd)
        if user is not None:
            login(request,user)
            return JsonResponse({"message":"Login succesful"})
        else:
            return JsonResponse({"message":"Invalid credentials"})
    return JsonResponse({"message":"Invalid request"})

# Sign up view
@csrf_exempt
def handle_signup(request):
    if request.method == 'POST':
        # json.loads - It converts the Json object into a python dictionary
        data = json.loads(request.body)
        email = data.get('username')
        passwrd = data.get('password')
        # Model.objects.create(col1=value,col2=value)
        # insert into (columns) values (values)
        user = User.objects.create_user(username=email,password=passwrd)
        if user is not None:
            return JsonResponse({"message":"SignUp succesful"})
        else:
            return JsonResponse({"message":"User already exists"})
    return JsonResponse({"message":"Invalid request"})

# --- NEW: View to handle updating the task ---
@csrf_exempt
def updateTask(request, task_id):
    # req - is_completed
    # task_id we have task id
    if request.method == "POST": 
        if request.user.is_authenticated:
            try:
                task = Task.objects.get(id=task_id, user=request.user)
                data = json.loads(request.body)
                task.is_completed = data.get('is_completed', task.is_completed)
                task.save()
                return JsonResponse({"message": "Task updated", "is_completed": task.is_completed})
            except:
                return JsonResponse({"message": "Task not found"}, status=404)
        else:
            return JsonResponse({"message": "Unauthorized user"}, status=401)
    return JsonResponse({"message": "Invalid request"}, status=400)

@csrf_exempt
def deleteTask(request, task_id):
    # task_id = 19
    if request.method == "DELETE":
        if request.user.is_authenticated:
            try:
                task = Task.objects.get(id=task_id, user=request.user)
                task.delete()
                return JsonResponse({"message": "Task deleted successfully"})
            except Task.DoesNotExist:
                return JsonResponse({"message": "Task not found"}, status=404)
        return JsonResponse({"message": "Unauthorized"}, status=401)
    return JsonResponse({"message": "Invalid request"}, status=400)


# --- UPDATED: Make sure to fetch 'is_completed' as well ---
@csrf_exempt
def getTasks(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            # select all -model.objects.all()
            # Added 'is_completed' to the values list!
            # I need to send tasks for only user 4
            # filter and get - filter will give you multiple records as output
            # select id,title,is_completed from Task where user = user_id;
            tasks = list(Task.objects.filter(user=request.user).values('id', 'title', 'is_completed'))
            print(tasks)
            return JsonResponse(tasks, safe=False)
            # safe = False - Django does not allow any collection datatype to be sent
            # as a value in our json object
        else:
            return JsonResponse({"message": "Unauthorized user"}, status=401)
    return JsonResponse({"message": "Invalid request"}, status=400)

@csrf_exempt
def logout_handle(request):
    logout(request)
    return JsonResponse({"message":"Logout succesful"})


@csrf_exempt
def checkAuth(request):
    return JsonResponse({"message":request.user.is_authenticated})

@csrf_exempt
def addTask(request):
    if request.method == "POST":
        data = json.loads(request.body)
        title = data.get('title')
        task = Task.objects.create(user = request.user,title =title )
        return JsonResponse({"message":task.title})