/**
 * All top app configs housed here.
 */

global.APP_PORT = process.env.PORT || 3000;
global.APP_PORT_FOR_FRONT_END = process.env.ENV === 'prod' ? 443 : 8080;
global.APP_PORT_FOR_HELP_BLOCK = process.env.ENV === 'prod' ? 443 : global.APP_PORT;
global.APP_HOST_NAME = process.env.ENV === 'prod' ? 'realtimelog.herokuapp.com' : 'localhost';
global.APP_HOST = process.env.ENV === 'prod' ? `https://${global.APP_HOST_NAME}` : `http://${global.APP_HOST_NAME}`;
global.APP_SOCKET_IO_JS = `${process.env.ENV === 'prod' ? global.APP_HOST : ''}/socket.io/socket.io.js`;

global.SENTRY_DSN_FRONTEND = process.env.SENTRY_DSN_FRONTEND;
global.SENTRY_DSN_BACKEND = process.env.SENTRY_DSN_BACKEND;

global.GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;

global.NEW_RELIC_APP_NAME = `log-${process.env.ENV}`;
global.NEW_RELIC_LOGGING_LEVEL = 'info';
global.NEW_RELIC_LICENSE_KEY = process.env.NEW_RELIC_LICENSE_KEY;
