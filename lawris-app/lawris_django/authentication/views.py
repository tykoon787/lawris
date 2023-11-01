from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages

def user_signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        try:
            user = User.objects.create_user(username, email, password)
            messages.success(request, 'Account created successfully')
            login(request, user)
            request.session['username'] = username
            return redirect('http://localhost:8000/')  # Replace with a desired URL
        except:
            messages.error(request, 'An error occurred during signup')
    return render(request, 'signup.html')  # Replace with the signup template name

def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            request.session['username'] = username
            return redirect('http://localhost:8000/')
        else:
            messages.error(request, 'Invalid credentials')
    return render(request, 'login.html')

def user_logout(request):
    if 'username' in request.session:
        del request.session['username']
    logout(request)
    return redirect('http://localhost:8000/')
