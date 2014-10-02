'use strict';

module.exports = {
  db: 'mongodb://quicklinktester:notatestreally@ds033390.mongolab.com:33390/fastroad',
  /**
   * Database options that will be passed directly to mongoose.connect
   * Below are some examples.
   * See http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect-options
   * and http://mongoosejs.com/docs/connections.html for more information
   */
  dbOptions: {
    /*
    server: {
        socketOptions: {
            keepAlive: 1
        },
        poolSize: 5
    },
    replset: {
      rs_name: 'myReplicaSet',
      poolSize: 5
    },
    db: {
      w: 1,
      numberOfRetries: 2
    }
    */
  },
  app: {
    name: 'Badger - links - prod'
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
