/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Tryout = require('./tryout.model');

exports.register = function(socket) {
  Tryout.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Tryout.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('tryout:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('tryout:remove', doc);
}