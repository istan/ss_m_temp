(function() {
  Ext.define("stable_mobile.view.service.Form", {
    extend: "Ext.form.Panel",
    controller: 'stable_mobile.controller.health.FormViewController',
    requires: ['stable_mobile.controller.health.FormViewController', "Ext.form.FieldSet", "Ext.field.Select", "Ext.field.TextArea", "Ext.field.Text", "Ext.field.DatePicker"],
    config: {
      fullscreen: true,
      scrollable: false,
      padding: 20,
      itemId: 'serviceForm',
      title: 'service',
      items: [
        {
          xtype: "fieldset",
          itemId: 'formFields',
          defaults: {
            labelWidth: '35%'
          },
          items: [
            {
              xtype: "textareafield",
              itemId: "notesField",
              label: "Notes",
              name: "service_record[comments]"
            }, {
              xtype: "numberfield",
              itemId: "priceField",
              label: "Price ($)",
              name: "service_record[price]"
            }, {
              xtype: "datepickerfield",
              itemId: "dateField",
              label: "Date",
              name: "service_record[administered_at]",
              value: new Date(),
              dateFormat: "M-d Y"
            }
          ]
        }, {
          xtype: "button",
          text: "save",
          itemId: "saveBtn",
          style: 'border: 1px solid #bbb; border-top-color: #ccc;',
          margin: "0 0 20 0"
        }
      ]
    }
  });

}).call(this);
