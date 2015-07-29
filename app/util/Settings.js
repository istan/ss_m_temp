(function() {
  Ext.define("stable_mobile.util.Settings", {
    singleton: true,
    alternateClassName: 'SS',
    fa: function(itemId) {
      return Ext.ComponentQuery.query(itemId);
    },
    f: function(itemId) {
      var group;
      group = Ext.ComponentQuery.query(itemId);
      if (group.length) {
        return Ext.ComponentQuery.query(itemId)[0];
      }
    },
    addCmp: function(itemId, className, params) {
      var cmp, current;
      if (params == null) {
        params = {};
      }
      console.log("adding component with id: " + itemId);
      current = SS.f(itemId);
      if (current) {
        cmp = current;
      } else {
        cmp = Ext.create(className, params);
      }
      return cmp;
    },
    helpers: {
      vibrate: function() {
        if (SS.device) {
          return navigator.notification.vibrate(200);
        }
      },
      alert: function(title, msg, button, callback) {
        if (callback == null) {
          callback = null;
        }
        if (SS.device) {
          return navigator.notification.alert(msg, callback, title, button);
        } else {
          return Ext.Msg.alert(title, msg, callback);
        }
      },
      fetchUsableTypes: function(callback, scope) {
        if (!SS.helpers.hasInternet()) {
          console.log('no connection');
          return false;
        }
        return Ext.Ajax.request({
          method: 'GET',
          url: SS.api.endpoints.user.usableTypes + "?auth_token=" + SS.user.auth_token,
          timeout: 30000,
          success: (function(_this) {
            return function(result) {
              var data;
              data = JSON.parse(result.responseText);
              SS.cache.usableTypes = data;
              if (callback) {
                return callback.call(scope);
              }
            };
          })(this),
          failure: function(e) {
            return console.log(e);
          }
        });
      },
      maskedStart: function(message, view) {
        if (!view) {
          view = Ext.Viewport;
        }
        return view.mask({
          xtype: 'loadmask',
          message: message,
          indicator: true
        });
      },
      maskedStop: function(view) {
        if (!view) {
          view = Ext.Viewport;
        }
        return view.setMasked(false);
      },
      activityStart: function() {
        if (SS.device && !SS.android && navigator.notificationEx) {
          return navigator.notificationEx.activityStart();
        }
      },
      activityStop: function() {
        if (SS.device && !SS.android && navigator.notificationEx) {
          return navigator.notificationEx.activityStop();
        }
      },
      hasInternet: function() {
        if (SS.device && (navigator.connection === void 0 || navigator.connection.type === "none")) {
          return false;
        } else {
          if (navigator && navigator.onLine) {
            return true;
          } else {
            return false;
          }
        }
      },
      queueUp: function(params) {
        var error, store, theQueue;
        if (!params) {
          return console.log('no params - aborting');
        } else {
          try {
            store = localStorage.getItem('queue');
            if (store) {
              theQueue = JSON.parse(store);
            } else {
              theQueue = [];
            }
            theQueue.push(params);
            return localStorage.setItem('queue', JSON.stringify(theQueue));
          } catch (_error) {
            error = _error;
            return console.log(error);
          }
        }
      },
      sendQueue: function() {
        var i, item, len, payload, results, store, theQueue, theUrl;
        store = localStorage.getItem('queue');
        if (!store) {
          console.log('no queue');
          return false;
        }
        theQueue = JSON.parse(store);
        results = [];
        for (i = 0, len = theQueue.length; i < len; i++) {
          item = theQueue[i];
          theUrl = item.url;
          payload = item.payload;
          results.push(Ext.Ajax.request({
            method: 'POST',
            url: theUrl,
            params: payload,
            timeout: 30000,
            success: (function(_this) {
              return function(result) {
                console.log('queued item posted successfully');
                theQueue.pop(item);
                return localStorage.setItem('queue', JSON.stringify(theQueue));
              };
            })(this),
            failure: function(e) {
              console.log('failed to send queued item - requeue');
              return SS.helpers.queueUp({
                url: theUrl,
                payload: payload
              });
            }
          }));
        }
        return results;
      },
      checkConnectivityAndQueue: function() {
        var error;
        if (!SS.signedIn || SS.sendingQueue) {
          return false;
        }
        if (SS.helpers.hasInternet()) {
          try {
            console.log('has connection - checking queue');
            SS.sendingQueue = true;
            SS.helpers.sendQueue();
            return Ext.defer((function(_this) {
              return function() {
                return SS.sendingQueue = false;
              };
            })(this), 60000);
          } catch (_error) {
            error = _error;
            SS.sendingQueue = false;
            return console.log(error);
          }
        } else {
          SS.sendingQueue = false;
          return console.log('no connection - do nothing');
        }
      },
      resume: function() {
        var error;
        try {
          return SS.helpers.checkConnectivityAndQueue();
        } catch (_error) {
          error = _error;
          return console.log(error);
        }
      },
      adjustDateHandler: function(store) {
        return store.on('load', function(store, records, successful, operation, eOpts) {
          var adjustedDate, date, i, len, rec, results;
          results = [];
          for (i = 0, len = records.length; i < len; i++) {
            rec = records[i];
            date = rec.get('administered_at');
            if (date) {
              adjustedDate = Ext.Date.add(date, Ext.Date.DAY, 1);
              results.push(rec.set('administered_at', adjustedDate));
            } else {
              results.push(void 0);
            }
          }
          return results;
        });
      }
    },
    user: {},
    cache: {
      usableTypes: {},
      horses: {}
    },
    signedIn: false,
    version: 180,
    device: false,
    android: false,
    sendingQueue: false,
    domains: {
      prod: 'http://stablesecretary.herokuapp.com',
      staging: 'http://stablesecretary-staging.herokuapp.com',
      dev: 'http://localhost:3000'
    },
    activeDomain: 'http://stablesecretary.herokuapp.com',
    api: {
      preface: "/api/v1/",
      endpoints: {
        login: null,
        user: {
          usableTypes: null,
          checkSubs: null
        },
        health: {
          farrier: null,
          worming: null,
          dental: null,
          medication: null,
          general: null,
          injury: null,
          vaccination: null,
          joint: null,
          temperature: null,
          therapy: null
        },
        service: {
          post: null,
          destroy: null
        },
        horses: {
          index: null
        },
        events: {
          index: null
        },
        people: {
          index: null
        }
      },
      init: function() {
        var api;
        api = SS.api.endpoints;
        return api.login = "" + SS.activeDomain + SS.api.preface + "mobile_logins";
      },
      fullInit: function(callback, scope) {
        var api, theUser;
        api = SS.api.endpoints;
        theUser = "users/" + SS.user.id + "/";
        api.health.farrier = "" + SS.activeDomain + SS.api.preface + "farrier_records";
        api.health.dental = "" + SS.activeDomain + SS.api.preface + "dental_records";
        api.health.medication = "" + SS.activeDomain + SS.api.preface + "medication_records";
        api.health.joint = "" + SS.activeDomain + SS.api.preface + "joint_records";
        api.health.injury = "" + SS.activeDomain + SS.api.preface + "injuries";
        api.health.general = "" + SS.activeDomain + SS.api.preface + "general_health_records";
        api.health.vaccination = "" + SS.activeDomain + SS.api.preface + "vaccination_records";
        api.health.worming = "" + SS.activeDomain + SS.api.preface + "worming_records";
        api.health.therapy = "" + SS.activeDomain + SS.api.preface + "therapy_records";
        api.health.temperature = "" + SS.activeDomain + SS.api.preface + "temperatures";
        api.service.post = "" + SS.activeDomain + SS.api.preface + theUser + "service_records";
        api.service.destroy = "" + SS.activeDomain + SS.api.preface + "service_records";
        api.user.usableTypes = "" + SS.activeDomain + SS.api.preface + theUser + "usable_types";
        api.user.checkSubs = "" + SS.activeDomain + SS.api.preface + theUser + "check_subs";
        api.horses.index = "" + SS.activeDomain + SS.api.preface + theUser + "horses";
        api.events.index = "" + SS.activeDomain + SS.api.preface + theUser + "events";
        api.people.index = "" + SS.activeDomain + SS.api.preface + theUser + "people";
        api.people.add = "" + SS.activeDomain + SS.api.preface + "people";
        if (callback) {
          return callback.call(scope);
        } else {
          return true;
        }
      }
    },
    copy: {
      noData: "<p class='no-data'>no data retrieved!</p>",
      noEvents: "<p class='no-data'>no events scheduled for next two weeks!</p>",
      noHorses: "<p class='no-data'>you don't have any horses. you can add them via the website!</p>",
      noContacts: "<p class='no-data'>no contacts found. you can add them via the website!</p>",
      noMeds: "<p class='no-data'>no medications found for this horse. add prescriptions to your horses via the Stable Secretary website!</p>",
      noVacs: "<p class='no-data'>no vaccines found. add vaccines to your stable via the Stable Secretary website!</p>"
    },
    templates: {}
  });

}).call(this);
