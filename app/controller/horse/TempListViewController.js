(function() {
  Ext.define("stable_mobile.controller.horse.TempListViewController", {
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
      tapped = record.data;
      console.log(tapped);
      this.getView().deselectAll(true);
      return Ext.Msg.confirm('Remove?', 'Would you like to delete this record?', (function(_this) {
        return function(e) {
          if (e === 'yes') {
            console.log("delete");
            return _this.doDeleteRecord(tapped);
          } else {
            return console.log("cancel");
          }
        };
      })(this));
    },
    doDeleteRecord: function(record) {
      var id, payload, theData, theRoute, theUrl;
      theData = record;
      console.log(theData);
      id = theData.id;
      theRoute = SS.api.endpoints.health.temperature;
      theUrl = theRoute + "/" + id;
      payload = {};
      payload['auth_token'] = SS.user.auth_token;
      payload['user_id'] = SS.user.id;
      SS.helpers.maskedStart('deleting...');
      return Ext.Ajax.request({
        method: 'DELETE',
        url: theUrl,
        params: payload,
        timeout: 30000,
        success: (function(_this) {
          return function(result) {
            SS.helpers.maskedStop();
            SS.helpers.vibrate();
            SS.helpers.alert('Deleted!', 'Record removed.', 'OK');
            return _this.getView().up('navigationview').pop();
          };
        })(this),
        failure: function(e) {
          SS.helpers.maskedStop();
          console.log(e);
          return SS.helpers.alert('Sorry!', e.responseText);
        }
      });
    }
  });

}).call(this);
