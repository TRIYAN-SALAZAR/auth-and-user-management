'use strict';

import server from "./app.js";

async function start() {
    server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening on ${address}`);
    });
}

start();