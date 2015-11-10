//Proxy services configuration file

module.exports = {
    defaultProxyconfig: {
        forwardPath: function (req) {
            console.log("REQ = " + req.baseUrl);
            return req.baseUrl;
        }
    }
};
