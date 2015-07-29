(function() {
  Ext.define("stable_mobile.controller.MainViewController", {
    extend: "Deft.mvc.ViewController",
    requires: ['stable_mobile.model.Horse'],
    control: {
      view: {
        listeners: {
          painted: 'onPainted'
        }
      }
    },
    init: function() {
      return console.log("we're alive");
    },
    onPainted: function() {
      if (!SS.signedIn) {
        return this.loadSignInView();
      } else {
        if (!Object.size(SS.cache.horses)) {
          SS.helpers.maskedStart();
        }
        SS.api.fullInit();
        return Ext.defer((function(_this) {
          return function() {
            SS.helpers.fetchUsableTypes();
            return _this.loadSignedInView(function() {
              return SS.helpers.maskedStop();
            });
          };
        })(this), 200);
      }
    },
    checkSubscription: function() {
      return Ext.Ajax.request({
        method: 'GET',
        url: SS.api.endpoints.user.checkSubs,
        timeout: 30000,
        success: (function(_this) {
          return function(result) {
            var data, msg;
            data = JSON.parse(result.responseText);
            console.log(data);
            if (!data.valid) {
              SS.helpers.maskedStart();
              msg = data.message;
              return SS.helpers.alert("Sorry", msg, "OK");
            }
          };
        })(this),
        failure: function(e) {
          return console.log("failed to check subs");
        }
      });
    },
    loadSignInView: function() {
      return Ext.Viewport.animateActiveItem(SS.addCmp('#start', "stable_mobile.view.Start"), {
        type: 'slide',
        direction: 'right'
      });
    },
    loadSignedInView: function(callback, scope) {
      var contacts, events, horses, mainView;
      mainView = this.getView();
      if (mainView && mainView.getItems().length < 3) {
        this.getView().add([
          {
            xclass: "stable_mobile.view.Horses",
            title: 'Horses',
            iconCls: 'home2',
            iconMask: true
          }, {
            xclass: "stable_mobile.view.Events",
            title: 'Events',
            iconCls: 'calendar2',
            iconMask: true
          }, {
            xclass: "stable_mobile.view.Contacts",
            title: 'People',
            iconCls: 'address_book',
            iconMask: true
          }, {
            xclass: "stable_mobile.view.Settings",
            title: 'Settings',
            iconCls: 'settings',
            iconMask: true
          }
        ]);
      } else {
        horses = Ext.getStore('horsesStore');
        if (horses) {
          horses.setUrl(SS.api.endpoints.horses.index);
          horses.doRefresh();
        }
        events = Ext.getStore('eventsStore');
        if (events) {
          events.setUrl(SS.api.endpoints.events.index);
          events.doRefresh();
        }
        contacts = Ext.getStore('contactsStore');
        if (contacts) {
          contacts.setUrl(SS.api.endpoints.people.index);
          contacts.doRefresh();
        }
      }
      mainView.setActiveItem(0);
      this.checkSubscription();
      if (callback) {
        return callback.call(scope);
      }
    }
  });

}).call(this);
