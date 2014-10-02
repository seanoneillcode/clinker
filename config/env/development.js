'use strict';

module.exports = {
  //db: 'mongodb://localhost/mean-dev1',
  db: 'mongodb://quicklinktester:=5!hacKer9@ds033390.mongolab.com:33390/fastroad',
  mongoose: {
    debug: true
  },
  app: {
    name: 'MEAN - FullStack JS - Development'
  },
  // facebook: {
  //   clientID: 'APP_ID',
  //   clientSecret: 'APP_SECRET',
  //   callbackURL: 'http://localhost:3000/auth/facebook/callback'
  // },
  // twitter: {
  //   clientID: 'CONSUMER_KEY',
  //   clientSecret: 'CONSUMER_SECRET',
  //   callbackURL: 'http://localhost:3000/auth/twitter/callback'
  // },
  // github: {
  //   clientID: 'APP_ID',
  //   clientSecret: 'APP_SECRET',
  //   callbackURL: 'http://localhost:3000/auth/github/callback'
  // },
  google: {
    clientID: '724430680134-6ht44b69a61v0bpmrvcnkbdsuftq6jdm.apps.googleusercontent.com',
    clientSecret: 'ora767htvz8f_KbYPF3e8jsI',
    callbackURL: 'http://127.0.0.1:3000/oauth2callback'
  },
  // linkedin: {
  //   clientID: 'API_KEY',
  //   clientSecret: 'SECRET_KEY',
  //   callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  // },
  emailFrom: 'badger', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'gmail', // Gmail, SMTP
    auth: {
        user: 'quicklinktester@gmail.com',
        pass: '=5!hacKer9'
    }
  }
};
