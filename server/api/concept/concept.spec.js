'use strict';
//posible help link for testing authenticated links
//https://github.com/DaftMonk/generator-angular-fullstack/issues/494

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/concepts', function() {

  //before each test create a user with admin
  //create some concepts with that user try to get them

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/concepts')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
