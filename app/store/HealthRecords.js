(function() {
  Ext.define("stable_mobile.store.HealthRecords", {
    extend: "stable_mobile.store.BaseStore",
    config: {
      model: "stable_mobile.model.Record",
      url: null,
      sorters: {
        property: 'administered_at',
        direction: 'DESC'
      },
      grouper: {
        sortProperty: "order",
        groupFn: function(record) {
          var klass;
          klass = record.get('klass');
          if (klass === "TherapyRecord") {
            return "Therapies";
          }
          if (klass === "JointRecord") {
            return "Joint Injection Records";
          }
          if (klass === "Injury") {
            return "Injuries";
          }
          if (klass === "GeneralHealthRecord") {
            return "General Health Records";
          }
          return klass.replace(/([a-z])([A-Z])/, '$1 $2') + 's';
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
