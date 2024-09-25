const http = require('http');
const url = require('url');
const utils = require('./modules/utils');
const httpEnums = require('./enums/http-enums');

const PORT = 8080;

const server = http.createServer(function (req, res) {
    const queryString = url.parse(req.url, true);
    const qParams = queryString.query;
    console.log(qParams);

    if (req.method === httpEnums.HTTPMethods.GET && queryString.pathname === '/getDate') {
        res.writeHead(httpEnums.HTTPStatusCodes.Ok, {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
        });

        res.end(`
            <span style="color: blue;">
                Hello ${qParams.name}, what a beautiful day. Server current date and time is ${utils.Utils.getDate()}
            </span>
        `)
    } else {
        res.writeHead(httpEnums.HTTPStatusCodes.NotFound, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });

        res.end('Endpoint not found');
    }
});

server.listen(PORT);
console.log(`Server is listening on port ${PORT}`);