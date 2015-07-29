(function() {
  Ext.define("stable_mobile.view.horse.List", {
    extend: "Ext.dataview.List",
    controller: 'stable_mobile.controller.horse.ListViewController',
    requires: ['stable_mobile.controller.horse.ListViewController'],
    config: {
      cls: 'horse-list',
      itemCls: 'horse-list-item',
      itemId: 'horseList',
      selectedCls: 'selected-quiet',
      pressedDelay: 1,
      masked: false,
      loadingText: false,
      emptyText: SS.copy.noHorses,
      itemTpl: "<img src='{thumb}' alt='{id}' width='50' height='50' class='inline' />\n<h1 class='inline'>\n	{display_name}\n</h1>"
    }
  });

}).call(this);
