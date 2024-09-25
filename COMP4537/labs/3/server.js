const Utils = require('./modules/utils');
const HttpServer = require('./modules/http-server');
const fs = require('fs');

class Server {
    static start() {
        const server = new HttpServer();

        server.get('/getDate', (req, res) => {
            res.status(200).send(`
                <span style="color: blue;">
                    Hello ${req.queryParams.name}, what a beautiful day. Server current date and time is ${Utils.getDate()}
                </span>
            `)
        })

        server.get('/writeFile', (req, res) => {
            const filePath = 'file.txt'

            let text = req.queryParams.text;
            const newLine = req.queryParams.newLine;

            if (newLine) {
                text = `\n${text}`;
            }

            fs.appendFile(filePath, text, (err) => {
                if (err) {
                    res.status(500).send(`Error writting to ${filePath}`);
                } else {
                    res.status(200).send(`File contents written successfully to ${filePath}`);
                }
            })
        })

        server.get('/readFile/:fileName', (req, res) => {
            console.log(req);
        })

        server.listen(server.DEFAULT_PORT, () => {
            console.log(`Server listening on port ${server.DEFAULT_PORT}`);
        });
    }
}

Server.start();