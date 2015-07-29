(function() {
  Ext.define("stable_mobile.controller.health.FormViewController", {
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
      if (theView.down('#administeredByField')) {
        this.populatePeopleSelector();
      }
      if (theView.down('#typeField')) {
        this.populateTypeSelector();
      }
      if (theView.config.editContext) {
        return this.doPopulateForEditing();
      }
    },
    doPopulateForEditing: function() {
      var dateField, dosageCostField, dosageField, dosageUnitField, form, markupField, notesField, priceField, record;
      form = this.getView();
      record = form.getData();
      priceField = form.down('#priceField');
      if (priceField) {
        priceField.setValue(record.price);
      }
      notesField = form.down('#notesField');
      if (notesField) {
        notesField.setValue(record.comments);
      }
      dateField = form.down('#dateField');
      if (dateField) {
        dateField.setValue(record.administered_at);
      }
      dosageField = form.down('#dosageField');
      if (dosageField) {
        dosageField.setValue(record.dosage);
      }
      dosageUnitField = form.down('#dosageUnitField');
      if (dosageUnitField) {
        dosageUnitField.setValue(record.dosage_unit);
      }
      dosageCostField = form.down('#dosageCostField');
      if (dosageCostField) {
        dosageCostField.setValue(record.dosage_cost);
      }
      markupField = form.down('#markupField');
      if (markupField) {
        return markupField.setValue(record.markup);
      }
    },
    populateTypeSelector: function() {
      var form, opts, select;
      if (this.getView().config.endpoint === 'medication') {
        opts = this.getView().getData().prescriptions;
      } else {
        opts = SS.cache.usableTypes[this.getView().config.usableType];
      }
      form = this.getView();
      select = form.down('#typeField');
      if (select) {
        opts.push({
          name: 'select',
          id: 0
        });
        select.setOptions(opts);
        if (form.config.editContext && (form.getData().type_id != null)) {
          return select.setValue(form.getData().type_id);
        } else {
          return select.setValue(0);
        }
      }
    },
    populatePeopleSelector: function() {
      var contactsStore, form, opts, role, select;
      contactsStore = Ext.getStore('contactsStore');
      form = this.getView();
      role = form.config.personType;
      opts = contactsStore.returnRole(role);
      select = form.down('#administeredByField');
      if (select) {
        opts.push({
          name: 'select',
          id: 0
        });
        select.setOptions(opts);
        if (form.config.editContext && (form.getData().person_id != null)) {
          return select.setValue(form.getData().person_id);
        } else {
          return select.setValue(0);
        }
      }
    },
    onSave: function() {
      var form, typeField, values;
      console.log('saving');
      form = this.getView();
      values = form.getValues();
      typeField = this.getView().down('#typeField');
      if (typeField && !typeField.getValue()) {
        SS.helpers.alert('no data', 'you must select a type', 'OK');
        return;
      }
      return this.post(values);
    },
    post: function(payload) {
      var form, horseId, k, method, record, theUrl, v;
      form = this.getView();
      horseId = form.config.horseId;
      for (k in payload) {
        v = payload[k];
        if (payload[k] === 0) {
          payload[k] = null;
        }
      }
      payload['auth_token'] = SS.user.auth_token;
      payload['horse_id'] = horseId;
      payload['user_id'] = SS.user.id;
      if (form.config.endpoint) {
        theUrl = SS.api.endpoints.health[form.config.endpoint];
      } else {
        theUrl = SS.api.endpoints.service.destroy;
      }
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
      SS.helpers.maskedStart('saving record...');
      method = "POST";
      if (form.config.editContext && form.getData() && (form.getData().id != null)) {
        record = form.getData();
        theUrl = theUrl + "/" + record.id;
        method = "PUT";
      }
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
            SS.helpers.alert('Got it!', 'Record saved', 'OK');
            return form.up('navigationview').pop(2);
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
