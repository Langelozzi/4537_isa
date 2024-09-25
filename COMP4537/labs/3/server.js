const http = require('http');
const url = require('url');
const utils = require('./modules/utils');

const PORT = 8080;

const server = http.createServer(function (req, res) {
    const queryString = url.parse(req.url, true);
    const qParams = queryString.query;
    console.log(qParams);

    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
    });

    res.end(`
        <span style="color: blue;">
            Hello ${qParams.name}, what a beautiful day. Server current date and time is ${utils.Utils.getDate()}
        </span>
    `)
});

server.listen(PORT);
console.log(`Server is listening on port ${PORT}`);