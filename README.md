
# tyba-restaurant-finder

This API allows a registered user to locate restaurants through the coordenates he/she provides.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed `NODE` and `NPM`.
* You have `Docker` installed.
* You have installed `Postman` for easy API testing and execution.

## Installation

- Clone this repository:
```
$ git clone https://github.com/Virteip/t-restaurant-finder.git
```
- Install modules locally:
```
$ npm install
```
- Setup environment variables found in your .env file:
```
$ export $(cat .env.local | grep -v ^# | xargs)
```

- Setup docker build:
```
$ docker-compose buil api
```
- Execute docker build:
```
$ docker-compose up api
```

You will notice that the GOOGLE_API_KEY is not present, since this is not quite a free-to-use service I've taken the liberty of only providing the key via email. Another option would be to obtain your own API key via the Google Cloud platform.

Alternatively you may also execute the app locally without the use of docker by running:
```
$ npm run dev
```

## Usage

Once the server is running it will be accessible on `localhost:3000`.

Restaurant-Finder currently has the following endpoints:

####   `/api/restaurant-finder/user/register`:
```
curl --location --request POST 'localhost:3000/api/restaurant-finder/user/register' \
--header 'api_key: 1234' \
--header 'Authorization: test' \
--header 'Content-Type: application/json' \
--data-raw '{
"username": "yes",
"password": "1234"
}'
```

This will register a user in the PG database. Each username is unique and can't be duplicated.

####  `/api/restaurant-finder/user/login`:

```
curl --location --request POST 'localhost:3000/api/restaurant-finder/user/login' \
--header 'api_key: 1234' \
--header 'Authorization: test' \
--header 'Content-Type: application/json' \
--data-raw '{
"username": "yes",
"password": "1234"
}'
```
##### Response:
- The response wil be a tokenized string that is used to identify the user that is logged in and is later needed to consult the restaurants,transactions and logout.

####  `/api/restaurant-finder/restaurant/locate?lat=13&lng=-1`:
*lat and lng values are examples, they could be any coordenates you desire.
```
curl --location --request GET 'localhost:3000/api/restaurant-finder/restaurant/locate?lat=13&lng=-1' \
--header 'Authorization: test' \
--header 'token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiaGFwcHB5IiwicGFzc3dvcmQiOiIxMjM0IiwiZGF0ZSI6MTY0MjYyNzQ2N30.pJane3JVPkXjBLRSNW7Y-gk3A3ifk83-ej_cWtXVYy8' \
--header 'user: happpy'
```
##### Response:
- The response will be an array objects in which each of them contains the information for a particular restaurant in the area you passed as coordenates.

####  `/api/restaurant-finder/user/transactions` :
```
curl --location --request GET 'localhost:3000/api/restaurant-finder/user/transactions/' \
--header 'Authorization: test' \
--header 'token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiaGFwcHB5IiwicGFzc3dvcmQiOiIxMjM0IiwiZGF0ZSI6MTY0MjYyNzQ2N30.pJane3JVPkXjBLRSNW7Y-gk3A3ifk83-ej_cWtXVYy8' \
--header 'user: happpy'
```
##### Response:
- The response will be an array objects in which each of them contains the information of a request a user has made to the restaurant locator. Each object will have username, date and coordinates.

####  `/api/restaurant-finder/user/logout` :
```
curl --location --request GET 'localhost:3000/api/restaurant-finder/user/logout/' \
--header 'Authorization: test' \
--header 'token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiaGFwcHB5IiwicGFzc3dvcmQiOiIxMjM0IiwiZGF0ZSI6MTY0MjYyNzQ2N30.pJane3JVPkXjBLRSNW7Y-gk3A3ifk83-ej_cWtXVYy8' \
--header 'user: happpy'
```
##### Response:
- This will logout a user, after this endpoint is hit the user will need to log in again and regenerate a token.

## Tests

The tests can be found inside the 'tests' folder. They are unit tests written with Mocha and Chai, and the coverage threshold for the project is 80%.

To run the tests and display file coverage run the following command:

```
$ npm run test
```


By: <sergiopietri@gmail.com>