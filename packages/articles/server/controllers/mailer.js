'use strict';

/**
 * Module dependencies.
 */
var Nodemailer = require('nodemailer');
var Transporter = Nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'quicklinktester@gmail.com',
        pass: '=5!hacKer9'
    }
});
var mongoose = require('mongoose');
var Person = mongoose.model('Person');

var defaultMessage = function() {
  return 'Check out this awesome link.';
};

var clinkerSignature = function(message, link) {
  return ('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
  '<html xmlns="http://www.w3.org/1999/xhtml"> ' +
  '<head> ' +
  '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> ' +
      '<title>Demystifying Email Design</title> ' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0"/> ' +
    '</head> ' +
      '<body>' +
        '<table border="0px" cellpadding="0" cellspacing="0" width="100%" >' +
         '<tr>' +
           '<td style="padding: 40px 20px 20px 20px; color: #112222; font-family: Arial, sans-serif; font-size: 24px;">' +
            '@MESSAGE' +
           '</td>' +
         '</tr>' +
         '<tr>' +
           '<td style="padding: 20px 20px 60px 20px; color: #112222; font-family: Arial, sans-serif; font-size: 24px;">' +
            '<a>' +
             '@LINK' +
            '</a>' +
           '</td>' +
         '</tr>' +
         '<tr>' +
           '<td>' +
             '<table border="0px" cellpadding="0" cellspacing="0" width="80%" style="border-top-style: solid; border-width:1px; border-color:#5AC9CE">' +
               '<tr>' +
                '<td align="right" style="padding: 0px 10px 0px 0px; color: #999999; font-size: 20px;">' +
                 'Sent By' +
                '</td>' +
                '<td align="middle" width="20%" bgcolor="#C5628A" style="padding: 20px 0px 20px 0px; color: #ffffff; font-family: Arial, sans-serif; font-size: 24px;">' +
                 'Badger' +
                '</td>' +
                '<td style="padding: 0px 0px 0px 10px; color: #999999; font-size: 20px;">' +
                 '<a href="http://127.0.0.1:3000/#!/" style="color: #999999; text-decoration: none;">' +
                  'badger.com' +
                 '</a>' +
                '</td>' +
               '</tr>' +
             '</table>' +
           '</td>' +
         '</tr>' +
        '</table>' +
      '</body>' +
    '</html> ').replace('@MESSAGE', message).replace('@LINK', link);
};

var sendArticleToPerson = function(article, person, from) {
  var message = person.message !== undefined ? person.message : defaultMessage();
  Transporter.sendMail({
      from: from,
      to: person.address,
      subject: from, 
      html: clinkerSignature(message, article.title)
  });
};

exports.send = function(req, res, next) {
  console.log('sending mail');
  Person.find({selected:true}).exec(function(err, persons) {
    if (!err) {
      persons.forEach(function(person){
        sendArticleToPerson(req.article, person, req.user.name);
      });
    }
    res.json();
  });
};
