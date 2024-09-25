const http = require('http');
const url = require('url');
const Request = require('../models/request');
const Response = require('../models/response');

class Server {
    DEFAULT_PORT = 8080;

    constructor() {
        this.routes = {};
    }

    get(endpoint, callback) {
        this.routes[endpoint] = {
            method: 'GET',
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
                response.status(404).send('Endpoint not found');
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