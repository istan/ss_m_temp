(function() {
  Ext.define("stable_mobile.controller.health.medication.IndexViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      medList: true,
      saveBtn: {
        listeners: {
          tap: 'onSaveBtn'
        }
      },
      dateField: true
    },
    init: function() {
      var opts, theList;
      opts = this.getView().config.prescriptions;
      theList = this.getMedList();
      return theList.setData(opts);
    },
    onSaveBtn: function() {
      var horseId, i, j, len, med, meds, payload, theUrl;
      console.log('save records');
      horseId = this.getView().config.horseId;
      meds = this.getMedList().getSelection();
      if (!meds || meds.length === 0) {
        SS.helpers.alert('no data', 'you must make a selection', 'OK');
        return;
      }
      payload = {
        auth_token: SS.user.auth_token,
        horse_id: horseId,
        user_id: SS.user.id,
        administered_at: this.getDateField().getValue()
      };
      for (i = j = 0, len = meds.length; j < len; i = ++j) {
        med = meds[i];
        payload["medication_records[" + i + "][prescription_id]"] = med.data.id;
        payload["medication_records[" + i + "][dosage_cost]"] = med.data.dosage_cost;
        payload["medication_records[" + i + "][dosage_unit]"] = med.data.dosage_unit;
        payload["medication_records[" + i + "][dose_type]"] = med.data.dose_type;
        payload["medication_records[" + i + "][markup]"] = med.data.markup;
        payload["medication_records[" + i + "][dosage]"] = med.data.dosage;
        payload["medication_records[" + i + "][comments]"] = med.data.comments;
        payload["medication_records[" + i + "][person_id]"] = med.data.person_id;
      }
      theUrl = SS.api.endpoints.health.medication;
      if (!SS.helpers.hasInternet()) {
        console.log('no connection - storing for later');
        SS.helpers.queueUp({
          url: theUrl,
          payload: payload
        });
        SS.helpers.alert('poor network!', 'medication records queued up for saving when network returns.', 'OK');
        this.getView().up('navigationview').pop();
        return false;
      }
      SS.helpers.maskedStart('saving meds...');
      return Ext.Ajax.request({
        method: 'POST',
        url: theUrl,
        params: payload,
        timeout: 30000,
        success: (function(_this) {
          return function(result) {
            var cachedHorse, data;
            data = JSON.parse(result.responseText);
            SS.helpers.maskedStop();
            SS.helpers.vibrate();
            SS.helpers.alert('Got it!', 'Medications recorded', 'OK');
            if (!SS.cache.horses[horseId]) {
              SS.cache.horses[horseId] = {};
            }
            cachedHorse = SS.cache.horses[horseId];
            cachedHorse['prescriptions'] = data;
            return _this.getView().up('navigationview').pop(2);
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
