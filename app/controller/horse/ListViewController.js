(function() {
  Ext.define("stable_mobile.controller.horse.ListViewController", {
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
      var horse, navView, tapped;
      tapped = record.data;
      horse = Ext.create('stable_mobile.view.horse.Show', {
        data: tapped,
        title: 'Horse'
      });
      navView = this.getView().up('navigationview');
      return navView.push(horse);
    }
  });

}).call(this);
