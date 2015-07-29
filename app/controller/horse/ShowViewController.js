(function() {
  Ext.define("stable_mobile.controller.horse.ShowViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      view: {
        listeners: {
          painted: 'onPainted'
        }
      },
      horseTop: true,
      horseImage: true,
      horseName: true,
      recordList: true,
      healthRecordsList: true,
      addTempBtn: {
        listeners: {
          tap: 'onAddTempBtn'
        }
      },
      infoBtn: {
        listeners: {
          tap: 'onInfoBtn'
        }
      },
      addHealthBtn: {
        listeners: {
          tap: 'onHealthBtn'
        }
      },
      addServiceBtn: {
        listeners: {
          tap: 'onServiceBtn'
        }
      }
    },
    init: function() {
      return this.populateView();
    },
    populateView: function() {
      var horse;
      horse = this.getView().getData();
      this.getHorseName().setData(horse);
      return this.getHorseImage().setSrc(horse.thumb);
    },
    onPainted: function() {
      var horse;
      this.fetchRecords(this.getView().getData());
      return horse = this.getView().getData();
    },
    adjustDate: function(store) {},
    fetchRecords: function(horse) {
      var healthList, healthStore, serviceList, serviceStore;
      serviceList = this.getRecordList();
      healthList = this.getHealthRecordsList();
      if (serviceList.getStore()) {
        serviceStore = serviceList.getStore();
      } else {
        serviceStore = Ext.create("stable_mobile.store.Records");
        serviceList.setStore(serviceStore);
      }
      if (healthList.getStore()) {
        healthStore = healthList.getStore();
      } else {
        healthStore = Ext.create("stable_mobile.store.HealthRecords");
        healthList.setStore(healthStore);
        SS.helpers.adjustDateHandler(healthStore);
      }
      if (SS.helpers.hasInternet()) {
        SS.helpers.activityStart();
        if (!healthStore.isLoaded()) {
          SS.helpers.maskedStart('Loading...');
        }
        return Ext.Ajax.request({
          method: 'GET',
          url: "" + SS.activeDomain + SS.api.preface + "horses/" + horse.id + "/records?&version=" + SS.version + "&auth_token=" + SS.user.auth_token,
          timeout: 30000,
          success: (function(_this) {
            return function(result) {
              var data;
              SS.helpers.activityStop();
              SS.helpers.maskedStop();
              data = JSON.parse(result.responseText);
              serviceStore.setData(data.service);
              healthStore.setData(data.health);
              return _this.cacheResults();
            };
          })(this),
          failure: function(e) {
            SS.helpers.activityStop();
            SS.helpers.maskedStop();
            return console.log(e);
          }
        });
      } else {
        console.log('no network - using cache');
        this.populateFromCache(horse.id, 'healthRecords', healthStore);
        return this.populateFromCache(horse.id, 'serviceRecords', serviceStore);
      }
    },
    populateFromCache: function(horse_id, rec_type, store) {
      if (SS.cache.horses[horse_id] && SS.cache.horses[horse_id][rec_type]) {
        console.log('grabbing from cache');
        return store.setData(SS.cache.horses[horse_id][rec_type].items);
      }
    },
    cacheResults: function() {
      var healthStore, horse, serviceStore;
      horse = this.getView().getData();
      serviceStore = this.getRecordList().getStore();
      healthStore = this.getHealthRecordsList().getStore();
      if (SS.cache.horses[horse.id]) {
        SS.cache.horses[horse.id]['serviceRecords'] = serviceStore.getData();
        return SS.cache.horses[horse.id]['healthRecords'] = healthStore.getData();
      } else {
        return SS.cache.horses[horse.id] = {
          serviceRecords: serviceStore.getData(),
          healthRecords: healthStore.getData()
        };
      }
    },
    onAddTempBtn: function() {
      var navView;
      navView = this.getView().up('navigationview');
      if (navView) {
        return navView.push(SS.addCmp("#horseTempAdder", "stable_mobile.view.horse.TempAdder", {
          data: this.getView().getData()
        }));
      }
    },
    onInfoBtn: function() {
      var navView;
      navView = this.getView().up('navigationview');
      if (navView) {
        return navView.push(SS.addCmp("#horseInfo", "stable_mobile.view.horse.Info", {
          data: this.getView().getData()
        }));
      }
    },
    onHealthBtn: function() {
      var navView;
      navView = this.getView().up('navigationview');
      if (navView) {
        return navView.push(SS.addCmp("#health", "stable_mobile.view.health.Index", {
          data: this.getView().getData()
        }));
      }
    },
    onServiceBtn: function() {
      var navView;
      navView = this.getView().up('navigationview');
      if (navView) {
        return navView.push(SS.addCmp("#services", "stable_mobile.view.service.Index", {
          data: this.getView().getData()
        }));
      }
    }
  });

}).call(this);
