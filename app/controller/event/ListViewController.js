(function() {
  Ext.define("stable_mobile.controller.event.ListViewController", {
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
      var tapped;
      return tapped = record.data;
    }
  });

}).call(this);
