from flask import Flask, render_template
from waitress import serve
from __init__ import create_app

app = create_app()

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=8000)