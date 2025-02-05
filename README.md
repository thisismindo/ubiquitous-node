# Node

## Setup

- edit `.env.sample` and fill required environment variables.
    - generate `JWT_SECRET_KEY` by running `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- rename `.env.sample` to `.env`
- run `make build`
- to start this project, run `make up`
- to stop this project, run `make down`
- [optional] import `postman` collection

## Tech Stacks

- docker >= 27.5.1
- node >= v23.7.0
- npm >= 10.9.2
- mysql >= 8.4.3

## Sample request using curl

request #1
```
curl --location 'http://localhost/users' \
--header 'Authorization: Bearer <<redacted>>'
```
response #1
```
{
    "ids": [
        1,
        3
    ],
    "records": {
        "1": {
            "id": 1,
            "name": "foobar"
        }
        "3": {
            "id": 3,
            "name": "foobar3"
        }
    }
}
```
