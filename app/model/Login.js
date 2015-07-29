(function() {
  Ext.define("stable_mobile.model.Login", {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        {
          name: "email",
          type: "string"
        }, {
          name: "password",
          type: "string"
        }
      ],
      validations: [
        {
          type: "presence",
          field: "email"
        }, {
          type: "presence",
          field: "password"
        }, {
          type: "email",
          field: "email"
        }
      ]
    }
  });

}).call(this);
