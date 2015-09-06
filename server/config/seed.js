/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';


var User = require('../api/user/user.model');


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    status:true,
    email: 'admin@admin.com',
    password: 'admin'
  },
    {
      provider: 'local',
      role: 'user',
      name: 'Ricardo',
      status:true,
      email: 'rick@msn.com',
      password: '12345'
    },
    function() {
      console.log('finished populating users');
    }
  );
});
