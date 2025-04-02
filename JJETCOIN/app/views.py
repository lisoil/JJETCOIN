from flask import Blueprint, render_template
from flask_login import login_required, current_user

views = Blueprint('views',__name__)

@views.route('/')
@views.route('/index')
def home():
    return render_template("index.html", user=current_user)

@views.route('/userinfo')
# @login_required
def userinfo():
    return render_template("userinfo.html", user=current_user)

@views.route('/games')
# @login_required
def games():
    return render_template("games.html", user=current_user)

@views.route('/transactions')
# @login_required
def transactions():
    return render_template("transactions.html", user=current_user)

@views.route('/exchange')
# @login_required
def exchange():
    return render_template("exchange.html", user=current_user)

