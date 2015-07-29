(function() {
  Ext.define("stable_mobile.controller.contact.ListViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      view: {
        listeners: {
          itemtap: 'onItemTap',
          erased: 'onErased'
        }
      }
    },
    onErased: function() {
      var view;
      view = this.getView();
      if (view.hasSelection()) {
        return view.deselectAll(true);
      }
    },
    onItemTap: function(dataview, index, target, record) {
      var contact, navView, tapped;
      tapped = record.data;
      contact = Ext.create('stable_mobile.view.contact.Show', {
        data: tapped
      });
      navView = this.getView().up('navigationview');
      return navView.push(contact);
    }
  });

}).call(this);
