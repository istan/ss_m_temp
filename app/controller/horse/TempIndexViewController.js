(function() {
  Ext.define("stable_mobile.controller.horse.TempIndexViewController", {
    extend: "Deft.mvc.ViewController",
    requires: ['stable_mobile.model.Temperature'],
    control: {
      tempList: true
    },
    init: function() {
      return this.fetchTemps();
    },
    fetchTemps: function() {
      var horse, params, theList, theStore;
      console.log("fetching temps");
      horse = this.getView().getData();
      theStore = Ext.getStore('tempStore');
      theList = this.getTempList();
      if (!theStore) {
        theStore = Ext.create("stable_mobile.store.Temperatures");
      }
      theList.setStore(theStore);
      params = {
        horse_id: horse.id
      };
      if (SS.helpers.hasInternet()) {
        return theStore.loadProxy(SS.api.endpoints.health.temperature, null, null, null, null, this, params);
      } else {
        return console.log("no internet");
      }
    }
  });

}).call(this);
