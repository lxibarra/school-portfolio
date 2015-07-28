/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Portfolios = require('./portfolios.model');

exports.register = function(socket) {
  Portfolios.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Portfolios.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('portfolios:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('portfolios:remove', doc);
}