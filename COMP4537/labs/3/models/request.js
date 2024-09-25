class Request {
    constructor(method, url, route, headers, queryParams) {
        this.method = method;
        this.url = url;
        this.route = route;
        this.headers = headers;
        this.queryParams = queryParams;
    }
}

module.exports = Request;