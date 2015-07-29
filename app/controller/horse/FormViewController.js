(function() {
  Ext.define("stable_mobile.controller.horse.FormViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      saveBtn: {
        listeners: {
          tap: 'onSave'
        }
      }
    },
    init: function() {
      var theView;
      console.log('init form controller');
      theView = this.getView();
      if (theView.down('#ownerField')) {
        return this.populateOwnerSelector();
      }
    },
    populateOwnerSelector: function() {
      var contactsStore, form, opts, select;
      contactsStore = Ext.getStore('contactsStore');
      form = this.getView();
      opts = contactsStore.returnRole(null);
      select = form.down('#ownerField');
      if (select) {
        select.setOptions(opts);
        return select.setValue(0);
      }
    },
    onSave: function() {
      var field, fields, form, i, len, values;
      form = this.getView();
      values = form.getValues();
      fields = [form.down('#nameField')];
      for (i = 0, len = fields.length; i < len; i++) {
        field = fields[i];
        if (field && !field.getValue()) {
          SS.helpers.alert('no data', 'you must enter a value for the Name field!', 'OK');
          return;
        }
      }
      return this.post(values);
    },
    post: function(payload) {
      var form, k, method, theUrl, v;
      form = this.getView();
      for (k in payload) {
        v = payload[k];
        if (payload[k] === 0) {
          payload[k] = null;
        }
      }
      payload['auth_token'] = SS.user.auth_token;
      payload['user_id'] = SS.user.id;
      theUrl = SS.api.endpoints.horses.index;
      if (!SS.helpers.hasInternet()) {
        console.log('no connection - storing for later');
        SS.helpers.queueUp({
          url: theUrl,
          payload: payload
        });
        SS.helpers.alert('poor network!', 'health record queued up for later saving', 'OK');
        form.up('navigationview').pop();
        return false;
      }
      SS.helpers.maskedStart('Saving...');
      method = "POST";
      return Ext.Ajax.request({
        method: method,
        url: theUrl,
        params: payload,
        timeout: 30000,
        success: (function(_this) {
          return function(result) {
            var data;
            data = JSON.parse(result.responseText);
            SS.helpers.maskedStop();
            SS.helpers.vibrate();
            SS.helpers.alert('Got it!', 'Horse added', 'OK');
            return form.up('navigationview').pop();
          };
        })(this),
        failure: function(e) {
          SS.helpers.maskedStop();
          console.log(e);
          return SS.helpers.alert('Sorry!', e.responseText);
        }
      });
    }
  });

}).call(this);
