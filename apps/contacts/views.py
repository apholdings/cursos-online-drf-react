from rest_framework import permissions
from rest_framework.views import APIView
from .models import Contact
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import requests
activecampaign_url = settings.ACTIVE_CAMPAIGN_URL
activecampaign_key = settings.ACTIVE_CAMPAIGN_KEY


class ContactCreateView(APIView):
    def post(self, request, format=None):
        data = self.request.data

        name = data['name']
        email = data['email']
        subject = data['subject']
        message = data['message']
        phone = data['phone']
        budget = data['budget']

        try:

            send_mail(
                subject,
                'Name '
                + name
                + '\nEmail: '
                + email
                + '\n\nMessage:\n'
                + message
                + '\nPhone: '
                + phone
                + '\n\nBudget: '
                + budget,
                'mail@solopython.com',
                ['mail@solopython.com'],
                fail_silently=False
            )

            Contact.objects.create(
                name=name,
                email=email,
                subject=subject,
                phone=phone,
                message=message,
                budget=budget,
            )

            url = activecampaign_url + '/api/3/contact/sync'
            data = {
                "contact":{
                    "email": email,
                    "firstName": name,
                    "phone": phone,
                }
            }

            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Api-Token': activecampaign_key
            }

            response = requests.post(url, json=data, headers=headers)
            if response.status_code != 201 and response.status_code != 200:
                return Response(
                    {'error': 'Something went wrong when creating contact'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            contact = response.json()

            try:
                contact_id = str(contact['contact']['id'])
            except:
                return Response(
                    {'error': 'Something went wrong when getting contact ID'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            # Agregar TAG
            url = activecampaign_url + '/api/3/contactTags'
            data = {
                'contactTag': {
                    'contact': contact_id,
                    'tag': '2'
                }
            }
            response = requests.post(url, json=data, headers=headers)
            if response.status_code != 201 and response.status_code != 200:
                return Response(
                    {'error': 'Something went wrong when adding tag to contact'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            url = activecampaign_url + '/api/3/contactLists'
            data = {
                'contactList': {
                    'list': '2',
                    'contact': contact_id,
                    'status': '1'
                }
            }

            response = requests.post(url, json=data, headers=headers)

            if response.status_code != 201 and response.status_code != 200:
                return Response(
                    {'error': 'Something went wrong when adding contact to master list'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            return Response({'success': 'Message sent successfully'})
        except:
            return Response({'error': 'Message failed to be sent'})


class DemoAddListView(APIView):
    def post(self, request, format=None):
        data = self.request.data
        email=data['email']
        first_name=data['name']
        
        try:
            # CREATE/UPDATING CONTACT
            url = activecampaign_url + '/api/3/contact/sync'
            data = {
                'contact': {
                    'email': email,
                    'firstName': first_name,
                }
            }
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Api-Token': activecampaign_key
            }
            response = requests.post(url, json=data, headers=headers)

            if response.status_code != 201 and response.status_code != 200:
                return Response(
                    {'error': 'Something went wrong when creating contact'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            contact = response.json()

            try:
                contact_id = str(contact['contact']['id'])
            except:
                return Response(
                    {'error': 'Something went wrong when getting contact ID'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            # ADDING OF THE TAG TO CONTACT
            url = activecampaign_url + '/api/3/contactTags'
            data = {
                'contactTag': {
                    'contact': contact_id,
                    'tag': '1'
                }
            }

            response = requests.post(url, json=data, headers=headers)

            if response.status_code != 201 and response.status_code != 200:
                return Response(
                    {'error': 'Something went wrong when adding tag to contact'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            # ADD CONTACT TO OUR MASTER LIST AND DEMO LIST
            url = activecampaign_url + '/api/3/contactLists'
            data = {
                'contactList': {
                    'list': '3',
                    'contact': contact_id,
                    'status': '1'
                }
            }

            response = requests.post(url, json=data, headers=headers)

            if response.status_code != 201 and response.status_code != 200:
                return Response(
                    {'error': 'Something went wrong when adding contact to master list'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            return Response(
                    {'success': 'Contact added to free ebook email list'},
                    status=status.HTTP_200_OK
                )
        except:
            return Response(
                {'error': 'Something went wrong on our server'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class NewsletterAddListView(APIView):
    def post(self, request, format=None):
        data = self.request.data
        email=data['email']
        
        try:
            # CREATE/UPDATING CONTACT
            url = activecampaign_url + '/api/3/contact/sync'
            data = {
                'contact': {
                    'email': email,
                }
            }
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Api-Token': activecampaign_key
            }
            response = requests.post(url, json=data, headers=headers)

            if response.status_code != 201 and response.status_code != 200:
                return Response(
                    {'error': 'Something went wrong when creating contact'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            contact = response.json()

            try:
                contact_id = str(contact['contact']['id'])
            except:
                return Response(
                    {'error': 'Something went wrong when getting contact ID'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            # ADDING OF THE TAG TO CONTACT
            url = activecampaign_url + '/api/3/contactTags'
            data = {
                'contactTag': {
                    'contact': contact_id,
                    'tag': '3'
                }
            }

            response = requests.post(url, json=data, headers=headers)

            if response.status_code != 201 and response.status_code != 200:
                return Response(
                    {'error': 'Something went wrong when adding tag to contact'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            # ADD CONTACT TO OUR MASTER LIST AND DEMO LIST
            url = activecampaign_url + '/api/3/contactLists'
            data = {
                'contactList': {
                    'list': '4',
                    'contact': contact_id,
                    'status': '1'
                }
            }

            response = requests.post(url, json=data, headers=headers)

            if response.status_code != 201 and response.status_code != 200:
                return Response(
                    {'error': 'Something went wrong when adding contact to master list'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            return Response(
                    {'success': 'Contact added to free ebook email list'},
                    status=status.HTTP_200_OK
                )
        except:
            return Response(
                {'error': 'Something went wrong on our server'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )