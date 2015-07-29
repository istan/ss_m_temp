(function() {
  Ext.define('stable_mobile.model.Event', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        {
          name: 'id',
          type: 'int'
        }, {
          name: 'horse_id',
          type: 'int'
        }, {
          name: 'horse_name',
          type: 'string'
        }, {
          name: 'body',
          type: 'string'
        }
      ]
    }
  });

}).call(this);
