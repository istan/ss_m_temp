(function() {
  Ext.define("stable_mobile.store.Events", {
    extend: "stable_mobile.store.BaseStore",
    config: {
      model: "stable_mobile.model.Event",
      url: null,
      storeId: 'eventsStore',
      grouper: {
        groupFn: function(record) {
          return record.get('horse_name');
        }
      },
      clearOnPageLoad: true,
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
        return this.loadProxy(this.getUrl(), view, null, false);
      } else {
        return console.log('cannot refresh - no url');
      }
    }
  });

}).call(this);
