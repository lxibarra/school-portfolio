/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Concept = require('./concept.model');

exports.register = function(socket) {
  Concept.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Concept.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('concept:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('concept:remove', doc);
}