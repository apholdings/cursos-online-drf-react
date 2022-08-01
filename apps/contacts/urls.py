from django.urls import path
from .views import *


urlpatterns = [
    path('', ContactCreateView.as_view()),
    path('demo', DemoAddListView.as_view()),
    path('newsletter', NewsletterAddListView.as_view()),
]
