(function() {
  Ext.define("stable_mobile.controller.SettingsViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      signOutBtn: {
        listeners: {
          tap: 'onSignOutBtn'
        }
      },
      syncBtn: {
        listeners: {
          tap: 'onSyncBtn'
        }
      }
    },
    init: function() {
      return console.log('settings');
    },
    onSignOutBtn: function() {
      console.log('sign out btn tapped');
      return this.signOutUser();
    },
    onSyncBtn: function() {
      return SS.helpers.fetchUsableTypes(function() {
        return SS.helpers.alert('Success!', 'Re-synced with server. Meds, vaccinations, womers, etc should be current.', 'OK');
      }, this);
    },
    signOutUser: function() {
      console.log('signing out');
      SS.user = {};
      SS.signedIn = false;
      SS.cache.horses = {};
      SS.cache.usableTypes = {};
      localStorage.removeItem('horses');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('queue');
      return SS.f('#main').fireEvent('painted');
    }
  });

}).call(this);
