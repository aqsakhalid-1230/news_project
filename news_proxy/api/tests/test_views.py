from django.urls import reverse
import responses
import pytest
import json
from decouple import config

api_url = config('NEWS_API_URL')

@responses.activate
@pytest.mark.django_db
def test_news_proxy_success(client):
    mock_data = {'articles': [{'title': 'Test Article', 'description': 'Test Description'}]}
    responses.add(responses.GET, api_url, json=mock_data, status=200)

    url = reverse('news_proxy')
    response = client.get(url, {'q': 'example', 'language': 'en'})
    assert response.status_code == 200
    assert json.loads(response.content) == mock_data

@responses.activate
@pytest.mark.django_db
def test_news_proxy_api_failure(client):
    responses.add(responses.GET, api_url, json={'error': 'API failure'}, status=500)

    url = reverse('news_proxy')
    response = client.get(url, {'q': 'example', 'language': 'en'})
    assert response.status_code == 400

@pytest.mark.django_db
def test_news_proxy_invalid_params(client):
    url = reverse('news_proxy')
    response = client.get(url, {'q': '', 'language': 'invalid-lang'})
    assert response.status_code == 400

@responses.activate
@pytest.mark.django_db
def test_news_proxy_network_issue(client):
    responses.add(responses.GET, api_url, body=Exception('Network error'))

    url = reverse('news_proxy')
    response = client.get(url, {'q': 'example', 'language': 'en'})
    assert response.status_code == 503

@responses.activate
@pytest.mark.django_db
def test_news_proxy_response_format(client):
    mock_data = {'articles': [{'title': 'Test', 'description': 'Test', 'url': 'http://test.com', 'urlToImage': 'http://image.com'}]}
    responses.add(responses.GET, api_url, json=mock_data, status=200)

    url = reverse('news_proxy')
    response = client.get(url, {'q': 'test', 'language': 'en'})
    assert response.status_code == 200
    data = json.loads(response.content)
    assert 'articles' in data
    assert all(k in data['articles'][0] for k in ['title', 'description', 'url', 'urlToImage'])
