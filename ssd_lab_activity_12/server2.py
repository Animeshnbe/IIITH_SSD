

def err(msg):
    return {"errorMessage": msg}

@app.route("/do_login", methods = ["POST"])
def do_login():
    if (request.method=="POST"):
        req = request.get_json()
        username = req["un"]
        password = req["pwd"]
        check_user = User.query.filter_by(username = username).first()
        if check_user is not None:
            if (check_user.password == password):
                login_user(check_user)
                return "Logged in successfully"
            else:
                return "Password is incorrect"
        else:
            return "User does not exist"
            
@app.route('/logout')
def logout():
    session.pop('user')         #session.pop('user') help to remove the session from the browser
    return redirect('/login')
    
@app.route("/seats/available", methods=["GET"])
def avl_seats():
    pass