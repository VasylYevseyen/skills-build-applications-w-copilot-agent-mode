from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone
from datetime import date
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):

        # Drop collections directly using PyMongo
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        for collection in ['leaderboard', 'activities', 'users', 'teams', 'workouts']:
            db[collection].drop()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc)

        # Workouts
        w1 = Workout.objects.create(name='Super Strength', description='Heavy lifting and power moves', suggested_for='Marvel')
        w2 = Workout.objects.create(name='Flight Training', description='Aerobic and flight simulation', suggested_for='DC')

        # Activities
        Activity.objects.create(user=tony, type='Running', duration=30, date=date.today())
        Activity.objects.create(user=steve, type='Cycling', duration=45, date=date.today())
        Activity.objects.create(user=bruce, type='Martial Arts', duration=60, date=date.today())
        Activity.objects.create(user=clark, type='Flying', duration=50, date=date.today())

        # Leaderboard
        Leaderboard.objects.create(user=tony, score=100)
        Leaderboard.objects.create(user=steve, score=90)
        Leaderboard.objects.create(user=bruce, score=95)
        Leaderboard.objects.create(user=clark, score=98)

        # Ensure unique index on email
        db.users.create_index([('email', 1)], unique=True)
        self.stdout.write(self.style.SUCCESS('Database populated with test data.'))
