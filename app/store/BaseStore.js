(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Ext.define('stable_mobile.store.BaseStore', {
    extend: 'Ext.data.Store',
    loadProxy: function(url, view, message, modal, callback, scope, params) {
      var endpoint;
      if (view == null) {
        view = Ext.Viewport;
      }
      if (message == null) {
        message = 'loading';
      }
      if (modal == null) {
        modal = true;
      }
      if (callback == null) {
        callback = null;
      }
      if (scope == null) {
        scope = this;
      }
      if (params == null) {
        params = {};
      }
      console.log('loading proxy - base');
      if (!SS.helpers.hasInternet()) {
        console.log('no connection');
        SS.helpers.alert("no network!", "using cached data. we'll resync when your network connection returns.", "OK");
        return false;
      }
      endpoint = null;
      Object.keys(SS.api).forEach(function(key) {
        var val;
        val = SS.api[key];
        if (typeof val === 'object') {
          return Object.keys(val).forEach(function(k) {
            if (url === val[k]) {
              endpoint = key + "_" + k;
              return false;
            }
          });
        }
      });
      return this.completeLoad(url, view, message, modal, callback, scope, params, endpoint);
    },
    completeLoad: function(url, view, message, modal, callback, scope, params, endpoint) {
      var authToken, key, string, value;
      if (modal == null) {
        modal = true;
      }
      if (callback == null) {
        callback = null;
      }
      if (scope == null) {
        scope = this;
      }
      if (params == null) {
        params = {};
      }
      if (indexOf.call(url, '?') >= 0 === false) {
        url += '?';
      }
      string = url;
      if (SS.user.auth_token != null) {
        authToken = SS.user.auth_token;
      } else {
        authToken = JSON.parse(localStorage.getItem('currentUser')).auth_token;
      }
      for (key in params) {
        value = params[key];
        string += "&" + key + "=" + value;
      }
      string += "&version=" + SS.version + "&auth_token=" + authToken;
      console.log(string);
      this.setProxy({
        type: 'ajax',
        url: string,
        timeout: 30000,
        reader: {
          type: 'json',
          rootProperty: ''
        }
      });
      if (modal) {
        SS.helpers.maskedStart(message, view);
      } else {
        SS.helpers.activityStart();
      }
      return this.load({
        callback: function() {
          if ((callback != null) && callback) {
            callback.call(scope);
          }
          if (modal) {
            return SS.helpers.maskedStop(view);
          } else {
            return SS.helpers.activityStop();
          }
        }
      });
    }
  });

}).call(this);
