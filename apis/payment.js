const axios = require('axios')

exports.index = function (req, res) {
    res.render('payment', {title: "Payment", statusCode: null, statusDescription: null, data: null});
};

exports.post = function (req, res) {
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
};

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



