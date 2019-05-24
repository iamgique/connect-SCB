# connect-SCB
A demo web application connected to SCB APIs

Currently, You can generate "authorization code", you can generate "access token" with 2-Legged "client credentials" grant type by using API Keys and API Secret, and you can try to pay with "API Payment" by using access token.

You can read about an API document that they provided at [developers.scb](https://developer.scb/#/documents). 

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

### App live demo
[demo web application](https://mh06j2odyk.execute-api.ap-southeast-1.amazonaws.com/latest/). 

### Example image
![alt text](https://github.com/iamgique/connect-SCB/blob/master/public/images/1.png?raw=true)
![alt text](https://github.com/iamgique/connect-SCB/blob/master/public/images/2.png?raw=true)
![alt text](https://github.com/iamgique/connect-SCB/blob/master/public/images/3.png?raw=true)
![alt text](https://github.com/iamgique/connect-SCB/blob/master/public/images/4.png?raw=true)
![alt text](https://github.com/iamgique/connect-SCB/blob/master/public/images/5.png?raw=true)