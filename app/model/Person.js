(function() {
  Ext.define('stable_mobile.model.Person', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        {
          name: 'id',
          type: 'int'
        }, {
          name: 'name',
          type: 'auto'
        }, {
          name: 'first',
          type: 'auto'
        }, {
          name: 'last',
          type: 'auto'
        }, {
          name: 'email',
          type: 'auto'
        }, {
          name: 'phone',
          type: 'auto'
        }, {
          name: 'cell_phone',
          type: 'auto'
        }, {
          name: 'home_phone',
          type: 'auto'
        }, {
          name: 'address',
          type: 'auto'
        }, {
          name: 'roles',
          type: 'auto'
        }, {
          name: 'usef_number',
          type: 'auto'
        }, {
          name: 'comments',
          type: 'auto'
        }, {
          name: 'company_name',
          type: 'auto'
        }, {
          name: 'website',
          type: 'auto'
        }, {
          name: 'date_of_birth',
          type: 'auto'
        }, {
          name: 'social_security_number',
          type: 'auto'
        }, {
          name: 'fei_number',
          type: 'auto'
        }, {
          name: 'fei_renewal_date',
          type: 'auto'
        }, {
          name: 'passport_renewal_date',
          type: 'auto'
        }, {
          name: 'passport_number',
          type: 'auto'
        }, {
          name: 'fax_number',
          type: 'auto'
        }
      ]
    }
  });

}).call(this);
