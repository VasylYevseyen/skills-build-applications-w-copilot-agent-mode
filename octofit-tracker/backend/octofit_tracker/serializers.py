from rest_framework import serializers

from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout


class _ObjectIdToStringMixin:
    @staticmethod
    def _to_str(value):
        if value is None:
            return None
        return str(value)


class TeamSerializer(_ObjectIdToStringMixin, serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return self._to_str(getattr(obj, 'id', None))

    class Meta:
        model = Team
        fields = ['id', 'name']


class UserSerializer(_ObjectIdToStringMixin, serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()

    def get_id(self, obj):
        return self._to_str(getattr(obj, 'id', None))

    def get_team(self, obj):
        return self._to_str(getattr(obj, 'team_id', None))

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'team']


class ActivitySerializer(_ObjectIdToStringMixin, serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    def get_id(self, obj):
        return self._to_str(getattr(obj, 'id', None))

    def get_user(self, obj):
        return self._to_str(getattr(obj, 'user_id', None))

    class Meta:
        model = Activity
        fields = ['id', 'user', 'type', 'duration', 'date']


class WorkoutSerializer(_ObjectIdToStringMixin, serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return self._to_str(getattr(obj, 'id', None))

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'suggested_for']


class LeaderboardSerializer(_ObjectIdToStringMixin, serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    def get_id(self, obj):
        return self._to_str(getattr(obj, 'id', None))

    def get_user(self, obj):
        return self._to_str(getattr(obj, 'user_id', None))

    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'score']
