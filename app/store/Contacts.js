(function() {
  Ext.define("stable_mobile.store.Contacts", {
    extend: "stable_mobile.store.BaseStore",
    config: {
      model: "stable_mobile.model.Person",
      url: null,
      sorters: 'name',
      storeId: 'contactsStore',
      grouper: {
        sortProperty: 'name',
        direction: 'ASC',
        groupFn: function(record) {
          return record.get('name')[0];
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
    returnRole: function(role) {
      var contact, contacts, i, len, opts, ref;
      contacts = this.getData();
      opts = [];
      if (role != null) {
        ref = contacts.all;
        for (i = 0, len = ref.length; i < len; i++) {
          contact = ref[i];
          if ((contact.data != null) && (contact.data.roles != null) && contact.data.roles.indexOf(role) > -1) {
            opts.push(contact);
          }
        }
      } else {
        opts = contacts.all;
      }
      opts.push({
        name: '',
        id: 0
      });
      return opts;
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
