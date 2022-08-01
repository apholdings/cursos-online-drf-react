from rest_framework import serializers

from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields=[
            'id',
            'account',
            'email',
            'username',
            'first_name',
            'last_name',
            'get_picture',
            'get_banner',
            'total_spent',
            'verified',
            'total_earnings',
            'total_spent',
            'date_created',
            'sales',
        ]