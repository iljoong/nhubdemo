var express = require('express');
var router = express.Router();

var azureMobileApps = require('azure-mobile-apps')();
var azureCommon = require('azure-common');

var InstallationResult = require('./instres');
var WebResource = azureCommon.WebResource;
    
/* GET home page. */
router.get('/home', function(req, res, next) {
      
    req.azureMobile.push.listRegistrations(function (err, response){
        if (!err) {
            //console.log( JSON.stringify(response, null, 2));
            res.render('index', { title: "Portal", entries: response });
        }
        
    });
});

// INFO BY REGID
router.get('/reg/:id', function(req, res, next) {
 
    var regid = req.params.id;
    req.azureMobile.push.getRegistration(regid, function (err, response) {
        
        var content = JSON.stringify(response, null, 2);
        res.render('reg', { title: regid, body: content }); 
           
    }); 
});

router.get('/tag/:id', function(req, res, next) {
    
    var iid = req.params.id;
    var push = req.azureMobile.push;
    var webResource = WebResource.get(push.hubName + '/installations/' + iid);
    webResource.rawResponse = true; // for returning a json body type. default is a xml body

    push._executeRequest(webResource, null, InstallationResult, null, function (err, response) {
        if (err) {
            //console.log(err);
            res.render('log', { title: iid, content: err });            
        }
        else {
            //console.log("body:", response);
            var msg = JSON.parse(response);
            res.render('edittag', { title: iid, tags: msg.tags });                         
        }       
    });
    
});

// ADD TAG
router.post('/tag/', function(req, res, next) {
    
    var iid = req.body.iid;
    var tag = req.body.tag; 

    var push = req.azureMobile.push;
    var webResource = WebResource.patch(push.hubName + '/installations/' + iid);
    webResource.rawResponse = true;
    var payload = "[{\"op\": \"add\", \"path\": \"/tags\", \"value\": '" + tag +  "' }]";

    push._executeRequest(webResource, payload, InstallationResult, null, function (err, response) {
        
        if (err) {
            console.log(err);
            res.render('log', { title: iid, content: err });
        } else {
            res.redirect("/home");
        }        
    });
});

// REMOVE TAG
router.get('/tag/:id/:tag', function(req, res, next) {
    
    var iid = req.params.id;
    var tag = req.params.tag;
    
    var push = req.azureMobile.push;
    var webResource = WebResource.patch(push.hubName + '/installations/' + iid);
    webResource.rawResponse = true;
    var payload = "[{\"op\": \"remove\", \"path\": \"/tags/" + tag + "\"}]";

    push._executeRequest(webResource, payload, InstallationResult, null, function (err, response) {
        
        if (err) {
            console.log(err);
            res.render('log', { title: iid, content: err });
        } else {
            res.redirect("/home");
        }        
    });
});

// EDIT TEMPLATE
router.get('/temp/:id', function(req, res, next) {
    
    var iid = req.params.id;

    var push = req.azureMobile.push;
    var webResource = WebResource.get(push.hubName + '/installations/' + iid);
    webResource.rawResponse = true;

    push._executeRequest(webResource, null, InstallationResult, null, function (err, response) {
        
        if (err) {
            console.log(err);
            res.render('log', { title: iid, content: err });
        } else {
            var json = JSON.parse(response);
            res.render('edittemp', { iid: iid, data: json });
        }        
    });
});

// ADD TEMPLATE
router.post('/temp', function(req, res, next) {
    
    var iid = req.body.iid;
    var pushch = req.body.pushch;
    var platform = req.body.platform;
    var template = req.body.temp;

    var _value = { body: template };
    if (platform == 'wns') {
        _value.headers = { "X-WNS-Type": "wns/toast" };
    }
        
    var _payload = [{
        op: "add", 
        path: "/templates/template", 
        value: JSON.stringify(_value)
    }];
   
    var push = req.azureMobile.push;
    var webResource = WebResource.patch(push.hubName + '/installations/' + iid);
    webResource.rawResponse = true;
    var payload = JSON.stringify(_payload);

    push._executeRequest(webResource, payload, InstallationResult, null, function (err, response) {
        
        if (err) {
            console.log(err);
            res.render('log', { title: iid, content: err });
        } else {
            res.redirect("/home");
        }        
    });
});

// REMOVE TEMPLATE
router.get('/temp/:id/:tempname', function(req, res, next) {
    
    var iid = req.params.id;
    var tempname = req.params.tempname;

    var push = req.azureMobile.push;
    var webResource = WebResource.patch(push.hubName + '/installations/' + iid);
    webResource.rawResponse = true;
    var payload = "[{\"op\": \"remove\", \"path\": \"/templates/" + tempname + "\"}]";    

    push._executeRequest(webResource, payload, InstallationResult, null, function (err, response) {
        
        if (err) {
            console.log(err);
            res.render('log', { title: iid, content: err });
        } else {
            res.redirect("/home");
        }        
    });
});

router.get('/del/:id', function(req, res, next) {
    
    var regid = req.params.id;
    
    req.azureMobile.push.deleteRegistration(regid, function (err, response) {
        if (!err)  {
            res.redirect('/home');
        }
        else {
            res.render('log', {title: "Delete Regid", content: err});   
        }
    });
});

// PUSH
router.get('/push', function(req, res, next) {
    res.render('push');
});

// PUSH - send a template push
router.post('/push', function(req, res, next) {
    var tag = req.body.tag;
    var message = req.body.message;
       
    req.azureMobile.push.send(tag, message, null, function(err, response) {
        if (!err) {
            
            var tid = response.headers.location.replace(/https:\/\/.*\/messages\//gi, "");
            
            res.redirect('/pushres/' + tid);    
        }             
    });
    
});

router.get('/pushres/:tid', function(req, res, next) {
    
    var tid = req.params.tid;
    
    var push = req.azureMobile.push;
    var webResource = WebResource.get(push.hubName + "/messages/" + tid);
    push._executeRequest(webResource, null, null, null, function (err, result) {
    
        if (err) {
            console.log(err2);
            res.render('log', { title: "push result error", content: err });
        } else {
            res.render('tele', { title: "Telemetry", tid: tid, content: JSON.stringify(result.body, null, 2) });
        }
    });         

}); 

router.get('/about', function(req, res, next) {
    res.render('about');
});

// CONFIG
router.get('/config', function(req, res, next) {
    
    var config = JSON.stringify(req.azureMobile.configuration, null, 2); 
    res.render('config', { title: "Portal", content:  config });
});

module.exports = router;
