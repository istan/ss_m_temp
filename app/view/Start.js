(function() {
  Ext.define("stable_mobile.view.Start", {
    extend: 'Ext.navigation.View',
    controller: 'stable_mobile.controller.StartViewController',
    requires: ['stable_mobile.controller.StartViewController'],
    config: {
      itemId: 'start',
      title: 'Stable Secretary',
      navigationBar: {
        items: []
      },
      items: [
        {
          xclass: 'stable_mobile.view.SignIn'
        }
      ]
    }
  });

}).call(this);
