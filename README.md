# connect-SCB
A demo application connected to SCB APIs

Currently, You can generate "authorization code" by "client credentials" grant type, generate "access token" by API Keys and API Secret, And you can try to pay with "api payment" by using access token.

## Tech Stack
Nodejs, Express, EJS, axios, body-parser

## Server
AWS API Gateway, Lambda

## How to run on local
```
npm install
node app.local.js
```
Enjoy with http://localhost:3000

## How to run on production
### Deploy to AWS
```
claudia create --handler lambda.handler --deploy-proxy-api --region us-east-1
```
### After that
```
claudia update
```
