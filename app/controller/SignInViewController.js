(function() {
  Ext.define("stable_mobile.controller.SignInViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      signInButton: {
        listeners: {
          tap: 'onSignIn'
        }
      },
      view: {
        listeners: {
          action: 'onSignIn'
        }
      },
      emailFieldIn: {
        listeners: {
          action: 'onSignIn'
        }
      },
      passwordFieldIn: {
        listeners: {
          action: 'onSignIn'
        }
      },
      forgotPassword: true
    },
    init: function() {
      return console.log('init sign in vc');
    },
    onSignIn: function() {
      var errors, form, model, values;
      console.log('signing in!');
      form = this.getView();
      values = form.getValues();
      model = Ext.create("stable_mobile.model.Login", values);
      errors = model.validate();
      if (errors.length) {
        return SS.helpers.alert("Whoops!", errors.items[0]._field + " " + errors.items[0]._message);
      } else {
        return this.login(values);
      }
    },
    login: function(creds) {
      var payload, theForm;
      theForm = this.getView();
      payload = {
        'session[email]': creds.email,
        'session[password]': creds.password
      };
      SS.helpers.maskedStart('logging in...');
      return Ext.Ajax.request({
        method: 'POST',
        url: SS.api.endpoints.login,
        params: payload,
        timeout: 30000,
        success: (function(_this) {
          return function(result) {
            var data;
            data = JSON.parse(result.responseText);
            SS.user = data;
            SS.signedIn = true;
            console.log(data);
            localStorage.setItem('currentUser', JSON.stringify(data));
            SS.helpers.maskedStop();
            theForm.reset();
            return Ext.Viewport.animateActiveItem(SS.addCmp('#main', "stable_mobile.view.Main"), {
              type: 'slide',
              direction: 'left'
            });
          };
        })(this),
        failure: function(e) {
          SS.helpers.maskedStop();
          console.log(e);
          return SS.helpers.alert('sorry!', e.responseText);
        }
      });
    }
  });

}).call(this);
