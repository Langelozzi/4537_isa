const Utils = require('./modules/utils');
const HttpServer = require('./modules/http-server');
const fs = require('fs');
const path = require('path');

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

            res.setHeader('Content-Type', 'text/plain');

            fs.appendFile(filePath, text, (err) => {
                if (err) {
                    res.status(500).send(`Error writting to file: ${filePath}.\n\n ${err}`);
                } else {
                    res.status(200).send(`File contents written successfully to ${filePath}`);
                }
            })
        })

        server.get('/readFile/:fileName', (req, res) => {
            const fileName = req.urlParams.fileName;
            const filePath = path.join(__dirname, fileName);

            res.setHeader('Content-Type', 'text/plain');

            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    res.status(404).send(`404 Not Found - Unable to locate file: ${fileName}.\n\n ${err}`)
                } else {
                    res.status(200).send(data);
                }
            })
        })

        server.listen(server.DEFAULT_PORT, () => {
            console.log(`Server listening on port ${server.DEFAULT_PORT}`);
        });
    }
}

Server.start();