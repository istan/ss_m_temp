(function() {
  Ext.define("stable_mobile.store.Horses", {
    extend: "stable_mobile.store.BaseStore",
    config: {
      model: "stable_mobile.model.Horse",
      url: null,
      storeId: 'horsesStore',
      clearOnPageLoad: true,
      sorters: new Ext.util.Sorter(function() {
        return {
          property: 'display_name',
          sorterFn: function(o1, o2) {
            var name1, name2;
            name1 = o1.data.display_name;
            name2 = o2.data.display_name;
            if ((name1 == null) && (name2 == null)) {
              return 0;
            }
            if ((name1 == null) && (name2 != null)) {
              return -1;
            }
            if ((name1 != null) && (name2 == null)) {
              return 1;
            }
            name1 = name1.toLowerCase();
            name2 = name2.toLowerCase();
            if (name1 > name2) {
              return 1;
            }
            if (name1 < name2) {
              return -1;
            }
            if (name1 === name2) {
              return 0;
            }
          }
        };
      }),
      proxy: {
        type: "ajax",
        url: "",
        reader: {
          type: "json",
          root: ""
        }
      }
    },
    doRefresh: function(view) {
      if (this.getUrl() != null) {
        console.log('refreshing');
        return this.loadProxy(this.getUrl(), view, null, false, this.cacheResults, this);
      } else {
        return console.log('cannot refresh - no url');
      }
    },
    cacheResults: function() {
      var horse, horseData, i, len;
      if (SS.cache.horses.length) {
        this.persistCache();
        return;
      }
      horseData = this.getData().items;
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
    }
  });

}).call(this);
