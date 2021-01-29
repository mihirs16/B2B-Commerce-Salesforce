// connecting to salesforce org
const jsforce = require('jsforce');
const dotenv = require('dotenv');

function login() {
    // env variables
    dotenv.config();
    const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_LOGIN_URL } = process.env;

    // check for environment variables
    if (!(SF_USERNAME && SF_PASSWORD && SF_TOKEN && SF_LOGIN_URL)) {
        console.error(
            'Cannot start app: missing mandatory configuration. Check your .env file.'
        );
        process.exit(-1);
    }

    // connect using jsforce
    const conn = new jsforce.Connection({
        loginUrl: SF_LOGIN_URL
    });

    // login to salesforce org and return a valid connection
    conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, err => {
        if (err) {
            console.error(err);
            process.exit(-1);
        }
    });

    return conn;
}

module.exports = {
    login
} 