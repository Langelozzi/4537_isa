class Response {
    constructor(httpOutgoingMessage) {
        this.rawRes = httpOutgoingMessage;
        this.headers = {};
        this.statusCode = 200;
    }

    setHeaders(headers) {
        this.headers = headers;
    }

    setHeader(key, value) {
        this.headers[key] = value;
    }

    status(statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    send(str) {
        if (!this.headers['Content-Type']) {
            this.setHeader('Content-Type', 'text/html');
        }

        this._writeHeadersAndStatus();
        this.rawRes.end(str);
    }

    // sendFile(filePath) {

    // }

    // json(json) {

    // }

    _writeHeadersAndStatus() {
        this.rawRes.writeHead(this.statusCode, this.headers);
    }
}

module.exports = Response;