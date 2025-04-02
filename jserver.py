from flask import Flask, render_template, request
from waitress import serve
from exchange import get_exchange_rates

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/userinfo')
def userinfo():
    return render_template('userinfo.html')

@app.route('/games/')
def games():
    return render_template('games.html')

@app.route('/exchange')
def exchange():

    currency_data = get_exchange_rates()

    return render_template(
        'exchange.html',
        currency="USD",
        rate=currency_data['usd']['usd']
    )

    # return str(currency_data)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=8000)