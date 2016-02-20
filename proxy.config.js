//Proxy services configuration file


var urlParser = require('url');
var PATTERN =  new RegExp('(^[^?]+[^/?])([^/]*)$');

module.exports = {
    defaultProxyConfig: {
        forwardPath: function (req) {
            var trailing = req.url.match(PATTERN);
            var path = req.url;

            if (trailing)
                path = trailing[1] + '/' + trailing[2];

            console.log(path);
            return urlParser.parse(path).path;
        },
        decorateRequest: function (req) {
            console.log('params', req.params);
            return req;
        }
    },
    ProdProxyConfig: {
        forwardPath: function (req, res) {
            var trailing = req.url.match(PATTERN);
            var path = req.url;

            if (trailing)
                path = trailing[1] + '/' + trailing[2];

            return urlParser.parse(path).path;
        },
        decorateRequest: function (req) {
            if (req.path.match(/auth\/token/)) {
                req.params.client_id = 'PDR98EsT6uJvzQ0wR5Ya7Au61PUuucOxbUeHtoxq';
                req.params.client_secret = '6esqNxSjQipr2I9jMhKtjrc6qNf9DrciPHqZgS7kG51eVauBBUcAedVW1oqJPFgQdVaIufAcUYUuot2bqTXF2KDdwTfje7ckb8bm8wmlBymC4sXt6R2yS8Mz8GjdViHe';
                req.params['grant-type'] = 'password';
            }

            console.log('params', req.params);
            return req;
        }
    }
};
