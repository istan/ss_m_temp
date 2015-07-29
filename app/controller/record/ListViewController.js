(function() {
  Ext.define("stable_mobile.controller.record.ListViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      view: {
        listeners: {
          itemtap: 'onItemTap',
          erased: 'onErased'
        }
      }
    },
    init: function() {},
    onErased: function() {
      var view;
      view = this.getView();
      if (view.hasSelection()) {
        return view.deselectAll(true);
      }
    },
    onItemTap: function(dataview, index, target, record) {
      var navView, showView, tapped, view;
      tapped = record.data;
      view = this.getView();
      showView = Ext.create("stable_mobile.view.record.Show", {
        title: tapped.klass.split(/(?=[A-Z])/).join(' '),
        data: tapped,
        horseId: tapped.horse_id
      });
      navView = this.getView().up('navigationview');
      if (showView && navView) {
        return navView.push(showView);
      }
    }
  });

}).call(this);
