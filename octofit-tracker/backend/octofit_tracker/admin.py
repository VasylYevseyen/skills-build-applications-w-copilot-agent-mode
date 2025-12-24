from django.contrib import admin

from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'team')
    search_fields = ('name', 'email')
    list_filter = ('team',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'type', 'duration', 'date')
    search_fields = ('user__name', 'type')
    list_filter = ('type', 'date')


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'suggested_for')
    search_fields = ('name', 'suggested_for')


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('user', 'score')
    search_fields = ('user__name',)
    list_filter = ('score',)
