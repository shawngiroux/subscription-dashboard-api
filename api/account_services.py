from flask import (
    Blueprint, render_template, request
)

bp = Blueprint('account_services', __name__, url_prefix='/AccountServices')


@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        # post api logic here
        print("Something happened")
        return False

    return render_template('account_services/register.html')


@bp.route('/authenticate', methods=('GET', 'POST'))
def authenticate():
    if request.method == 'POST':
        # post api logic here
        return False

    return render_template('account_services/authenticate.html')
