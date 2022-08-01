from django.contrib import admin

from .models import *


class CourseAdmin(admin.ModelAdmin):
    list_display=('id','title', 'price', 'sold',)
    list_display_links = ('id', 'title', )
    list_filter = ('category', )
    list_editable = ('price', )
    search_fields = ('title', 'description', )
    list_per_page = 25
admin.site.register(Course, CourseAdmin)

admin.site.register(CoursesLibrary)
admin.site.register(PaidCoursesLibrary)
admin.site.register(CourseSection)
admin.site.register(Rate)
admin.site.register(WhatLearnt)
admin.site.register(Requisite)
admin.site.register(Resource)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Votes)

class SectorAdmin(admin.ModelAdmin):
    list_display=('id','title',)
    list_editable = ('title', )
    list_per_page = 10
admin.site.register(Sector, SectorAdmin)
admin.site.register(Comment)


class EpisodeAdmin(admin.ModelAdmin):
    list_display=('episode_uuid','title',)
    list_display_links = ('episode_uuid', 'title', )
    list_filter = ('episode_uuid', )
    search_fields = ('episode_uuid', 'content', 'title' )
    list_per_page = 25
admin.site.register(Episode, EpisodeAdmin)