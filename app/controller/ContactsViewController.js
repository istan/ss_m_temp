(function() {
  Ext.define("stable_mobile.controller.ContactsViewController", {
    extend: "Deft.mvc.ViewController",
    requires: ['stable_mobile.model.Person'],
    control: {
      view: {
        listeners: {
          painted: 'onPainted',
          activeitemchange: 'onChange'
        }
      },
      contactList: true,
      addContactBtn: {
        listeners: {
          tap: 'onAddContact'
        }
      }
    },
    init: function() {
      return this.fetchContacts();
    },
    onPainted: function() {
      return SS.helpers.checkConnectivityAndQueue();
    },
    onChange: function(navigationView, newView) {
      var bar, button, idx, innerItems;
      innerItems = navigationView.getInnerItems();
      idx = innerItems.indexOf(newView);
      bar = navigationView.getNavigationBar();
      button = this.getAddContactBtn();
      if (idx === 0) {
        button.show();
        return this.fetchContacts();
      } else {
        return button.hide();
      }
    },
    fetchContacts: function(modal) {
      var theList, theStore;
      if (modal == null) {
        modal = true;
      }
      theList = this.getContactList();
      if (theList.getStore() != null) {
        theStore = theList.getStore();
      } else {
        theStore = Ext.create("stable_mobile.store.Contacts");
        theList.setStore(theStore);
      }
      if (!theStore.isLoading() && SS.helpers.hasInternet()) {
        theStore.loadProxy(SS.api.endpoints.people.index, this.getView(), 'loading', modal);
        return theStore.setUrl(SS.api.endpoints.people.index);
      }
    },
    onAddContact: function() {
      var btn, form, navView;
      btn = this.getAddContactBtn();
      form = Ext.create('stable_mobile.view.contact.Form', {
        title: 'Add contact'
      });
      navView = this.getView();
      return navView.push(form);
    }
  });

}).call(this);
