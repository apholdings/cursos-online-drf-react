from apps.courses.models import CoursesLibrary, PaidCoursesLibrary
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import UserAccount


class CreateUserProfileView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, format=None):
        data = self.request.data

        account = data["account"]

        user = UserAccount.objects.get_or_create(
            account=account,
            email='email',
            username=account,
            first_name='name',
            last_name='last name',
            location='location',
            url='url',
            birthday='2022-01-01',
            profile_info='bio information',
            age_limit='18+',
            verified=False,
            total_earnings=0,
            total_spent=0,
            sales=0,
        )

        CoursesLibrary.objects.get_or_create(author=user[0])
        PaidCoursesLibrary.objects.get_or_create(author=user[0])

        return Response({'success': 'Message sent successfully'})