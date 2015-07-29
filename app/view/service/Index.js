(function() {
  Ext.define("stable_mobile.view.service.Index", {
    extend: 'Ext.Container',
    controller: 'stable_mobile.controller.service.IndexViewController',
    requires: ['stable_mobile.controller.service.IndexViewController'],
    config: {
      itemId: 'services',
      layout: {
        type: 'card'
      },
      title: 'Services',
      items: [
        {
          xclass: "stable_mobile.view.service.List"
        }, {
          xtype: 'container',
          docked: 'bottom',
          cls: 'bottom-btn-container',
          padding: 20,
          items: [
            {
              xtype: "datepickerfield",
              itemId: "dateField",
              label: "Date",
              name: "administered_at",
              value: new Date(),
              dateFormat: "M-d Y"
            }, {
              margin: "20 0 0 0",
              xtype: 'button',
              text: 'Save',
              itemId: 'saveBtn'
            }
          ]
        }
      ]
    }
  });

}).call(this);
