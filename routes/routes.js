const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const index = require('../apis/index');
const authorize = require('../apis/authorize');
const token = require('../apis/token');
const payment = require('../apis/payment');

router.route('/')
    .get(index.index);

router.route('/authorize')
    .get(authorize.index)
    .post(urlencodedParser, authorize.post);

router.route('/token')
    .get(token.index)
    .post(urlencodedParser, token.post);

router.route('/payment')
    .get(payment.index)
    .post(urlencodedParser, payment.post);

module.exports = router;