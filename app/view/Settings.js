(function() {
  Ext.define("stable_mobile.view.Settings", {
    extend: 'Ext.navigation.View',
    controller: 'stable_mobile.controller.SettingsViewController',
    requires: ['stable_mobile.controller.SettingsViewController'],
    config: {
      itemId: 'settings',
      title: 'Settings',
      layout: {
        type: 'card',
        animation: {
          duration: 100,
          easing: 'ease-out',
          type: 'slide',
          direction: 'left'
        }
      },
      navigationBar: {
        items: []
      },
      items: [
        {
          xtype: 'container',
          padding: 20,
          title: 'Settings',
          items: [
            {
              xtype: 'container',
              html: "<p style='font-size: 12px;'>Log into stablesecretary.com to fully customize your account.</p>",
              style: 'text-align: center; color: #333; text-shadow: -1px 1px #EEE;',
              margin: '0 0 20 0'
            }, {
              xtype: 'button',
              text: 'Re-sync with server',
              itemId: 'syncBtn',
              margin: '0 0 20 0'
            }, {
              xtype: 'button',
              text: 'Sign out',
              ui: 'decline',
              itemId: 'signOutBtn'
            }
          ]
        }
      ]
    }
  });

}).call(this);
