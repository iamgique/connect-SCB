const axios = require('axios')

exports.index = function (req, res) {
    res.render('auth', {title: "Authorize", statusCode: null, statusDescription: null, data: null});
};

exports.post = function (req, res) {
    const api = {
        'apikey': req.body.apikey,
        'apisecret': req.body.apisecret
    }

    const getAuth = async (api) => {
        const resp = await authorize(api)
        if(resp != null && resp.data.status.code == 1000) {
            res.render('auth', {title: "Authorize", statusCode: resp.data.status.code, statusDescription: resp.data.status.description, data: resp.data.data.callbackUrl});
        } else {
            res.render('auth', {title: "Authorize", statusCode: resp.data.status.code, statusDescription: resp.data.status.description, data: null});
        }
    }
    getAuth(api)
};

const authorize = async (api) => {
    try {
        const req = {
            method: 'get',
            url: 'https://api.scb.co.th/partners/sandbox/v2/oauth/authorize',
            headers: {
                'Content-Type': 'application/json',
                'apikey': api.apikey,
                'apisecret': api.apisecret,
                'resourceOwnerId': '1',
                'requestUId': '1',
                'response-channel': 'mobile',
                'endState': 'desktop_web',
                'accept-language': 'EN',
            }
        }
        return await axios(req)
    } catch (error) {
        return error.response
    }
}



