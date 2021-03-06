const express = require('express');

const request = require('./../services/request');

const router = new express.Router({});

/**
 * Homepage route, which will redirect to page with random stream id.
 *
 * @param {Object} req HTTP request.
 * @param {Object} res HTTP response.
 */
router.get('/', (req, res) => {
  const streamId = Math.random().toString(36).substring(2);
  res.redirect(`/${streamId}`);
});

/**
 * Stream page route. Renders web page for particular stream id.
 *
 * @param {Object} req HTTP request.
 * @param {Object} res HTTP response.
 */
router.get('/:streamId?', (req, res) => {
  res.render('index', {
    hostName: global.APP_HOST_NAME,
    host: global.APP_HOST,
    port: global.APP_PORT_FOR_HELP_BLOCK,
    socketIoJs: global.APP_SOCKET_IO_JS,
    streamId: req.params.streamId,
    sentryDSN: global.SENTRY_DSN_FRONTEND,
    googleAnalyticsId: global.GOOGLE_ANALYTICS_ID,
    frontEndPort: global.APP_PORT_FOR_FRONT_END,
  });
});

/**
 * Post message into page with particular stream id.
 *
 * @emits LOG.NEW
 *
 * @param {Object} req HTTP request.
 * @param {Object} res HTTP response.
 */
router.post('/:streamId?', (req, res) => {
  if (typeof global.socket === 'undefined') {
    res.status(406);
    res.send('Runtime error 20180921-1: socket is undefined.');
    return;
  }

  // Capture message sender ip address as additional information.
  const ip = request.getIp(req);

  // Emit WebSocket event.
  if (req.headers['content-type'] === 'application/json') {
    // Socket.io rooms disabled here because rooms provide restricted behavior,
    // for example: it is impossible to open in one browser two or three different streams (rooms).
    global.socket.emit('log', {
      streamId: req.params.streamId, format: 'json', data: req.body, ip,
    });
  }

  // No need to provide any payload, just empty body and success status code.
  res.status(204);
  res.send('');
});

module.exports = router;
