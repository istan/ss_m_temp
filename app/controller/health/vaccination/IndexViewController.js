(function() {
  Ext.define("stable_mobile.controller.health.vaccination.IndexViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      vaccinationList: true,
      saveBtn: {
        listeners: {
          tap: 'onSaveBtn'
        }
      },
      dateField: true
    },
    init: function() {
      var opts, theList;
      opts = SS.cache.usableTypes.vaccination_types;
      theList = this.getVaccinationList();
      return theList.setData(opts);
    },
    onSaveBtn: function() {
      var horseId, i, j, len, payload, theUrl, vaccine, vaccines;
      console.log('save records');
      horseId = this.getView().config.horseId;
      vaccines = this.getVaccinationList().getSelection();
      if (!vaccines || vaccines.length === 0) {
        SS.helpers.alert('no data', 'you must make a selection', 'OK');
        return;
      }
      payload = {
        auth_token: SS.user.auth_token,
        horse_id: horseId,
        user_id: SS.user.id,
        administered_at: this.getDateField().getValue()
      };
      for (i = j = 0, len = vaccines.length; j < len; i = ++j) {
        vaccine = vaccines[i];
        payload["vaccination_records[" + i + "][vaccination_type_id]"] = vaccine.data.id;
        payload["vaccination_records[" + i + "][price]"] = vaccine.data.price;
      }
      theUrl = SS.api.endpoints.health.vaccination;
      if (!SS.helpers.hasInternet()) {
        console.log('no connection - storing for later');
        SS.helpers.queueUp({
          url: theUrl,
          payload: payload
        });
        SS.helpers.alert('poor network!', 'vaccination records queued up for saving when network returns.', 'OK');
        this.getView().up('navigationview').pop();
        return false;
      }
      SS.helpers.maskedStart('saving...');
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
            SS.helpers.alert('Got it!', 'Vaccinations recorded', 'OK');
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
