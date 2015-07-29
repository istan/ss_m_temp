(function() {
  Ext.define("stable_mobile.controller.record.ShowViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      view: true,
      recordContent: true,
      editBtn: {
        listeners: {
          tap: 'onEditBtn'
        }
      },
      deleteBtn: {
        listeners: {
          tap: 'onDeleteBtn'
        }
      }
    },
    init: function() {
      return this.getRecordContent().setData(this.getView().getData());
    },
    onEditBtn: function() {
      var horseId, klass, navView, theData;
      console.log("edit");
      theData = this.getView().getData();
      klass = theData.klass;
      navView = this.getView().up('navigationview');
      horseId = this.getView().config.horseId;
      switch (klass) {
        case "ServiceRecord":
          return navView.push(SS.addCmp("#serviceForm", "stable_mobile.view.service.Form", {
            data: theData,
            horseId: horseId,
            editContext: true,
            title: theData.body
          }));
        case "TherapyRecord":
          return navView.push(SS.addCmp("#therapyForm", "stable_mobile.view.health.form.Therapy", {
            endpoint: 'therapy',
            usableType: 'therapy_types',
            data: theData,
            horseId: horseId,
            editContext: true
          }));
        case "DentalRecord":
          return navView.push(SS.addCmp("#dentalForm", "stable_mobile.view.health.form.Dental", {
            personType: 'dentist',
            endpoint: 'dental',
            data: theData,
            horseId: horseId,
            editContext: true
          }));
        case "FarrierRecord":
          return navView.push(SS.addCmp("#farrierForm", "stable_mobile.view.health.form.Farrier", {
            personType: 'farrier',
            endpoint: 'farrier',
            data: theData,
            horseId: horseId,
            editContext: true
          }));
        case "MedicationRecord":
          return navView.push(SS.addCmp("#medicationForm", "stable_mobile.view.health.form.Medication", {
            endpoint: 'medication',
            data: theData,
            horseId: horseId,
            editContext: true,
            title: theData.body
          }));
        case "JointRecord":
          return navView.push(SS.addCmp("#jointForm", "stable_mobile.view.health.form.Joint", {
            personType: 'veterinarian',
            endpoint: 'joint',
            usableType: 'joint_injection_types',
            data: theData,
            horseId: horseId,
            editContext: true
          }));
        case "Injury":
          return navView.push(SS.addCmp("#injuryForm", "stable_mobile.view.health.form.Injury", {
            endpoint: 'injury',
            usableType: 'injury_types',
            data: theData,
            horseId: horseId,
            editContext: true
          }));
        case "VaccinationRecord":
          return navView.push(SS.addCmp("#vaccinationForm", "stable_mobile.view.health.form.Vaccination", {
            personType: 'veterinarian',
            endpoint: 'vaccination',
            usableType: 'vaccination_types',
            data: theData,
            horseId: horseId,
            editContext: true
          }));
        case "WormingRecord":
          return navView.push(SS.addCmp("#wormingForm", "stable_mobile.view.health.form.Worming", {
            personType: 'veterinarian',
            endpoint: 'worming',
            usableType: 'wormer_types',
            data: theData,
            horseId: horseId,
            editContext: true
          }));
        case "GeneralHealthRecord":
          return navView.push(SS.addCmp("#otherForm", "stable_mobile.view.health.form.Other", {
            endpoint: 'general',
            data: theData,
            horseId: horseId,
            editContext: true
          }));
      }
    },
    onDeleteBtn: function() {
      return Ext.Msg.confirm('Confirm delete', 'Are you sure you want to delete this record?', (function(_this) {
        return function(e) {
          if (e === 'yes') {
            console.log("delete");
            return _this.doDeleteRecord();
          } else {
            return console.log("cancel");
          }
        };
      })(this));
    },
    doDeleteRecord: function() {
      var id, klass, payload, routeMap, theData, theRoute, theUrl;
      theData = this.getView().getData();
      klass = theData.klass;
      id = theData.id;
      routeMap = {
        "ServiceRecord": SS.api.endpoints.service.destroy,
        "DentalRecord": SS.api.endpoints.health.dental,
        "FarrierRecord": SS.api.endpoints.health.farrier,
        "MedicationRecord": SS.api.endpoints.health.medication,
        "JointRecord": SS.api.endpoints.health.joint,
        "Injury": SS.api.endpoints.health.injury,
        "VaccinationRecord": SS.api.endpoints.health.vaccination,
        "WormingRecord": SS.api.endpoints.health.worming,
        "Temperature": SS.api.endpoints.health.temperature,
        "GeneralHealthRecord": SS.api.endpoints.health.general
      };
      theRoute = routeMap[klass];
      theUrl = theRoute + "/" + id;
      payload = {};
      payload['auth_token'] = SS.user.auth_token;
      payload['user_id'] = SS.user.id;
      SS.helpers.maskedStart('deleting...');
      return Ext.Ajax.request({
        method: 'DELETE',
        url: theUrl,
        params: payload,
        timeout: 30000,
        success: (function(_this) {
          return function(result) {
            SS.helpers.maskedStop();
            SS.helpers.vibrate();
            SS.helpers.alert('Deleted!', 'Record removed.', 'OK');
            return _this.getView().up('navigationview').pop();
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
