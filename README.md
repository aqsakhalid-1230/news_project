# News App

This project is a multi-lingual application that fetches News articles from a news API endpoint and displays on a frontend application.

In this app I am getting the products data from the news api endpoint and made a proxy app in python to fetch the news articles and then called that API endpoint from my frontend to display with theme and language selectors using MUI.

## Features

- Python Proxy: A python view that returns the fetched news articles from the news API.
- NewsCard: News cards in typscript that shows each fethced articles from the API.
- Theme selector: A light/dark mode selector to change the theme of the application.
- Language selector: A selector to choose the language for articles to be fetched in.
- Topic chips: Chips to indicate for which topic articles need to be fetched.



<img width="1678" alt="Screenshot 2023-12-09 at 3 44 39 am" src="https://github.com/aqsakhalid-1230/news_project/assets/109551595/68b6ce0c-531b-4f78-84e6-20829d54a775">



# Build With

- Framework: PytPython 3.11.5hon
- API: News API (https://newsapi.org/docs/endpoints/everything)

# Getting Started


## Installation

**Clone the Repository**:
   ```bash
     git clone [<repository-url>](https://github.com/aqsakhalid-1230/news_project)
     cd news_project
     create a .env file and copy content from .env.example to it
     - activate virtual environment 
        source env/bin/activate
     - pip install -r requirements.txt
     - python3 manage.py runserver
  
     ### For Frontend
  
     - cd news-app
     - npm install
     -npm start
   ```

## Run Tests

```bash
    for python
    - pytest

    for jest
    - npm test
```
