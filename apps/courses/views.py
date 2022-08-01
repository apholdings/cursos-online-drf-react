import math
from uuid import uuid4
import uuid
from django.http.response import HttpResponse
from django.core.exceptions import ValidationError
from apps.user.models import  UserAccount
from apps.courses.serializers import UserCoursesLibrary

from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser

from django.core.cache import cache

from django.core.mail import send_mail

from .pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination

from django.shortcuts import get_object_or_404
from django.http.response import HttpResponseBadRequest, HttpResponseNotAllowed
from django.db.models.query_utils import Q

from .models import Comment, Rate, Requisite, Sector, Course, Episode, Answer, Question, Votes, CourseSection, Resource, WhatLearnt, CoursesLibrary, PaidCoursesLibrary
import json
from decimal import Decimal
from .serializers import *
from apps.category.models import Category
# Define Views
from django.conf import settings
domain = settings.DOMAIN


class CoursesHomeView(APIView):
    def get(self, request, *args, **kwargs):
        sectors = Sector.objects.order_by('?')[:6]

        sector_response = []

        for sector in sectors:
            sector_courses = sector.related_courses.order_by('?')[:4]
            courses_Serializer=CourseDisplaySerializer(sector_courses, many=True)

            sector_obj={
                'sector_name': sector.title,
                'sector_subtitle': sector.sub_title,
                'sector_uuid': sector.sector_uuid,
                'featured_course': courses_Serializer.data,
                'sector_image': sector.get_thumbnail(),
                'description': sector.description,
            }

            sector_response.append(sector_obj)

        return Response(data=sector_response, status=status.HTTP_200_OK)


class CourseDetailView(APIView):
    def get(self,request,course_uuid,*args, **kwargs):
        try:
            course=Course.objects.filter(course_uuid=course_uuid)
        except ValidationError:
            return HttpResponseBadRequest('Invalid Course uuid')
        
        if not course:
            return HttpResponseBadRequest('Course does not exist')
        
        serializer=CourseDetailSerializer(course[0])
        
        return Response({'product':serializer.data},status=status.HTTP_200_OK)


class CourseStudyView(APIView):
    permission_classes=[permissions.IsAuthenticated]
    def get(self,request,course_uuid):
        check_course=Course.postobjects.filter(course_uuid=course_uuid)

        if not check_course:
            return HttpResponseBadRequest('Course does not exist')

        course=Course.postobjects.filter(course_uuid=course_uuid)[0]

        pricing_tiers = course.pricing_tiers.all()

        subscription_pricing = request.user.subscription.pricing
        
        subscription_status = request.user.subscription.status

        # pricing_tier = subscription.pricing
        
        subscription_is_active = subscription_status == "active" or subscription_status == "trialing"
        
        for p in pricing_tiers:
            if not subscription_pricing in pricing_tiers.all():
                return HttpResponseBadRequest('User doesnt have access to view this')

        # user_course=request.user.paid_course.filter(course_uuid=course_uuid)
        # if not pricing_tier in course.pricing_tiers.all() and subscription_is_active:
        #     return HttpResponseNotAllowed("User has not purchased this course")

        serializer=CoursePaidSerializer(course)
        return Response({'product':serializer.data},status=status.HTTP_200_OK)


class SectorCourseView(APIView):
    def get(self, request, sector_uuid, *args, **kwargs):
        sector = Sector.objects.filter(sector_uuid=sector_uuid)

        if not sector:
            return HttpResponseBadRequest('Sector does not exist')

        sector_courses=sector[0].related_courses.all()
        serializer=CourseListSerializer(sector_courses, many=True)
        
        total_students=0
        for course in sector_courses:
            total_students+=course.get_enrolled_students()

        return Response({
            'data':serializer.data,
            'sector_name':sector[0].title,
            'total_students':total_students,

        }, status=status.HTTP_200_OK)


class SearchCourseView(APIView):

    def get(self,request,search_term):
        matches= Course.postobjects.filter(Q(title__icontains=search_term)|
            Q(description__icontains=search_term)|Q(category__name__icontains=search_term))

        paginator = MediumSetPagination()
        # results = paginator.paginate_queryset(matches, request)
        serializer = CoursesListSerializer(matches, many=True)
        return Response({'filtered_courses':serializer.data},status=status.HTTP_200_OK)


class CourseManageCourseList(APIView):
    permission_classes=[permissions.IsAuthenticated]
    def get(self,request,*args, **kwargs):
        courses=Course.postobjects.filter(author=request.user)
        serializer=CoursesManageListSerializer(courses,many=True)

        return Response(data=serializer.data,status=status.HTTP_200_OK)


class CourseManage(APIView):
    permission_classes=[permissions.IsAuthenticated]

    def patch(self,request,course_uuid,*args, **kwargs):
        course=Course.postobjects.filter(course_uuid=course_uuid,author=request.user)

        if not course:
            return HttpResponseBadRequest()

        serializer=CoursePaidSerializer(request.data,instance=course[0])

        if serializer.is_valid():
            data=serializer.save()
        
        return Response(data=data,status=status.HTTP_201_CREATED)


class AddCommentView(APIView):
    permission_classes=[permissions.IsAuthenticated]
    def post(self,request,course_uuid,*args, **kwargs):
        try:
            course=Course.postobjects.get(course_uuid=course_uuid)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        content=json.loads(request.body)

        if not content.get('message'):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CommentSerializer(data=content)

        if serializer.is_valid():
            comment=serializer.save(user=request.user)

            course.comments.add(comment)

            return Response(status=status.HTTP_200_OK)

        else:
            return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class ListCoursesView(APIView):
    def get(self, request, format=None):

        sortBy = request.query_params.get('sortBy')
        if not (sortBy == 'created' or sortBy == 'price' or sortBy == 'sold' or sortBy == 'name'):
            sortBy = 'created'

        order = request.query_params.get('order')
        limit = request.query_params.get('limit')

        if not limit:
            limit = 20

        if order == 'desc':
            sortBy = '-' + sortBy
            courses = Course.postobjects.order_by(sortBy).all()[:int(limit)]
        elif order == 'asc':
            courses = Course.postobjects.order_by(sortBy).all()[:int(limit)]
        else:
            courses = Course.postobjects.order_by(sortBy).all()
            

        courses = CoursesListSerializer(courses, many=True)

        if courses:
            return Response({'courses': courses.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No courses to list'}, status=status.HTTP_404_NOT_FOUND)


class ListSearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        try:
            category_id = int(data['category_id'])
        except:
            return Response(
                {'error': 'Category ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        search = data['search']

        # Check if anything was put into search field
        if len(search) == 0:
            # If no search criteria, then grab all products
            search_results = Course.postobjects.order_by('-created').all()
        else:
            # If there was search criteria, filter by description as well as name containing search data
            search_results = Course.postobjects.filter(
                Q(description__icontains=search) | Q(title__icontains=search)
            )

        # Category ID of 0 means ALL CATEGORIES
        if category_id == 0:
            search_results = CoursesListSerializer(search_results, many=True)
            return Response(
                {'search_courses': search_results.data},
                status=status.HTTP_200_OK)

        # Check whether the category exists
        if not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'Category not found'},
                status=status.HTTP_404_NOT_FOUND)

        category = Category.objects.get(id=category_id)

        # If category has a parent, filter only by this category and not the parent as well
        if category.parent:
            search_results = search_results.order_by(
                '-created'
            ).filter(category=category)
        # If category does not have a parent category, meaning that it itself is a parent category
        else:
            # If this parent category does not have any children categories
            # then just filter by the category itself
            if not Category.objects.filter(parent=category).exists():
                search_results = search_results.order_by(
                    '-created'
                ).filter(category=category)
            # If this parent category has children, filter by both the parent category and it's children
            else:
                categories = Category.objects.filter(parent=category)
                filtered_categories = [category]

                for cat in categories:
                    filtered_categories.append(cat)

                filtered_categories = tuple(filtered_categories)
                search_results = search_results.order_by(
                    '-created'
                ).filter(category__in=filtered_categories)

        search_results = CoursesListSerializer(search_results, many=True)
        return Response({'search_courses': search_results.data}, status=status.HTTP_200_OK)


class ListRelatedView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, course_uuid, format=None):
        try:
            product_id = course_uuid
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        
        # Existe product id
        if not Course.postobjects.filter(course_uuid=product_id).exists():
            return Response(
                {'error': 'Product with this product ID does not exist'},
                status=status.HTTP_404_NOT_FOUND)
            
        category = Course.postobjects.get(course_uuid=product_id).category

        if Course.postobjects.filter(category=category).exists():
            # Si la categoria tiene padrem filtrar solo por la categoria y no el padre tambien
            if category.parent:
                related_products = Course.postobjects.order_by(
                    '-sold'
                ).filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    related_products = Course.postobjects.order_by(
                        '-sold'
                    ).filter(category=category)
                
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)

                    filtered_categories = tuple(filtered_categories)
                    related_products = Course.postobjects.order_by(
                        '-sold'
                    ).filter(category__in=filtered_categories)
                
            #Excluir producto que estamos viendo
            related_products = related_products.exclude(course_uuid=product_id)
            related_products = CoursesListSerializer(related_products, many=True)

            if len(related_products.data) > 4:
                return Response(
                    {'related_products': related_products.data[:4]},
                    status=status.HTTP_200_OK)
            elif len(related_products.data) > 0:
                return Response(
                    {'related_products': related_products.data},
                    status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'No related products found'},
                    status=status.HTTP_200_OK)
            
        else:
            return Response(
                {'error': 'No related products found'},
                status=status.HTTP_200_OK)


class ListBySearchView(APIView):
    def post(self, request, format=None):
        data = self.request.data

        try:
            category_id = int(data['category_id'])
        except:
            return Response(
                {'error': 'Category ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        price_range = data['price_range']
        sort_by = data['sort_by']

        if not (sort_by == 'created' or sort_by == 'price' or sort_by == 'sold' or sort_by == 'name'):
            sort_by = 'created'

        order = data['order']

        # If category ID is 0, then filter by all categories
        if category_id == 0:
            product_results = Course.postobjects.all()
        # Check whether the category ID exists
        elif not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'This category does not exist'},
                status=status.HTTP_404_NOT_FOUND)
        else:
            category = Category.objects.get(id=category_id)

            # If category has a parent, filter only by this category and not the parent as well
            if category.parent:
                product_results = Course.postobjects.filter(category=category)
            else:
                # If this parent category does not have any children categories
                # then just filter by the category itself
                if not Category.objects.filter(parent=category).exists():
                    product_results = Course.postobjects.filter(category=category)
                # If this parent category has children, filter by both the parent category and it's children
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)

                    filtered_categories = tuple(filtered_categories)
                    product_results = Course.postobjects.filter(
                        category__in=filtered_categories)

        # Filter by the price range
        # If data passed for price range isn't equal to one of these cases, then don't filter by price range
        if price_range == '1 - 19':
            product_results = product_results.filter(price__gte=1)
            product_results = product_results.filter(price__lt=20)
        elif price_range == '20 - 39':
            product_results = product_results.filter(price__gte=20)
            product_results = product_results.filter(price__lt=40)
        elif price_range == '40 - 59':
            product_results = product_results.filter(price__gte=40)
            product_results = product_results.filter(price__lt=60)
        elif price_range == '60 - 79':
            product_results = product_results.filter(price__gte=60)
            product_results = product_results.filter(price__lt=80)
        elif price_range == 'More than 80':
            product_results = product_results.filter(price__gte=80)

        # Filter by the order and sort_by
        if order == 'desc':
            sort_by = '-' + sort_by
            product_results = product_results.order_by(sort_by)
        elif order == 'asc':
            product_results = product_results.order_by(sort_by)
        else:
            product_results = product_results.order_by(sort_by)

        # Serialize the product results
        product_results = CoursesListSerializer(product_results, many=True)

        # Check if there were any products found with these filters
        if len(product_results.data) > 0:
            return Response(
                {'filtered_courses': product_results.data},
                status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products found'},
                status=status.HTTP_200_OK)


class ResponsePagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 4


class QuestionsView(APIView):
    def get(self,request,episode_uuid,*args, **kwargs):

        if cache.get(episode_uuid):
            episode = cache.get(episode_uuid)
        else:
            episode = Episode.objects.get(episode_uuid=episode_uuid)
            cache.set(episode_uuid, episode)

        questions = episode.questions.all()

        # Pagination
        paginator = ResponsePagination()
        results = paginator.paginate_queryset(questions, request)

        serializer = QuestionSerializer(results, many=True)

        return paginator.get_paginated_response({'questions':serializer.data})


class QuestionView(APIView):
    def get(self,request,question_uuid,*args, **kwargs):
        try:
            question=Question.objects.filter(question_uuid=question_uuid)
        except ValidationError:
            return HttpResponseBadRequest('Invalid question uuid')
        
        if not question:
            return HttpResponseBadRequest('Question does not exist')
        
        serializer=QuestionSerializer(question[0])
        
        return Response({'question':serializer.data},status=status.HTTP_200_OK)


class AnswerView(APIView):
    def get(self,request,answer_uuid,*args, **kwargs):
        try:
            if cache.get(answer_uuid):
                answer = cache.get(answer_uuid)
            else:
                answer=Answer.objects.filter(answer_uuid=answer_uuid)
                cache.set(answer_uuid, answer)
            
        except ValidationError:
            return HttpResponseBadRequest('Invalid question uuid')
        
        if not answer:
            return HttpResponseBadRequest('Question does not exist')
        
        serializer=AnswerSerializer(answer[0])
        
        return Response({'answer':serializer.data},status=status.HTTP_200_OK)


class QuestionCreateView(APIView):
    def post(self, request, format=None):
        data = self.request.data
        
        user = data["account"]
        title=data["question_title"]
        body=data["question_body"]
        has_accepted_answer=data["has_accepted_answer"]
        course_uuid=data["course_uuid"]

        if has_accepted_answer == 'false':
            has_accepted_answer = bool(False)
        else:
            has_accepted_answer = bool(True)

        question= Question(user=user, title=title, body=body, has_accepted_answer=has_accepted_answer)
        question.save()

        question_uuid = str(question.question_uuid)

        course = Course.objects.get(course_uuid=course_uuid)

        course.questions.add(question)
        return Response({'success': 'Question created successfully'})


class QuestionUpdateView(APIView):
    def put(self, request, format=None):
        try:
            data = self.request.data

            episode=data["episode"]
            question_uuid=data["question_uuid"]
            user = data["account"]
            title=data["question_edit_title"]
            body=data["question_edit_body"]
            has_accepted_answer=data["question_edit_has_accepted_answer"]

            question = get_object_or_404(Question, question_uuid=question_uuid)
            
            question.title = title
            question.body = body
            question.user = user
            question.has_accepted_answer = has_accepted_answer
            question.save()

            return Response({'success': 'Message sent successfully'})
        except:
            return Response({'error': 'Message failed to be sent'})


class QuestionDeleteView(APIView):
    def post(self, request, format=None):
        try:
            data = self.request.data

            confirm_delete=data['delete_accept']
            question_uuid=data["question_uuid"]

            if(confirm_delete):
                question = get_object_or_404(Question, question_uuid=question_uuid)
                question.delete()

                return Response({'success': 'Message sent successfully'})
            else:
                return Response({'error': 'Message failed to be sent'})
        except:
            return Response({'error': 'Message failed to be sent'})


class QuestionAnsweredView(APIView):
    def post(self, request, format=None):
        try:
            data = self.request.data

            has_accepted_answer=data['confirm_accept']
            question_uuid=data["question_uuid"]

            if(has_accepted_answer):
                question = get_object_or_404(Question, question_uuid=question_uuid)
                question.has_accepted_answer = has_accepted_answer
                question.save()

                return Response({'success': 'Message sent successfully'})
            else:
                return Response({'error': 'Message failed to be sent'})
        except:
            return Response({'error': 'Message failed to be sent'})


class CreateAnswerView(APIView):
    def post(self, request, format=None):
        try:
            data = self.request.data

            account = data['account']
            user = UserAccount.objects.get(account=account)

            course_uuid=data['course_uuid']
            question_uuid=data["question_uuid"]
            question = get_object_or_404(Question, question_uuid=question_uuid)
            body=data["answer_body"]
            is_accepted_answer=data['is_accepted_answer']

            answer= Answer(user=user,body=body,question=question, is_accepted_answer=is_accepted_answer)
            answer.save()

            answer_uuid = str(answer.answer_uuid)

            send_mail(
                'Nueva respuesta de '+ question.title,
                'Name '
                + user.first_name + ' ' + user.last_name
                + '\nEmail: '
                + user.email
                + '\n\nMessage url:\n'
                + domain + '/course/study/' + course_uuid + '/question/' + question_uuid + '/answer/' + answer_uuid + '\n'
                + body,
                'Uridium - Tienes una Respuesta <mail@uridium.io>',
                [user.email],
                fail_silently=False
            )

            return Response({'success': 'Message sent successfully'})
        except:
            return Response({'error': 'Message failed to be sent'})


class EditAnswerView(APIView):
    def put(self, request, format=None):
        try:
            data = self.request.data
            user = data["account"]

            answer_uuid=data["answer_uuid"]
            answer = get_object_or_404(Answer, answer_uuid=answer_uuid)

            body=data["answer_edit_body"]
            is_accepted_answer=data['answer_edit_is_accepted_answer']

            answer.body = body
            answer.is_accepted_answer = is_accepted_answer

            answer.save()

            return Response({'success': 'Message sent successfully'})
        except:
            return Response({'error': 'Message failed to be sent'})


class DeleteAnswerView(APIView):
    def post(self, request, format=None):
        try:
            data = self.request.data
            user = data["account"]

            confirm_delete=data['confirm_delete']
            answer_uuid=data["answer_uuid"]
            answer = get_object_or_404(Answer, answer_uuid=answer_uuid)

            if(confirm_delete):
                answer.delete()

            return Response({'success': 'Message sent successfully'})
        except:
            return Response({'error': 'Message failed to be sent'})


class VoteAnswerView(APIView):
    def post(self, request, format=None):
        try:
            data = self.request.data
            
            confirm_vote=data['confirm_vote']
            answer_uuid=data["answer_vote_uuid"]
            answer = get_object_or_404(Answer, answer_uuid=answer_uuid)

            answer.is_accepted_answer = confirm_vote
            answer.save()

            return Response({'success': 'Message sent successfully'})
        except:
            return Response({'error': 'Message failed to be sent'})


class CoursesFromTeacherView(APIView):
    def post(self,request,*args, **kwargs):
        data = self.request.data
        account = data['account']
        user = UserAccount.objects.get(account=account)
        courses = Course.objects.filter(author=user).order_by('-created')

        paginator = LargeSetPagination()
        results = paginator.paginate_queryset(courses, request)
        serializer = CoursesManageListSerializer(results, many=True)

        # for course in courses:
        # serializer=CoursesManageListSerializer(courses, many=True)
        return paginator.get_paginated_response({'courses':serializer.data})


class CoursesFromUserView(APIView):
    def get(self,request, username,*args, **kwargs):
        account = username
        user = UserAccount.objects.get(account=account)
        courses = Course.postobjects.filter(author=user)
        # for course in courses:
        serializer=CoursesListSerializer(courses, many=True)
        return Response({'courses':serializer.data},status=status.HTTP_200_OK)


class CreateCourseView(APIView):

    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        data = self.request.data

        account = data['account']
        title=data['title']
        thumbnail=data['thumbnail']
        sales_video=data['sales_video']
        description=data['description']
        language=data['language']
        category=data['category']
        payment=data['payment']
        price=data['price']

        if price.find(".") == -1:
            price = price + ".0"


        author = get_object_or_404(UserAccount, account=account)
        category = get_object_or_404(Category, id=category)

        course = Course(
            title=title,
            thumbnail=thumbnail,
            sales_video=sales_video,
            description=description,
            language=language,
            category=category,
            author=author,
            payment=payment,
            price=price,
            )
        course.save()

        
        return Response({'success': 'Message sent successfully'})


class EditCourseView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request,course_uuid, format=None):
        data = self.request.data

        account=data['account']

        title=data['title']
        thumbnail=data['thumbnail']
        sales_video=data['sales_video']
        description=data['description']
        language=data['language']
        category=data['category']
        payment=data['payment']
        price=data['price']

        category=data['category']

        category = get_object_or_404(Category, id=category)
        course = get_object_or_404(Course, course_uuid=course_uuid)

        if(account == course.author):
            course.title = title
            course.thumbnail=thumbnail
            course.sales_video=sales_video
            course.description=description
            course.language=language
            course.payment=payment
            course.price=price
            course.save()

        return Response({'success': 'Message sent successfully'})


class PublishCourseView(APIView):
    def post(self, request,course_uuid, format=None):
        course = get_object_or_404(Course, course_uuid=course_uuid)
        course.status = 'published'
        course.save()
        return Response({'success': 'Course published successfully'})


class DraftCourseView(APIView):
    def post(self, request,course_uuid, format=None):
        course = get_object_or_404(Course, course_uuid=course_uuid)
        course.status = 'draft'
        course.save()
        return Response({'success': 'Course published successfully'})


class CreateSectionCourseView(APIView):
    def post(self, request, format=None):
        data = self.request.data
        
        account = data['account']
        user = UserAccount.objects.get(account=account)


        section_title=data['section_title']
        section_number=data['section_number']
        course_uuid=data['course_uuid']

        section = CourseSection(section_title=section_title, section_number=section_number, user=user)
        section.save()

        course = get_object_or_404(Course, course_uuid=course_uuid)

        course.course_section.add(section)


        return Response({'success': 'Message sent successfully'})


class CreateResourceView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, format=None):
        data = self.request.data

        account = data['account']
        user = UserAccount.objects.get(account=account)

        title=data['resource_title']
        file=data['file']
        course_uuid=data['course_uuid']

        course = Course.objects.get(course_uuid=course_uuid)

        if(user == course.author):
            resource = Resource(title=title, file=file, user=user)
            resource.save()
            course.resources.add(resource)

        return Response({'success': 'Message sent successfully'})


class EditResourceView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, format=None):
        data = self.request.data

        account = data['account']
        user = UserAccount.objects.get(account=account)

        title=data['resource_title']
        file=data['file']
        resource_id=data['resource_id']

        resource = Resource.objects.get(id=resource_id)
        
        resource.title = title
        resource.file=file

        resource.save()

        return Response({'success': 'Message sent successfully'})


class ResourceDetailView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, resource_id, format=None):
        resource = get_object_or_404(Resource, id=resource_id)
        serializer = ResourceSerializer(resource)
        return Response({'resource': serializer.data})


class ResourceDeleteView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, resource_id, format=None):
        resource = get_object_or_404(Resource, id=resource_id)
        resource.delete()
        return Response({'success': 'deleted'})


class CreateEpisodeView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, format=None):
        data = self.request.data
        
        user = data["account"]

        title=data["title"]
        section_uuid=data["section_uuid"]
        length=data["length"]
        free=data["free"]
        content=data["content"]
        file=data["file"]
        resource_id=data['resource']
        episode_number=data['episode_number']

        if (resource_id != ''):
            resource_id = int(resource_id)

        if free == '1':
            free = True
        else:
            free = False

        episode = Episode(title=title, length=length, content=content, file=file, free=free, episode_number=episode_number)
        episode.save()

        if (resource_id != ''):
            resource = Resource.objects.get(id=resource_id)
            episode.resources.add(resource)

        section = get_object_or_404(CourseSection, section_uuid=section_uuid)
        section.episodes.add(episode)

        return Response({'success': 'Message sent successfully'})

    
class CreateReviewView(APIView):
    def post(self, request, format=None):
        data = self.request.data
        
        user = data["account"]

        message=data["review_edit_body"]
        course_uuid=data["course_uuid"]
        rating=int(data["review_rating"])

        print(data)

        comment = Comment(user=user, message=message)
        comment.save()

        return Response({'success': 'Comment created successfully'})


class CreateCourseWhatLearntView(APIView):
    def post(self, request, course_uuid, format=None):
        data = self.request.data
        
        account = data['account']
        user = UserAccount.objects.get(account=account)

        title=data['title']
        course = get_object_or_404(Course, course_uuid=course_uuid)

        if(user == course.author):
            whatlearnt = WhatLearnt(title=title, user=user)
            whatlearnt.save()
            course.what_learnt.add(whatlearnt)

        return Response({'success': 'Message sent successfully'})


class CreateRequisiteView(APIView):
    def post(self, request, course_uuid, format=None):
        data = self.request.data
        account = data['account']
        user = UserAccount.objects.get(account=account)

        
        title=data['title']
        course = get_object_or_404(Course, course_uuid=course_uuid)

        requisite = Requisite(title=title , user=user)
        requisite.save()

        course.requisite.add(requisite)

        return Response({'success': 'Requisite added successfully'})





class ResourcesListView(APIView):
    def get(self, request, course_uuid, format=None):
        course = Course.objects.get(course_uuid=course_uuid)
        resources = course.resources
        serializer = ResourceSerializer(resources, many=True)
        return Response({'resources': serializer.data}, status=status.HTTP_200_OK)


class ViewSection(APIView):
    def get(self, request,section_uuid, format=None):
        section = get_object_or_404(CourseSection, section_uuid=section_uuid)
        serializer = CourseSectionPaidSerializer(section)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ViewEpisode(APIView):
    def get(self, request,episode_uuid, format=None):
        episode = get_object_or_404(Episode, episode_uuid=episode_uuid)

        serializer = EpisodePaidSerializer(episode)

        return Response(serializer.data, status=status.HTTP_200_OK)


class ViewEditEpisode(APIView):
    def post(self, request,episode_uuid, format=None):

        data = self.request.data

        title=data["title"]
        length=data["length"]
        free=data["free"]
        content=data["content"]
        file=data["file"]
        resource_id=data['resource']
        episode_number=data['episode_number']

        if (resource_id != ''):
            resource_id = int(resource_id)

        if free == '1':
            free = True
        else:
            free = False

        episode = get_object_or_404(Episode, episode_uuid=episode_uuid)
        episode.title = title
        episode.free = free
        episode.length = length
        episode.content= content
        episode.file=file
        episode.episode_number = episode_number
        episode.save()

        if (resource_id != ''):
            resource = Resource.objects.get(id=resource_id)
            episode.resources.add(resource)


        return Response({'success': 'Message sent successfully'})


class SectionEditView(APIView):

    def post(self, request, section_uuid, format=None):

        data = self.request.data
        
        title=data["title"]
        number=data["number"]

        section = get_object_or_404(CourseSection, section_uuid=section_uuid)
        
        section.section_title = title
        section.section_number = number
        section.save()


        return Response({'success': 'Message sent successfully'})


class CourseDeleteView(APIView):
    def post(self, request, format=None):
        data = self.request.data

        course_uuid=data['course_uuid']
        account=data['account']

        course = get_object_or_404(Course, course_uuid=course_uuid)

        course.delete()

        return Response({'success': 'Message sent successfully'})


class SectionDeleteView(APIView):

    def post(self, request, section_uuid, format=None):

        
        section = get_object_or_404(CourseSection, section_uuid=section_uuid)
        section.delete()


        return Response({'success': 'Message sent successfully'})


class EpisodeDeleteView(APIView):

    def post(self, request, episode_uuid, format=None):

        
        episode = get_object_or_404(Episode, episode_uuid=episode_uuid)
        episode.delete()


        return Response({'success': 'Message sent successfully'})


class EditWhatLearntView(APIView):

    def post(self, request,id, format=None):
        data = self.request.data
        title = data['what_learnt_title']
        whatlearnt = get_object_or_404(WhatLearnt, id=id)
        whatlearnt.title = title
        whatlearnt.save()
        return Response({'success': 'Message sent successfully'})


class EditRequisiteView(APIView):

    def post(self, request,id, format=None):
        data = self.request.data
        title = data['requisite_title']
        requisite = get_object_or_404(Requisite, id=id)
        requisite.title = title
        requisite.save()
        return Response({'success': 'Message sent successfully'})


class DeleteWhatLearntView(APIView):

    def post(self, request,id, format=None):
        whatlearnt = get_object_or_404(WhatLearnt, id=id)
        whatlearnt.delete()
        return Response({'success': 'Message sent successfully'})


class DeleteRequisiteView(APIView):

    def post(self, request,id, format=None):
        requisite = get_object_or_404(Requisite, id=id)
        requisite.delete()
        return Response({'success': 'Message sent successfully'})


class GetCourseData(APIView):
    def get(self,request, course_uuid,*args, **kwargs):

        if Course.objects.filter(course_uuid=course_uuid).exists():

            course = Course.objects.get(course_uuid=course_uuid)

            requisites = course.requisite.all()
            requisites = RequisiteSerializer(requisites, many=True)

            whatlearnt = course.what_learnt.all()
            whatlearnt = WhatLearntSerializer(whatlearnt, many=True)

            sections = course.course_section.all()
            sections = CourseSectionUnPaidSerializer(sections, many=True)

            details = CourseDetailsSerializer(course)

            return Response({
                'requisites':requisites.data,
                'whatlearnt':whatlearnt.data,
                'sections':sections.data,
                'details':details.data,
                },status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Course with this ID does not exist'},
                status=status.HTTP_404_NOT_FOUND)


class GetCourseRequisites(APIView):
    def get(self,request, course_uuid,*args, **kwargs):

        course = Course.objects.get(course_uuid=course_uuid)
        requisites = course.requisite.all()

        # for course in courses:
        serializer=RequisiteSerializer(requisites, many=True)
        
        return Response({'requisites':serializer.data},status=status.HTTP_200_OK)



class GetCourseWhatlearnt(APIView):
    def get(self,request, course_uuid,*args, **kwargs):

        course = Course.objects.get(course_uuid=course_uuid)
        whatlearnt = course.what_learnt.all()

        # for course in courses:
        serializer=WhatLearntSerializer(whatlearnt, many=True)
        
        return Response({'what_learnt':serializer.data},status=status.HTTP_200_OK)


class GetCourseSections(APIView):
    def get(self,request, course_uuid,*args, **kwargs):
        course = Course.objects.get(course_uuid=course_uuid)
        sections = course.course_section.all()
        # for course in courses:
        serializer=CourseSectionUnPaidSerializer(sections, many=True)
        return Response({'sections':serializer.data},status=status.HTTP_200_OK)


class GetPaidCourseSections(APIView):
    def get(self,request, course_uuid,*args, **kwargs):
        course = Course.objects.get(course_uuid=course_uuid)
        sections = course.course_section.all()
        # for course in courses:
        serializer=CourseSectionPaidSerializer(sections, many=True)
        return Response({'sections':serializer.data},status=status.HTTP_200_OK)


class GetCoursePrices(APIView):
    def get(self,request, course_uuid,*args, **kwargs):

        course = Course.objects.get(course_uuid=course_uuid)
        prices = course.pricing_tiers.all()

        # for course in courses:
        serializer=PricingSerializer(prices, many=True)
        
        return Response({'course_prices':serializer.data},status=status.HTTP_200_OK)


class GetCourseAuthor(APIView):
    def get(self,request, course_uuid,*args, **kwargs):

        course = Course.objects.get(course_uuid=course_uuid)
        author = course.author

        # for course in courses:
        serializer=UserCoursesLibrary(author)
        
        return Response({'author':serializer.data},status=status.HTTP_200_OK)


class GetCourseQuestions(APIView):
    
    def get(self,request, course_uuid,*args, **kwargs):

        course = Course.objects.get(course_uuid=course_uuid)
        questions = course.questions.all()

        paginator = LargeSetPagination()
        results = paginator.paginate_queryset(questions, request)
        serializer = QuestionSerializer(results, many=True)

        # for course in courses:
        # serializer=QuestionSerializer(questions, many=True)
        
        return paginator.get_paginated_response({'questions':serializer.data})

class SearchCourseQuestionsView(APIView):

    def get(self, request, course_uuid, search_term, format=None):

        course = Course.objects.get(course_uuid=course_uuid)
        questions = course.questions.all()

        matches= questions.filter(
                Q(title__icontains=search_term)|
                Q(body__icontains=search_term)
            )

        serializer = QuestionSerializer(matches, many=True)
        return Response({'questions': serializer.data}, status=status.HTTP_200_OK)


class GetCourseResources(APIView):

    def get(self,request, course_uuid,*args, **kwargs):
        course = Course.objects.get(course_uuid=course_uuid)
        resources = course.resources.all()

        # for course in courses:
        serializer=ResourceSerializer(resources, many=True)
        
        return Response({'resources':serializer.data},status=status.HTTP_200_OK)


class GetCourseDetails(APIView):
    def get(self,request, course_uuid,*args, **kwargs):

        course = Course.objects.get(course_uuid=course_uuid)

        # for course in courses:
        serializer=CourseDetailsSerializer(course)
        
        return Response({'details':serializer.data},status=status.HTTP_200_OK)


class CreateCourseQuestion(APIView):
    def post(self, request, course_uuid, format=None):
        data = self.request.data
        
        title=data['title']
        course = get_object_or_404(Course, course_uuid=course_uuid)

        requisite = Requisite(title=title)
        requisite.save()

        course.requisite.add(requisite)

        return Response({'success': 'Requisite added successfully'})


class AddToLibraryView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        data = self.request.data
        account = data['account']
        user = UserAccount.objects.get(account=account)


        course_uuid = data['course_uuid']

        courses_list = CoursesLibrary.objects.get(author=user)
        course = Course.objects.get(course_uuid=course_uuid)

        courses_list.courses.add(course)
        

        return Response({'success': 'Post added to Bookmark'})


class RemoveFromLibraryView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        data = self.request.data
        account = data['account']
        user = UserAccount.objects.get(account=account)


        course_uuid = data['course_uuid']

        courses_list = CoursesLibrary.objects.get(author=user)
        course = Course.objects.get(course_uuid=course_uuid)

        courses_list.courses.remove(course)
        
        return Response({'success': 'Post removed from Bookmark'})


class UserCoursesLibraryListView(APIView):
    def post(self, request,  *args, **kwargs):
        data = self.request.data
        account = data['account']
        user = UserAccount.objects.get(account=account)
        courses_list = CoursesLibrary.objects.filter(author=user)

        paginator = LargeSetPagination()
        results = paginator.paginate_queryset(courses_list, request)
        serializer = CoursesLibrarySerializer(results, many=True)

        return paginator.get_paginated_response({'courses': serializer.data})


class UserCoursesLibraryIDListView(APIView):
    def post(self, request,  *args, **kwargs):
        data = self.request.data
        account = data['account']
        user = UserAccount.objects.get(account=account)
        courses_list = CoursesLibrary.objects.filter(author=user)

        paginator = LargeSetPagination()
        # results = paginator.paginate_queryset(courses_list, request)
        serializer = CoursesUUIDLibrarySerializer(courses_list, many=True)

        return Response({'courses': serializer.data},status=status.HTTP_200_OK)



class AddPaidToLibraryView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        data = self.request.data
        account = data['account']
        user = UserAccount.objects.get(account=account)

        course_uuid = data['course_uuid']

        courses_list = PaidCoursesLibrary.objects.get(author=user)
        course = Course.objects.get(course_uuid=course_uuid)

        user.total_spent += course.price
        user.save()

        course.sold += 1
        if(course.sold >= 100):
            course.best_seller = True
        course.save()

        courses_list.courses.add(course)
        
        return Response({'success': 'Post added to Bookmark'})


class RemoveFromPaidLibraryView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        data = self.request.data
        account = data['account']
        course_uuid = data['course_uuid']

        user = UserAccount.objects.get(account=account)
        courses_list = PaidCoursesLibrary.objects.get(author=user)
        course = Course.objects.get(course_uuid=course_uuid)

        courses_list.courses.remove(course)
        
        return Response({'success': 'Post removed from Bookmark'})


class UserPaidCoursesLibraryListView(APIView):
    def post(self, request,  *args, **kwargs):
        data = self.request.data
        account = data['account']
        user = UserAccount.objects.get(account=account)
        courses_list = PaidCoursesLibrary.objects.filter(author=user)
        
        serializer = CoursesUUIDLibrarySerializer(courses_list, many=True)
        return Response({'courses': serializer.data},status=status.HTTP_200_OK)

class UserPaidCoursesPaginatedLibraryListView(APIView):
    def post(self, request,  *args, **kwargs):
        data = self.request.data
        account = data['account']
        user = UserAccount.objects.get(account=account)
        courses_list = PaidCoursesLibrary.objects.filter(author=user)

        paginator = LargeSetPagination()
        results = paginator.paginate_queryset(courses_list, request)
        serializer = CoursesLibrarySerializer(results, many=True)

        # serializer = CoursesListNonAuthorSerializer(courses_list, many=True)
        return paginator.get_paginated_response({'courses': serializer.data})

class ListBySearchPaidView(APIView):
    def post(self, request, format=None):
        data = self.request.data
        account = data['account']
        user = get_object_or_404(UserAccount, account=account)
        search_term = data['search_term']

        courses_list = PaidCoursesLibrary.objects.filter(author=user).filter(
            Q(courses__title__icontains=search_term)|
            Q(courses__description__icontains=search_term)
            )

        
        paginator = LargeSetPagination()
        results = paginator.paginate_queryset(courses_list, request)
        serializer = CoursesLibrarySerializer(results, many=True)

        return paginator.get_paginated_response({'courses': serializer.data})