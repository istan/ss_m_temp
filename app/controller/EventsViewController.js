(function() {
  Ext.define("stable_mobile.controller.EventsViewController", {
    extend: "Deft.mvc.ViewController",
    requires: ['stable_mobile.model.Event'],
    control: {
      view: {
        listeners: {
          painted: 'onPainted'
        }
      },
      eventList: true
    },
    init: function() {},
    onPainted: function() {
      SS.helpers.checkConnectivityAndQueue();
      return this.fetchEvents();
    },
    fetchEvents: function(modal) {
      var theList, theStore;
      if (modal == null) {
        modal = true;
      }
      theList = this.getEventList();
      if (theList.getStore() != null) {
        theStore = theList.getStore();
      } else {
        theStore = Ext.create("stable_mobile.store.Events");
        theList.setStore(theStore);
      }
      if (!theStore.isLoading() && SS.helpers.hasInternet()) {
        theStore.loadProxy(SS.api.endpoints.events.index, this.getView(), 'loading', modal);
        return theStore.setUrl(SS.api.endpoints.events.index);
      }
    }
  });

}).call(this);
