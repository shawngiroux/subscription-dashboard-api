from sqlalchemy import (
    create_engine, Column, Integer, String
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import os
import click
from flask.cli import with_appcontext


def init_app(app):
    app.cli.add_command(init_db_command)


def createEngine():
    user = os.environ['DB_USERNAME']
    password = os.environ['DB_PASSWORD']
    host = os.environ['DB_HOSTNAME']
    port = os.environ['DB_PORT']
    database = os.environ['USER_DB']

    conn_string = "mysql+pymysql://%s:%s@%s:%s/%s" % (
        user, password, host, port, database
    )

    engine = create_engine(conn_string)
    return engine


def init_db():
    engine = createEngine()

    # Table descriptions
    Base = declarative_base()

    class User(Base):
        __tablename__ = 'tbl_users'

        id = Column(Integer, primary_key=True)
        fld_username = Column(String(60), unique=True, nullable=False)
        fld_password = Column(String(128), nullable=False)

    # Create tables
    Base.metadata.create_all(engine)


def generateSession():
    engine = createEngine()
    Session = sessionmaker()
    Session.configure(bind=engine)

    session = Session()
    return session


@click.command('init-db')
@with_appcontext
def init_db_command():
    init_db()
    click.echo('Initialized databases')
