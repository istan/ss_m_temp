(function() {
  Ext.define("stable_mobile.view.health.vaccination.Index", {
    extend: 'Ext.Container',
    controller: 'stable_mobile.controller.health.vaccination.IndexViewController',
    requires: ['stable_mobile.controller.health.vaccination.IndexViewController', "Ext.field.DatePicker"],
    config: {
      itemId: 'vaccinations',
      layout: {
        type: 'card'
      },
      title: 'Vaccines',
      items: [
        {
          xclass: "stable_mobile.view.health.vaccination.List"
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
