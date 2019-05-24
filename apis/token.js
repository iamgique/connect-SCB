const axios = require('axios')

exports.index = function (req, res) {
    res.render('token', {title: "Token", statusCode: null, statusDescription: null, data: null});
};

exports.post = function (req, res) {
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
};

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



