const fs = require('fs');

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

    sendFile(filePath) {
        // Read the HTML file from the filesystem
        fs.readFile(filePath, (err, data) => {
            if (err) {
                // Handle file read error
                this.status(500).send('500 - Internal Server Error');
            } else {
                this.setHeader('Content-Type', 'text/html');
                this.send(data);
            }
        });
    }

    json(json) {
        this.setHeader('Content-Type', 'application/json');
        const jsonStr = JSON.stringify(json);

        this._writeHeadersAndStatus();
        this.rawRes.end(jsonStr);
    }

    _writeHeadersAndStatus() {
        this.rawRes.writeHead(this.statusCode, this.headers);
    }
}

module.exports = Response;