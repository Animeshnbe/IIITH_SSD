from flask import (Flask, render_template, request, redirect, session)

@app.route('/login', methods = ['POST', 'GET'])
def login():
    if(request.method == 'POST'):
        username = request.form.get('username')
        password = request.form.get('password')     
        if username == user['username'] and password == user['password']:
            
            session['user'] = username
            return redirect('/dashboard')

        return "<h1>Wrong username or password</h1>"

    return render_template("login.html")

def sign_in():
    un = input("Enter username> ")
    pwd = 

    payload = {
        "un": un,
        "pwd": pwd
    }

    resp = requests.post(SERVER_URI, json = payload).content.decode()