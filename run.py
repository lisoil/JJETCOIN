from flask import Flask, render_template, request
from waitress import serve
from app import create_app
from app.auth import get_username
from flask_login import login_required, current_user


print("\n***Welcome to JJETCOIN, traveler.***\n")

app = create_app()
username = get_username()

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', user=current_user, username=username)

@app.route('/userinfo')
def userinfo():
    return render_template('userinfo.html', user=current_user, username=username)

@app.route('/games/')
def games():
    return render_template('games.html', user=current_user, username=username)

@app.route('/transactions')
def transactions():
    return render_template('transactions.html', user=current_user, username=username)

@app.route('/games/blackjack')
def blackjack():
    return render_template('blackjack.html')

@app.route('/games/gacha')
def gacha():
    return render_template('gacha.html', user=current_user)

@app.route('/login')
def login():
    return render_template('login.html', user=current_user)

@app.route('/signup')
def signup():
    return render_template('sign_up.html', user=current_user)


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True)