from flask import Flask


def create_app():
    app = Flask(__name__, instance_relative_config=True)

    from . import db
    db.init_app(app)

    from . import account_services
    app.register_blueprint(account_services.bp)

    return app
