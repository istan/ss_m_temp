(function() {
  Ext.define("stable_mobile.view.health.medication.Index", {
    extend: 'Ext.Container',
    controller: 'stable_mobile.controller.health.medication.IndexViewController',
    requires: ['stable_mobile.controller.health.medication.IndexViewController', "Ext.field.DatePicker"],
    config: {
      itemId: 'medications',
      layout: {
        type: 'card'
      },
      title: 'Meds',
      navigationBar: {
        items: [
          {
            xtype: 'button',
            text: '+',
            align: 'right',
            itemId: 'addMedBtn'
          }
        ]
      },
      items: [
        {
          xclass: "stable_mobile.view.health.medication.List"
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
