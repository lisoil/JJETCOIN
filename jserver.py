from flask import Flask, render_template, request
from waitress import serve
from stonks import get_stonks_data

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/user-info')
def get_user_info():
    return render_template('user-info.html')

@app.route('/games')
def get_games():
    return render_template('games.html')

@app.route('/stonks')
def get_stonks():
    return render_template('stonks.html')


if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=8000)