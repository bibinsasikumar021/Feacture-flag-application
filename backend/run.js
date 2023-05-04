/*******************************************************************************
* Starts the app either on 9000 or the argument port
*
* Contributors: Andrew Dinihan
*******************************************************************************/

(function() {
    "use strict";
    const db = require('./lib/dbDriver');

    db.init((err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('DB connection established');

        // Import "app" from server.js
        const server = require("./server.js");

        /* Set port as either specified by command line or default */
        const defaultPort = 9500;
        
        server.listen(parseInt(process.argv[2]) || defaultPort, () => console.log(`Server has started.`));
    })
}() );
