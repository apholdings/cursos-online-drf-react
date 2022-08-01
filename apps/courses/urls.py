from django.urls import path
from .views import *


urlpatterns = [
    path('detail/<uuid:course_uuid>/',CourseDetailView.as_view()),
    path('question/<uuid:question_uuid>/',QuestionView.as_view()),
    path('answer/<uuid:answer_uuid>/',AnswerView.as_view()),
    path("search/<str:search_term>",SearchCourseView.as_view()),

    path("delete",CourseDeleteView.as_view()),

    path("whatlearnt/create/<uuid:course_uuid>/",CreateCourseWhatLearntView.as_view()),
    path("requisite/create/<uuid:course_uuid>/",CreateRequisiteView.as_view()),
    path("requisite/edit/<int:id>/",EditRequisiteView.as_view()),
    path("requisite/delete/<int:id>/",DeleteRequisiteView.as_view()),
    path("review/create/",CreateReviewView.as_view()),
    path("whatlearnt/edit/<int:id>/",EditWhatLearntView.as_view()),
    path("whatlearnt/delete/<int:id>/",DeleteWhatLearntView.as_view()),
    path("edit/<uuid:course_uuid>/",EditCourseView.as_view()),
    path('comment/<uuid:course_uuid>/',AddCommentView.as_view()),

    path('data/<uuid:course_uuid>/',GetCourseData.as_view()),
    path('publish/<uuid:course_uuid>/',PublishCourseView.as_view()),
    path('draft/<uuid:course_uuid>/',DraftCourseView.as_view()),
    path('get-courses', ListCoursesView.as_view()),
    path('search', ListSearchView.as_view()),
    path('related/<uuid:course_uuid>', ListRelatedView.as_view()),

    path('requisites/<uuid:course_uuid>/',GetCourseRequisites.as_view()),
    path('whatlearnt/<uuid:course_uuid>/',GetCourseWhatlearnt.as_view()),
    path('sections/<uuid:course_uuid>/',GetCourseSections.as_view()),
    path('sections/paid/<uuid:course_uuid>/',GetPaidCourseSections.as_view()),
    path('prices/<uuid:course_uuid>/',GetCoursePrices.as_view()),
    path('author/<uuid:course_uuid>/',GetCourseAuthor.as_view()),
    path('details/<uuid:course_uuid>/',GetCourseDetails.as_view()),
    path('questions/<uuid:course_uuid>/',GetCourseQuestions.as_view()),
    path('resources/<uuid:course_uuid>/',GetCourseResources.as_view()),

    path('by/search', ListBySearchView.as_view()),
    path('by/search/paid', ListBySearchPaidView.as_view()),
    path('questions/search/<uuid:course_uuid>/<str:search_term>', SearchCourseQuestionsView.as_view()),

    path('teacher/', CoursesFromTeacherView.as_view()),
    path('user/<username>', CoursesFromUserView.as_view()),

    path('create/',CreateCourseView.as_view()),
    path('course_management/',CourseManageCourseList.as_view()),
    path('course_management/<uuid:course_uuid>/',CourseManage.as_view()),

    path('questions/<uuid:episode_uuid>',QuestionsView.as_view(),),
    path('question/create',QuestionCreateView.as_view(),),
    path('question/update',QuestionUpdateView.as_view(),),
    path('question/delete',QuestionDeleteView.as_view(),),
    path('question/answered',QuestionAnsweredView.as_view(),),

    path('answer/create',CreateAnswerView.as_view(),),
    path('answer/update',EditAnswerView.as_view(),),
    path('answer/delete',DeleteAnswerView.as_view(),),
    path('answer/vote',VoteAnswerView.as_view(),),

    path('section/<uuid:section_uuid>',ViewSection.as_view(),),
    path('section/edit/<uuid:section_uuid>',SectionEditView.as_view(),),
    path('section/delete/<uuid:section_uuid>',SectionDeleteView.as_view(),),
    path('episode/delete/<uuid:episode_uuid>',EpisodeDeleteView.as_view(),),
    path('episode/<uuid:episode_uuid>',ViewEpisode.as_view(),),
    path('episode/edit/<uuid:episode_uuid>',ViewEditEpisode.as_view(),),

    path('course/section/create/',CreateSectionCourseView.as_view(),),
    path('resources/<uuid:course_uuid>',ResourcesListView.as_view(),),
    path('resource/view/<resource_id>',ResourceDetailView.as_view(),),
    path('resource/create/',CreateResourceView.as_view(),),
    path('resource/edit/',EditResourceView.as_view(),),
    path('resource/delete/<resource_id>',ResourceDeleteView.as_view(),),
    path('episode/create/',CreateEpisodeView.as_view(),),

    path('',CoursesHomeView.as_view(),),
    path('<uuid:sector_uuid>/', SectorCourseView.as_view()),

    path('add', AddToLibraryView.as_view()),
    path('remove', RemoveFromLibraryView.as_view()),
    path('courses_library', UserCoursesLibraryListView.as_view()),
    path('courses_library_id', UserCoursesLibraryIDListView.as_view()),
    path('add_paid', AddPaidToLibraryView.as_view()),
    path('remove_paid', RemoveFromPaidLibraryView.as_view()),
    path('courses_library_paid', UserPaidCoursesLibraryListView.as_view()), 
    path('courses_library_paid_paginated', UserPaidCoursesPaginatedLibraryListView.as_view()), 
]
