(function() {
  Ext.define("stable_mobile.controller.horse.TempAdderViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      saveBtn: {
        listeners: {
          tap: 'onSave'
        }
      },
      viewRecentsBtn: {
        listeners: {
          tap: 'onViewRecents'
        }
      }
    },
    init: function() {
      return console.log('init temp adder controller');
    },
    onSave: function() {
      var form, values;
      console.log('saving');
      form = this.getView();
      values = form.getValues();
      return this.post(values);
    },
    onViewRecents: function() {
      var navView;
      console.log("view recent temps");
      navView = this.getView().up('navigationview');
      if (navView) {
        return navView.push(SS.addCmp("#horseTempIndex", "stable_mobile.view.horse.TempIndex", {
          data: this.getView().getData()
        }));
      }
    },
    post: function(payload) {
      var horse, k, theUrl, v;
      horse = this.getView().getData();
      for (k in payload) {
        v = payload[k];
        if (v === 0) {
          SS.helpers.alert('Not a number!', 'You must enter a number!', 'OK');
          return false;
        }
      }
      payload['auth_token'] = SS.user.auth_token;
      payload['horse_id'] = horse.id;
      payload['user_id'] = SS.user.id;
      theUrl = SS.api.endpoints.health.temperature;
      if (!SS.helpers.hasInternet()) {
        SS.helpers.queueUp({
          url: theUrl,
          payload: payload
        });
        SS.helpers.alert('poor network!', 'record queued up for later saving', 'OK');
        this.getView().up('navigationview').pop();
        return false;
      }
      SS.helpers.maskedStart('saving record...');
      return Ext.Ajax.request({
        method: 'POST',
        url: theUrl,
        params: payload,
        timeout: 30000,
        success: (function(_this) {
          return function(result) {
            var data;
            data = JSON.parse(result.responseText);
            SS.helpers.maskedStop();
            SS.helpers.vibrate();
            SS.helpers.alert('Got it!', 'Temperature saved', 'OK');
            return _this.getView().up('navigationview').pop();
          };
        })(this),
        failure: function(e) {
          SS.helpers.maskedStop();
          console.log(e);
          return SS.helpers.alert('sorry!', e.responseText);
        }
      });
    }
  });

}).call(this);
