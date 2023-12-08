from django.http import JsonResponse
import requests
from decouple import config

def news_proxy(request):
    try:
        api_key = config('NEWS_API_KEY')
        api_url = config('NEWS_API_URL')
        query = request.GET.get('q', 'apple')
        language = request.GET.get('language', 'en')
        api_url = f'{api_url}?q={query}&from=past7days&sortBy=publishedAt&language={language}'
        
        response = requests.get(api_url, headers={'Authorization': f'Bearer {api_key}'})
        response.raise_for_status()
        return JsonResponse(response.json())

    except requests.HTTPError as http_err:
        return JsonResponse({'error': f'HTTP error occurred: {http_err}'}, status=400)
    except Exception as e:
        return JsonResponse({'error': f'An error occurred: {e}'}, status=503)
