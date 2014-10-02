// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var linkServer = {

  linkServerAuthAddress: 'http://127.0.0.1:3000/auth/google', 
  linkServerAddLinkAddress: 'http://127.0.0.1:3000/articles',
  /**
  * get a list of links for a user
  */
  addLink_: function () {
    var req = new XMLHttpRequest();
    var _id = "541959c6e30c83f818f7849c";
    // alert("adding a link");
    //console.log(this.linkServerAuthAddress);
    req.open("GET", this.linkServerAuthAddress, true);
    req.onload = this.showLink_.bind(this);
    req.send(null);
  },

  sendCurrentTabUrl_ : function (image) {
    chrome.tabs.getSelected(null, function(tab) {
        var jdata = {
          title : tab.url,
          folder : 'new'
        };
        if (image) {
          jdata.image = image;
        }
        
        $.ajax
        ({
            type: "POST",
            //the url where you want to sent the userName and password to
            url: 'http://127.0.0.1:3000/articles',
            dataType: 'json',
            async: false,
            //json object to sent to the authentication url
            data: jdata,
            success: function () {
              console.log('sent');
            },
            error: function (a, b, c) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
        })
    }); 
  },

  /**
  * create the display of links
  */
  showLink_: function (e) {
    
    var response = e.target.response;
    console.log(response);

    var self = this;

    chrome.tabs.captureVisibleTab(null, {format:'png'}, function (fullImage) {

        // You can add that image HTML5 canvas, or Element.
        var image = document.createElement('img');
        image.src = fullImage;
        console.log(image);
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        ctx.canvas.width = 100;
        ctx.canvas.height = 100;

        ctx.drawImage(image, 0, 0, 100, 100);
        var shrinked = canvas.toDataURL('image/png');
        console.log(shrinked);
        self.sendCurrentTabUrl_(shrinked);
    });

    
  }
};

var preamble = {
  /**
  * found on stack overflow, anchor need to be enabled to work
  */
  enableLinks_: function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  //alert("document is loaded");
  preamble.enableLinks_();
  linkServer.addLink_();
});
