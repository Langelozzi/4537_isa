const http = require('http');
const url = require('url');
const httpEnums = require('../enums/http-enums');
const Request = require('../models/request');
const Response = require('../models/response');

class Server {
    DEFAULT_PORT = 8080;

    constructor() {
        this.routes = {};
    }

    get(endpoint, callback) {
        this.routes[endpoint] = {
            method: httpEnums.HTTPMethods.GET,
            callback
        };
    }

    listen(port = this.DEFAULT_PORT, callback) {
        const server = this._createServer();
        server.listen(port, callback);
    }

    _createServer() {
        return http.createServer((req, res) => {
            const request = this._parseRequest(req);
            const response = new Response(res);

            const route = request.route;

            if (route && req.method === route.method) {
                route.callback(request, response);
            } else {
                res.writeHead(httpEnums.HTTPStatusCodes.NotFound, {
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end('Endpoint not found');
            }
        })
    }

    _parseRequest(req) {
        // Get the route
        const parsedUrl = url.parse(req.url, true);
        const route = this.routes[parsedUrl.pathname]

        // Get the query params
        const queryParams = parsedUrl.query;

        return new Request(req.method, req.url, route, req.headers, queryParams);
    }
}

module.exports = Server;

// const PORT = 8080;

// const server = http.createServer(function (req, res) {
//     const queryString = url.parse(req.url, true);
//     const qParams = queryString.query;
//     console.log(qParams);

//     if (req.method === httpEnums.HTTPMethods.GET && queryString.pathname === '/getDate') {
//         res.writeHead(httpEnums.HTTPStatusCodes.Ok, {
//             'Content-Type': 'text/html',
//             'Access-Control-Allow-Origin': '*'
//         });

//         res.end(`
//             <span style="color: blue;">
//                 Hello ${qParams.name}, what a beautiful day. Server current date and time is ${utils.Utils.getDate()}
//             </span>
//         `)
//     } else {
//         res.writeHead(httpEnums.HTTPStatusCodes.NotFound, {
//             'Content-Type': 'text/plain',
//             'Access-Control-Allow-Origin': '*'
//         });

//         res.end('Endpoint not found');
//     }
// });

// server.listen(PORT);
// console.log(`Server is listening on port ${PORT}`);