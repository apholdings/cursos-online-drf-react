from django.db import models
from django.core.validators import MaxValueValidator,MinValueValidator
from django.conf import settings
from apps.user.models import UserAccount as User


import uuid
from decimal import Decimal
from .helpers import get_timer
from mutagen.mp4 import MP4,MP4StreamInfoError
from django.utils import timezone
from .validators import validate_is_video
from apps.category.models import Category


def course_directory_path(instance, filename):
    return 'courses/{0}/{1}'.format(instance.title, filename)

def sector_directory_path(instance, filename):
    return 'courses/sector/{0}/{1}'.format(instance.title, filename)

def chapter_directory_path(instance, filename):
    return 'courses/{0}/{1}/{2}'.format(instance.course, instance.title, filename)

def lesson_directory_path(instance, filename):
    return 'courses/{0}/{1}/Lesson #{2}: {3}/{4}'.format(instance.course, instance.chapter, instance.lesson_number,instance.title, filename)


class Course(models.Model):
    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')
    
    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    
    languages = (
        ('espanol', 'Espanol'),
        ('english', 'English'),
    )

    payment = (
        ('paid', 'Paid'),
        ('free', 'Free'),
    )

    course_uuid =       models.UUIDField(default=uuid.uuid4, unique=True)

    author =            models.ForeignKey(User, on_delete=models.CASCADE)

    title =             models.CharField(max_length=255)
    thumbnail =         models.ImageField(upload_to=course_directory_path)
    sales_video =       models.FileField(upload_to=course_directory_path)
    description =       models.TextField()

    created =           models.DateTimeField(auto_now_add=True)
    updated =           models.DateTimeField(auto_now=True)

    what_learnt =       models.ManyToManyField('WhatLearnt',blank=True)
    requisite =         models.ManyToManyField('Requisite',blank=True)

    rating =            models.ManyToManyField('Rate',blank=True)
    student_rating =    models.IntegerField(default=0)

    language =          models.CharField(max_length=50, choices=languages)

    course_length =     models.CharField(default=0,max_length=20)
    course_section =    models.ManyToManyField('CourseSection', blank=True)
    comments =          models.ManyToManyField('Comment', blank=True)

    payment = models.CharField(max_length=100, choices=payment, default='paid')

    price =             models.DecimalField(max_digits=18, decimal_places=2)
    compare_price =     models.DecimalField(max_digits=18,decimal_places=18, blank=True, null=True)

    category =          models.ForeignKey(Category, on_delete=models.PROTECT)

    sold =              models.IntegerField(default=0, blank=True)
    best_seller =       models.BooleanField(default=False)

    resources =         models.ManyToManyField('Resource', blank=True)
    questions =         models.ManyToManyField('Question', blank=True)

    published =         models.DateTimeField(default=timezone.now)
    status =            models.CharField(max_length=10, choices=options, default='draft')

    objects =           models.Manager()  # default manager
    postobjects =       PostObjects()  # custom manager

    def __str__(self):
        return self.title

    def get_video(self):
        if self.thumbnail:
            return self.sales_video.url
        return ''

    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        return ''

    def get_rating(self):
        ratings=self.rating.all()
        rate=0
        for rating in ratings:
            rate+=rating.rate_number
        try:
            rate/=len(ratings)
        except ZeroDivisionError:
            rate=0
        return rate

    def get_no_rating(self):
        return len(self.rating.all())

    def get_brief_description(self):
        return self.description[:100]

    def get_total_lectures(self):
        lectures=0
        for section in self.course_section.all():
            lectures+=len(section.episodes.all())
        return lectures

    def total_course_length(self):
        length=Decimal(0.00)
        for section in self.course_section.all():
            for episode in section.episodes.all():
                length +=episode.length
        return get_timer(length)

    class Meta:
        ordering = ('-created',)


class Rate(models.Model):
    rate_number=models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(5)])
    user =              models.CharField(max_length=255)


class WhatLearnt(models.Model):
    title =             models.CharField(max_length=255)
    user =              models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Requisite(models.Model):
    title =             models.CharField(max_length=255)
    user =              models.CharField(max_length=255)

    def __str__(self):
        return self.title



class CourseSection(models.Model):
    section_title =     models.CharField(max_length=255, blank=True, null=True)
    section_number =    models.IntegerField(blank=True, null=True)
    episodes =          models.ManyToManyField('Episode', blank=True)
    section_uuid =      models.UUIDField(default=uuid.uuid4, unique=True)
    user =              models.CharField(max_length=255)

    class Meta:
        ordering = ('section_number',)

    def __str__(self):
        return self.section_title

    def total_length(self):
        total=Decimal(0.00)
        for episode in self.episodes.all():
            total+=episode.length
        return get_timer(total,type='min')
        

class Episode(models.Model):
    episode_uuid =      models.UUIDField(default=uuid.uuid4, unique=True)
    title =             models.CharField(max_length=255)
    file =              models.FileField(upload_to=course_directory_path, validators=[validate_is_video])
    content =           models.TextField()
    length =            models.DecimalField(max_digits=100, decimal_places=2)
    resources =         models.ManyToManyField('Resource', blank=True)
    questions =         models.ManyToManyField('Question', blank=True)
    episode_number =    models.IntegerField(blank=True, null=True)
    user =              models.CharField(max_length=255)

    class Meta:
        ordering = ('episode_number',)

    def __str__(self):
        return self.title

    def get_video_length(self):
        try:
            video=MP4(self.file)
            return video.info.length
            
        except MP4StreamInfoError:
            return 0.0

    def get_video_length_time(self):
        return get_timer(self.length)

    def save(self,*args, **kwargs):
        self.length=self.get_video_length()
        return super().save(*args, **kwargs)


class Question(models.Model):
    question_uuid = models.UUIDField(default=uuid.uuid4, unique=True)
    user = models.CharField(max_length=255)
    title = models.CharField(max_length=100)
    body = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now_add=True)
    has_accepted_answer = models.BooleanField(default=False)

    class Meta:
        ordering = ('-created_date',)

    def __str__(self):
        return self.title

    def get_answers_count(self):
        return Answer.objects.filter(question=self).count()

    def get_answers(self):
        return Answer.objects.filter(question=self)



class Answer(models.Model):
    answer_uuid = models.UUIDField(default=uuid.uuid4, unique=True)
    user = models.CharField(max_length=255)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    body = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now_add=True)
    votes = models.IntegerField(default=0)
    is_accepted_answer = models.BooleanField(default=False)

    class Meta:
        ordering = ('-created_date',)

    def __str__(self):
        return self.user.first_name + ' ' + self.user.last_name

    def calculate_votes(self):
        u_votes = Votes.objects.filter(answer=self, vote='U').count()
        d_votes = Votes.objects.filter(answer=self, vote='D').count()
        self.votes = u_votes - d_votes
        self.save()
        return self.votes

VOTES_CHOICES = (
	('U', 'Up Vote'),
	('D', 'Down Vote'),
)

class Votes(models.Model):
	user =          models.CharField(max_length=255)
	answer =        models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='answer_votes')
	vote =          models.CharField(choices=VOTES_CHOICES, max_length=1)
	date =          models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ('-date',)


class Resource(models.Model):
    title =             models.CharField(max_length=255)
    file =              models.FileField(upload_to=course_directory_path, blank=True, null=True)
    url =               models.URLField(blank=True, null=True)
    user =              models.CharField(max_length=255)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return self.file.url


class Comment(models.Model):
    user =              models.CharField(max_length=255)
    message =           models.TextField()
    created =           models.DateTimeField(auto_now_add=True)



class Sector(models.Model):
    title =             models.CharField(max_length=255)
    sub_title =         models.CharField(max_length=255)
    description =       models.TextField()
    sector_uuid =       models.UUIDField(default=uuid.uuid4, unique=True)
    related_courses =   models.ManyToManyField('Course', blank=True)
    thumbnail =         models.ImageField(upload_to=sector_directory_path)

    def __str__(self):
        return self.title

    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        return ''


class CoursesLibrary(models.Model):
	author =  models.ForeignKey(User, on_delete=models.CASCADE)
	courses = models.ManyToManyField(Course, blank=True)

	class Meta:
		verbose_name_plural="Bookmarked Courses Library"

	def __str__(self):
		return self.author.account



class PaidCoursesLibrary(models.Model):
	author =  models.ForeignKey(User, on_delete=models.CASCADE)
	courses = models.ManyToManyField(Course, blank=True)

	class Meta:
		verbose_name_plural="Purchased Courses Library"

	def __str__(self):
		return self.author.account