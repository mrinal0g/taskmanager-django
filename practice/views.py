from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.decorators import login_required

def signup(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        # model.objects.create()
        user = User.objects.create_user(username=username,password=password)
        user.save()
        return redirect('login')
    return render(request,'signup.html')

def handle_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request,username=username,password=password)
        # It goes to auth_user table - 
        # It now checks if username, password is matching 
        # If match found then - is_authenticated =True
        # No match - returns None
        if user is not None:
            login(request,user)
            # login creates a session and in the session we have userID
            return redirect('home')
        else:
            return render(request,'login.html')
    return render(request,'login.html')

@login_required
def home(request):
    return render(request,'home.html')

def logout_handle(request):
    logout(request)
    return redirect('login')