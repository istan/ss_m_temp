(function() {
  Ext.define("stable_mobile.controller.HorsesViewController", {
    extend: "Deft.mvc.ViewController",
    requires: ['stable_mobile.model.Horse'],
    control: {
      view: {
        listeners: {
          painted: 'onPainted',
          activeitemchange: 'onChange'
        }
      },
      horseList: true,
      addHorseBtn: {
        listeners: {
          tap: 'onAddHorse'
        }
      }
    },
    init: function() {
      return this.fetchHorses();
    },
    onChange: function(navigationView, newView) {
      var bar, button, idx, innerItems;
      innerItems = navigationView.getInnerItems();
      idx = innerItems.indexOf(newView);
      bar = navigationView.getNavigationBar();
      button = this.getAddHorseBtn();
      if (idx === 0) {
        button.show();
        return this.fetchHorses();
      } else {
        return button.hide();
      }
    },
    onPainted: function() {
      var error;
      try {
        return SS.helpers.checkConnectivityAndQueue();
      } catch (_error) {
        error = _error;
        return console.log(error);
      }
    },
    cacheResults: function() {
      var horse, horseData, i, len, theList, theStore;
      if (SS.cache.horses.length) {
        console.log("has cache, returning...");
        this.persistCache();
        return;
      }
      theList = this.getHorseList();
      theStore = theList.getStore();
      horseData = theStore.getData().items;
      for (i = 0, len = horseData.length; i < len; i++) {
        horse = horseData[i];
        SS.cache.horses[horse.raw.id] = horse.raw;
      }
      return this.persistCache();
    },
    persistCache: function() {
      console.log("PERSISTING HORSES");
      if (SS.cache.horses && Object.size(SS.cache.horses)) {
        delete SS.cache.horses[void 0];
        return localStorage.setItem('horses', JSON.stringify(SS.cache.horses));
      }
    },
    fetchHorses: function(modal) {
      var horse, horseArray, horseCache, key, theList, theStore;
      if (modal == null) {
        modal = true;
      }
      theList = this.getHorseList();
      if (theList.getStore() != null) {
        theStore = theList.getStore();
      } else {
        theStore = Ext.create("stable_mobile.store.Horses");
        theList.setStore(theStore);
      }
      if (Object.size(SS.cache.horses)) {
        console.log("applying cache");
        theStore.setProxy({
          type: 'memory',
          reader: {
            type: 'json',
            root: ''
          }
        });
        horseCache = SS.cache.horses;
        horseArray = [];
        for (key in horseCache) {
          horse = horseCache[key];
          horseArray.push(horse);
        }
        if (horseArray.length) {
          theStore.setData(horseArray);
          theStore.load();
          theStore.sort();
          modal = false;
        }
      }
      if (!theStore.isLoading() && SS.helpers.hasInternet()) {
        theStore.setProxy({
          type: "ajax",
          url: "",
          reader: {
            type: "json",
            root: ""
          }
        });
        theStore.loadProxy(SS.api.endpoints.horses.index, this.getView(), 'loading', modal, this.cacheResults, this);
        theStore.setUrl(SS.api.endpoints.horses.index);
        return theStore.sort();
      }
    },
    onAddHorse: function() {
      var btn, form, navView;
      btn = this.getAddHorseBtn();
      form = Ext.create('stable_mobile.view.horse.Form', {
        title: 'Add horse'
      });
      navView = this.getView();
      return navView.push(form);
    }
  });

}).call(this);
