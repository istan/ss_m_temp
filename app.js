/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

if (typeof Number.prototype.toRad == 'undefined') {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

Ext.require([
    'stable_mobile.util.Settings'
])

Ext.Loader.setPath({
    'Deft': 'deft/src/js'
});

Ext.application({
    name: 'stable_mobile',

    requires: [
        'Ext.MessageBox',
        'stable_mobile.view.SignIn'
    ],

    models: ["Horse", "Person", "User", "Record", "Event", "Login", "Service", "Temperature"],

    stores: [
        "BaseStore",
        "Horses",
        "Events",
        "Records",
        "Contacts",
        "Services",
        "HealthRecords",
        "Temperatures"
    ],

    views: [
        'Main', 
        'Start', 
        'Settings', 
        'horse.List', 
        'horse.Show',
        'horse.Info',
        'horse.Form',
        'horse.TempAdder',
        'horse.TempIndex',
        'horse.TempList',
        'Horses', 
        'Events',
        'event.List',
        'record.List',
        'record.Show',
        'Contacts', 
        'contact.List',
        'contact.Form',
        'contact.Show', 
        'service.List', 
        'service.Index',
        'service.Form',
        'health.Index',
        'health.form.Dental',
        'health.form.Farrier',
        'health.form.Injury',
        'health.form.Joint',
        'health.form.Medication',
        'health.form.Therapy',
        'health.form.Other',
        'health.form.Vaccination',
        'health.form.Worming',
        'health.medication.List',
        'health.medication.Index',
        'health.vaccination.List',
        'health.vaccination.Index'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        var platformContains = function(string) {
            if(string == null || string == undefined || string == "") {
                return true;
            }   
            return device.platform.indexOf(string) != -1
        }

        document.addEventListener('deviceready', function () {
            if (Ext.os.is.iOS && Ext.os.version.major >= 7 && Ext.os.version.major < 8) {
                document.body.style.marginTop = "20px";
                Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
            } else if (Ext.os.version.major > 8) {
                Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight());
            }
        });
        
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        if (!device) var device = navigator

        var noHardwareName = (!platformContains("iPhone") && !platformContains("iPad") && !platformContains("Android") && !platformContains("Linux"))
        
        if(!device || noHardwareName) {

            // browser

            SS.activeDomain = SS.domains.dev

        } else {

            console.log("DEVICE!");

            SS.device = true
            
            if (platformContains("Simulator")) {
                SS.activeDomain = SS.domains.prod
            } else {
                SS.activeDomain = SS.domains.prod
            }

            if (platformContains("Android") || platformContains("Linux")) {
                SS.android = true;
            }
        }

        if (localStorage.getItem('currentUser')) {
            SS.user = JSON.parse(localStorage.getItem('currentUser'));
            SS.signedIn = true;
        }

        if (localStorage.getItem('horses')) {
            SS.cache.horses = JSON.parse(localStorage.getItem('horses'));
        }

        if(Ext.os.is.iOS && Ext.os.version.major >= 7  && Ext.os.version.major < 8) {
            Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);    
        }

        SS.api.init()
        
        // Initialize the main view
        Ext.Viewport.add(SS.addCmp('#main', 'stable_mobile.view.Main'));

        // init resume event
        document.addEventListener("resume", SS.helpers.resume, false);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
