const express = require('express');
const router = express.Router()
const axios = require('axios')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const api = require('../apis/authorize');

router.get('/', function(req,res){
    res.render('index');
});

router.route('/authorize')
    .get(api.index)
    .post(urlencodedParser, api.post);

router.get('/token', function(req,res){
    res.render('token', {title: "Token", statusCode: null, statusDescription: null, data: null});
});

router.get('/payment', function(req,res){
    res.render('payment', {title: "Payment", statusCode: null, statusDescription: null, data: null});
});

router.post('/token', urlencodedParser, function(req,res){
    const api = {
        'apikey': req.body.apikey,
        'apisecret': req.body.apisecret,
        "authCode": ""
    }

    const getToken = async (api) => {
        const resp = await token(api)
        
        if(resp != null && resp.data.status.code == 1000) {
            res.render('token', {title: "Token", statusCode: resp.data.status.code, statusDescription: resp.data.status.description, data: resp.data.data});
        } else {
            res.render('token', {title: "Token", statusCode: resp.data.status.code, statusDescription: resp.data.status.description, data: null});
        }
    }
    getToken(api)
});

const token = async (api) => {
    try {
        const req = { 
            method: 'POST', 
            url: 'https://api.scb.co.th/partners/sandbox/v1/oauth/token', 
            headers: {
                'Content-Type': 'application/json',
                'resourceOwnerId': '1',
                'requestUId': '1',
                'accept-language': 'EN',
            },
            data: {
                "applicationKey": api.apikey,
                "applicationSecret": api.apisecret,
                "authCode": ""
            }
        }
        return await axios(req)
    } catch (error) {
        return error.response
    }
}

router.post('/payment', urlencodedParser, function(req,res){
    const api = {
        'apikey': req.body.apikey,
        'accesstoken': req.body.accesstoken,
        "paymentAmount": req.body.paymentAmount,
        "transactionType": req.body.transactionType,
        "accountTo": req.body.accountTo,
        "accountFrom": req.body.accountFrom,
    }

    const getPayment = async (api) => {
        const resp = await payment(api)
        
        if(resp != null && resp.data.status.code == 1000) {
            res.render('payment', {title: "Payment", statusCode: resp.data.status.code, statusDescription: resp.data.status.description, data: resp.data.data});
        } else {
            res.render('payment', {title: "Payment", statusCode: resp.data.status.code, statusDescription: resp.data.status.description, data: null});
        }
    }
    getPayment(api)
});

const payment = async (api) => {
    try {
        const req = { 
            method: 'POST', 
            url: 'https://api.scb.co.th/partners/sandbox/v2/deeplink/transactions', 
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+ api.accesstoken,
                'resourceOwnerId': api.apikey,
                'requestUId': '1',
                'channel': 'scbeasy',
                'accept-language': 'EN',
            },
            data: {
                "paymentAmount": api.paymentAmount,
                "transactionType": api.transactionType,
                "transactionSubType": "BPA",
                "accountTo": api.accountTo,
                "accountFrom": api.accountFrom,
                "sessionValidityPeriod": "1800",
                "sessionValidUntil": "",
                "ref1": "PAYMENT",
                "ref2": "",
                "ref3": ""
            }
        }
        return await axios(req)
    } catch (error) {
        return error.response
    }
}

module.exports = router;