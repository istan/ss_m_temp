(function() {
  Ext.define("stable_mobile.controller.contact.ShowViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      view: true,
      callBtn: {
        listeners: {
          tap: 'onCallBtn'
        }
      },
      textBtn: {
        listeners: {
          tap: 'onTextBtn'
        }
      },
      emailBtn: {
        listeners: {
          tap: 'onEmailBtn'
        }
      },
      contactTop: true,
      contactBottom: true
    },
    init: function() {
      return this.populateView();
    },
    populateView: function() {
      var contact;
      contact = this.getView().getData();
      this.getContactTop().setData(contact);
      this.getContactBottom().setData(contact);
      if (contact.phone) {
        this.getCallBtn().show();
        this.getTextBtn().show();
      }
      if (contact.email) {
        return this.getEmailBtn().show();
      }
    },
    onTextBtn: function() {
      var number;
      number = this.getView().getData().phone;
      return document.location.href = "sms:" + number;
    },
    onCallBtn: function() {
      var number;
      number = this.getView().getData().phone;
      return document.location.href = "tel:" + number;
    },
    onEmailBtn: function() {
      var email;
      email = this.getView().getData().email;
      if (SS.device) {
        return window.plugins.emailComposer.showEmailComposer('', '', email);
      } else {
        return console.log('will launch email on device');
      }
    }
  });

}).call(this);
