from django.test import TestCase
from rest_framework.test import APIClient


class ApiSmokeTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_api_root_available(self):
        res = self.client.get('/api/')
        self.assertIn(res.status_code, (200, 301, 302))
