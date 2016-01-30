//Proxy services configuration file

module.exports = {
    defaultProxyConfig: {
        forwardPath: function (req) {
            return require('url').parse(req.url).path;
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
    },
    defaultProdProxyConfig: {
        forwardPath: function (req, res) {
            return require('url').parse(req.url).path;
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
