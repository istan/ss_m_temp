(function() {
  Ext.define("stable_mobile.store.Temperatures", {
    extend: "stable_mobile.store.BaseStore",
    config: {
      model: "stable_mobile.model.Temperature",
      url: null,
      storeId: 'tempsStore',
      clearOnPageLoad: true,
      proxy: {
        type: "memory",
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
