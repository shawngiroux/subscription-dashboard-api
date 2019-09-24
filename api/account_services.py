from flask import Blueprint, redirect, render_template, request, url_for
from .db import createEngine, generateSession, User
from argon2 import PasswordHasher

bp = Blueprint('account_services', __name__, url_prefix='/AccountServices')


@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.get_json().get('username')
        password = request.get_json().get('password')

        ph = PasswordHasher()
        hash = ph.hash(password)
        new_user = User(fld_username=username, fld_password=hash)

        try:
            session = generateSession()
            session.add(new_user)
            session.commit()
            return redirect(url_for('account_services.authenticate'))
        except Exception as err:
            print(err)
            return False

    return render_template('account_services/register.html')


@bp.route('/authenticate', methods=('GET', 'POST'))
def authenticate():
    if request.method == 'POST':
        # post api logic here
        return False

    return render_template('account_services/authenticate.html')
