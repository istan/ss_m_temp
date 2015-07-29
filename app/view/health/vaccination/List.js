(function() {
  Ext.define("stable_mobile.view.health.vaccination.List", {
    extend: "Ext.dataview.List",
    controller: 'stable_mobile.controller.health.vaccination.ListViewController',
    requires: ['stable_mobile.controller.health.vaccination.ListViewController'],
    config: {
      cls: 'vaccination-list',
      itemCls: 'vaccination-list-item',
      itemId: 'vaccinationList',
      pressedDelay: 1,
      masked: false,
      loadingText: false,
      emptyText: SS.copy.noVacs,
      mode: 'MULTI',
      itemTpl: "<h1>\n	{name}\n</h1>"
    }
  });

}).call(this);
