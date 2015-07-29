(function() {
  Ext.define("stable_mobile.store.Services", {
    extend: "stable_mobile.store.BaseStore",
    config: {
      model: "stable_mobile.model.Service",
      url: null,
      sorters: 'last',
      storeId: 'servicesStore',
      grouper: {
        groupFn: function(record) {
          return record.get('category');
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
        return this.loadProxy(this.getUrl(), true, view, null, false);
      }
    }
  });

}).call(this);
