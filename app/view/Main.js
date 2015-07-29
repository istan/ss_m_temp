(function() {
  Ext.define("stable_mobile.view.Main", {
    extend: 'Ext.tab.Panel',
    requires: ['Ext.TitleBar'],
    mixins: ['Deft.mixin.Controllable'],
    controller: 'stable_mobile.controller.MainViewController',
    requires: ['stable_mobile.controller.MainViewController'],
    config: {
      itemId: 'main',
      tabBarPosition: 'bottom',
      layout: {
        type: 'card',
        animation: {
          type: 'fade'
        }
      },
      items: []
    }
  });

}).call(this);
