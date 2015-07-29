(function() {
  Ext.define("stable_mobile.store.Records", {
    extend: "stable_mobile.store.BaseStore",
    config: {
      model: "stable_mobile.model.Record",
      url: null,
      sorters: {
        property: 'administered_at',
        direction: 'DESC'
      },
      grouper: {
        sortProperty: 'administered_at',
        direction: 'DESC',
        groupFn: function(record) {
          var adjustedDate;
          adjustedDate = Ext.Date.add(record.get('administered_at'), Ext.Date.HOUR, 4);
          return Ext.Date.format(adjustedDate, 'm/d/Y');
        }
      },
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
        return this.loadProxy(this.getUrl(), true, view, null, false);
      }
    }
  });

}).call(this);
