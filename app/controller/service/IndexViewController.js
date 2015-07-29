(function() {
  Ext.define("stable_mobile.controller.service.IndexViewController", {
    extend: "Deft.mvc.ViewController",
    requires: ['stable_mobile.model.Service'],
    control: {
      serviceList: true,
      saveBtn: {
        listeners: {
          tap: 'onSaveBtn'
        }
      },
      dateField: true
    },
    init: function() {
      return this.fetchServices();
    },
    fetchServices: function() {
      var horse, item, j, len, path, ref, results, theList, theStore;
      horse = this.getView().getData();
      theStore = Ext.getStore('servicesStore');
      theList = this.getServiceList();
      if (!theStore) {
        theStore = Ext.create("stable_mobile.store.Services");
      }
      theList.setStore(theStore);
      if (SS.helpers.hasInternet()) {
        path = "" + SS.activeDomain + SS.api.preface + "horses/" + horse.id + "/services";
        return theStore.loadProxy(path, null, null, null, this.cacheResults, this);
      } else {
        console.log('no network - using cache');
        if (SS.cache.horses[horse.id] && SS.cache.horses[horse.id].usableServices) {
          ref = SS.cache.horses[horse.id].usableServices.items;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            item = ref[j];
            results.push(theStore.add(item.data));
          }
          return results;
        }
      }
    },
    cacheResults: function() {
      var horse, store, theData;
      horse = this.getView().getData();
      store = this.getServiceList().getStore();
      theData = store.getData();
      if (SS.cache.horses[horse.id]) {
        return SS.cache.horses[horse.id]['usableServices'] = theData;
      } else {
        return SS.cache.horses[horse.id] = {
          usableServices: theData
        };
      }
    },
    onSaveBtn: function() {
      var horse, i, j, len, payload, service, services, theUrl;
      console.log('save records');
      horse = this.getView().getData();
      services = this.getServiceList().getSelection();
      if (!services || services.length === 0) {
        SS.helpers.alert('No data', 'You must make a selection', 'OK');
        return;
      }
      payload = {
        auth_token: SS.user.auth_token,
        horse_id: horse.id,
        administered_at: this.getDateField().getValue()
      };
      for (i = j = 0, len = services.length; j < len; i = ++j) {
        service = services[i];
        payload["service_records[" + i + "][serviceship_id]"] = service.data.id;
        payload["service_records[" + i + "][comments]"] = service.data.notes;
        payload["service_records[" + i + "][price]"] = service.data.price;
      }
      theUrl = SS.api.endpoints.service.post;
      if (!SS.helpers.hasInternet()) {
        console.log('no connection - storing for later');
        SS.helpers.queueUp({
          url: theUrl,
          payload: payload
        });
        SS.helpers.alert('Poor network!', 'Service records queued up for saving when network returns.', 'OK');
        this.getView().up('navigationview').pop();
        return false;
      }
      SS.helpers.maskedStart('Saving records...');
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
            SS.helpers.alert('Got it!', 'Services recorded', 'OK');
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
