const Utils = require('./modules/utils');
const HttpServer = require('./modules/http-server');

class App {
    static run() {
        const server = new HttpServer();

        server.get('/getDate', (req, res) => {
            res.status(200).send(`
                <span style="color: blue;">
                    Hello ${req.queryParams.name}, what a beautiful day. Server current date and time is ${Utils.getDate()}
                </span>
            `)
        })

        server.listen(server.DEFAULT_PORT, () => {
            console.log(`Server listening on port ${server.DEFAULT_PORT}`);
        });
    }
}

App.run();