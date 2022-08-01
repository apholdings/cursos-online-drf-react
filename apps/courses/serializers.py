from apps.category.models import Category
from .models import CoursesLibrary, PaidCoursesLibrary
from rest_framework import serializers
from apps.user.serializers import UserSerializer

from .models import *


class CourseDisplaySerializer(serializers.ModelSerializer):
    rating=serializers.IntegerField(source='get_rating')
    student_no = serializers.IntegerField(source='get_enrolled_students')
    price=serializers.IntegerField(source='get_price')
    class Meta:
        model=Course
        fields=[
            'course_uuid',
            'title',
            'rating',
            'student_no',
            'author',
            'price',
            'get_thumbnail',
            'best_seller',
            'payment'
        ]



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        exclude=[
            'id'
        ]


class QuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'question_uuid',
            'user',
            'title',
            'body',
            'created_date',
            'update_date',
            'has_accepted_answer',
            'get_answers_count',
        ]


class AnswerSerializer(serializers.ModelSerializer):
    question = QuestionAnswerSerializer()
    class Meta:
        model = Answer
        fields = [
            'answer_uuid',
            'user',
            'question',
            'body',
            'created_date',
            'update_date',
            'votes',
            'is_accepted_answer',
            'calculate_votes',
        ]



class QuestionSerializer(serializers.ModelSerializer):
    get_answers=AnswerSerializer(many=True)
    class Meta:
        model = Question
        fields = [
            'question_uuid',
            'user',
            'title',
            'body',
            'created_date',
            'update_date',
            'has_accepted_answer',
            'get_answers_count',
            'get_answers'
        ]


class EpisodeUnPaidSerializer(serializers.ModelSerializer):
    length=serializers.CharField(source='get_video_length_time')
    class Meta:
        model=Episode
        fields=[
            "title",
            "length",
            "episode_uuid",
            "episode_number",
        ]



class CourseSectionUnPaidSerializer(serializers.ModelSerializer):
    episodes=EpisodeUnPaidSerializer(many=True)
    total_duration=serializers.CharField(source='total_length')
    class Meta:
        model=CourseSection
        fields=[
            "section_title",
            "section_number",
            "episodes",
            "total_duration",
            "section_uuid"
        ]

class WhatLearntSerializer(serializers.ModelSerializer):
    class Meta:
        model= WhatLearnt
        fields = [
            "title",
            "id"
        ]


class RequisiteSerializer(serializers.ModelSerializer):
    class Meta:
        model= Requisite
        fields = [
            "title",
            "id"
        ]

class ResourceSerializer(serializers.ModelSerializer):
    file=serializers.CharField(source='get_absolute_url')
    class Meta:
        model= Resource
        fields = [
            "title",
            "file",
            "url",
            "id"
        ]

class CourseUnPaidSerializer(serializers.ModelSerializer):
    comments=CommentSerializer(many=True)
    course_section = CourseSectionUnPaidSerializer(many=True)
    student_no=serializers.IntegerField(source='get_enrolled_students')
    total_lectures=serializers.IntegerField(source="get_total_lectures")
    total_duration=serializers.CharField(source='total_course_length')
    thumbnail=serializers.CharField(source='get_thumbnail')
    sales_video=serializers.CharField(source='get_video')
    rating=serializers.IntegerField(source='get_rating')
    student_rating=serializers.IntegerField(source='get_no_rating')
    price=serializers.IntegerField(source='get_price')
    what_learnt = WhatLearntSerializer(many=True)
    requisite = RequisiteSerializer(many=True)
    class Meta:
        model=Course
        fields=[
            "course_uuid",
            "title",
            "thumbnail",
            "description",
            "created",
            "updated",
            "rating",
            "student_rating",
            "author",
            "language",
            "course_length",
            "course_section",
            "comments",
            "price",
            "compare_price",
            "category",
            "sold",
            "student_no",
            "total_lectures",
            "total_duration",
            "best_seller",
            "sales_video",
            "what_learnt",
            "requisite",
            "status",
            'payment'
        ]


class CourseDetailSerializer(serializers.ModelSerializer):
    total_lectures=serializers.IntegerField(source="get_total_lectures")
    total_duration=serializers.CharField(source='total_course_length')
    price=serializers.IntegerField(source='get_price')
    class Meta:
        model=Course
        fields=[
            "course_length",
            "price",
            "category",
            "total_lectures",
            "total_duration",
            'payment'
        ]



class CourseDetailsSerializer(serializers.ModelSerializer):
    total_lectures=serializers.IntegerField(source="get_total_lectures")
    total_duration=serializers.CharField(source='total_course_length')
    student_rating=serializers.IntegerField(source='get_rating')
    student_rating_no=serializers.IntegerField(source='get_no_rating')
    author=UserSerializer()
    class Meta:
        model=Course
        fields=[
            "course_uuid",
            "author",
            "title",
            "thumbnail",
            "description",
            "updated",
            "created",
            "date_watched",
            "course_length",
            "language",
            "best_seller",
            "sales_video",
            'status',
            "total_lectures",
            "total_duration",
            "category",
            'student_rating',
            'student_rating_no',
            'payment',
            'price'
        ]



class CoursesListSerializer(serializers.ModelSerializer):
    author = UserSerializer(())
    student_rating=serializers.IntegerField(source='get_rating')
    student_rating_no=serializers.IntegerField(source='get_no_rating')
    class Meta:
        model = Course
        fields=[
            "course_uuid",
            "title",
            "thumbnail",
            "description",
            "price",
            "best_seller",
            "author",
            "updated",
            'sales_video',
            'student_rating',
            'student_rating_no',
            'payment'
        ]



class CoursesListNonAuthorSerializer(serializers.ModelSerializer):
    student_rating=serializers.IntegerField(source='get_rating')
    student_rating_no=serializers.IntegerField(source='get_no_rating')
    class Meta:
        model = Course
        fields=[
            "course_uuid",
            "title",
            "thumbnail",
            "description",
            "price",
            "best_seller",
            "author",
            "updated",
            'sales_video',
            'student_rating',
            'student_rating_no',
            'payment'
        ]


class VotesSerializer(serializers.ModelSerializer):
    answer = AnswerSerializer()
    class Meta:
        model = Votes
        fields = [
            'user',
            'answer',
            'vote',
            'date',
        ]



class EpisodePaidSerializer(serializers.ModelSerializer):
    length=serializers.CharField(source='get_video_length_time')
    file=serializers.CharField(source='get_absolute_url')
    class Meta:
        model=Episode
        fields=[
            "episode_uuid",
            "episode_number",
            "title",
            "file",
            "length",
            "content",
        ]



class CourseSectionPaidSerializer(serializers.ModelSerializer):
    episodes=EpisodePaidSerializer(many=True)
    total_duration=serializers.CharField(source='total_length')
    class Meta:
        model=CourseSection
        fields=[
            "section_title",
            "section_number",
            "episodes",
            "total_duration",
            "section_uuid"
        ]



class CourseSectionUnPaidSerializer(serializers.ModelSerializer):
    episodes=EpisodeUnPaidSerializer(many=True)
    total_duration=serializers.CharField(source='total_length')
    class Meta:
        model=CourseSection
        fields=[
            "section_title",
            "section_number",
            "episodes",
            "total_duration",
            "section_uuid"
        ]



class CoursePaidSerializer(serializers.ModelSerializer):
    # best_seller=serializers.BooleanField(source='get_best_seller')
    comments=CommentSerializer(many=True)
    course_section=CourseSectionPaidSerializer(many=True)
    student_rating=serializers.IntegerField(source='get_rating')
    student_rating_no=serializers.IntegerField(source='get_no_rating')
    student_no=serializers.IntegerField(source='get_enrolled_students')
    total_lectures=serializers.IntegerField(source="get_total_lectures")
    total_duration=serializers.CharField(source='total_course_length')
    price=serializers.IntegerField(source='get_price')
    class Meta:
        model=Course
        fields=[
            "course_uuid",
            "title",
            "get_thumbnail",
            "description",
            "created",
            "updated",
            "rating",
            "student_rating",
            "student_rating_no",
            "author",
            "language",
            "course_length",
            "course_section",
            "comments",
            "price",
            "student_no",
            "total_lectures",
            "total_duration",
            "best_seller",
            'payment'
        ]



class CourseListSerializer(serializers.ModelSerializer):
    student_no=serializers.IntegerField(source='get_enrolled_students')
    description=serializers.CharField(source='get_brief_description')
    thumbnail=serializers.CharField(source='get_thumbnail')
    class Meta:
        model=Course
        fields=[
            'course_uuid',
            "title",
            'student_no',
            "price",
            "thumbnail",
            'description',
            'best_seller',
            'get_rating',
            'get_no_rating',
            'payment'
        ]



class CourseUUIDSerializer(serializers.ModelSerializer):
    class Meta:
        model=Course
        fields=[
            'course_uuid',
        ]


class CoursesLibrarySerializer(serializers.ModelSerializer):
    courses = CoursesListSerializer(many=True)
    author = UserSerializer()
    class Meta:
        model=CoursesLibrary
        fields=[
            'author',
            'courses'
        ]



class CoursesUUIDLibrarySerializer(serializers.ModelSerializer):
    courses = CourseUUIDSerializer(many=True)
    author = UserSerializer()
    class Meta:
        model=CoursesLibrary
        fields=[
            'author',
            'courses'
        ]


class UserCoursesLibrary(serializers.ModelSerializer):
    courses = CourseDetailsSerializer(many=True)
    author = UserSerializer()
    class Meta:
        model = CoursesLibrary
        fields=[
            'author',
            'courses',
        ]


class UserPaidCoursesLibrary(serializers.ModelSerializer):
    courses = CourseDetailsSerializer(many=True)
    author = UserSerializer()
    class Meta:
        model = PaidCoursesLibrary
        fields=[
            'author',
            'courses',
        ]



class CoursesManageListSerializer(serializers.ModelSerializer):
    # best_seller=serializers.BooleanField(source='get_best_seller')
    thumbnail=serializers.CharField(source='get_thumbnail')
    class Meta:
        model=Course
        fields=[
            "course_uuid",
            "title",
            "thumbnail",
            "description",
            "language",
            "comments",
            "best_seller",
            "status",
            "created",
            'payment'
        ]