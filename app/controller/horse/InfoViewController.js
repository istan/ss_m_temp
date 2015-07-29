(function() {
  Ext.define("stable_mobile.controller.horse.InfoViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      infoContent: true
    },
    init: function() {
      var horse;
      horse = this.getView().getData();
      return this.getInfoContent().setData(horse);
    }
  });

}).call(this);
