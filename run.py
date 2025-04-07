from app import create_app

print("\n***Don't run this file ignore how it's named run***\n")
print("\n***Run jserver.py instead***\n")

app = create_app()



if __name__ == '__main__':
    app.run(debug=True)