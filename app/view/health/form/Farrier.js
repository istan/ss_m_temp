(function() {
  Ext.define("stable_mobile.view.health.form.Farrier", {
    extend: "Ext.form.Panel",
    controller: 'stable_mobile.controller.health.FormViewController',
    requires: ['stable_mobile.controller.health.FormViewController', "Ext.form.FieldSet", "Ext.field.Select", "Ext.field.TextArea", "Ext.field.Text", "Ext.field.DatePicker"],
    config: {
      fullscreen: true,
      scrollable: false,
      padding: 20,
      itemId: 'farrierForm',
      title: 'Farrier',
      items: [
        {
          xtype: "fieldset",
          itemId: 'formFields',
          defaults: {
            labelWidth: '35%'
          },
          items: [
            {
              xtype: "selectfield",
              itemId: "administeredByField",
              label: "Provider",
              name: "farrier_record[person_id]",
              displayField: 'name',
              valueField: 'id'
            }, {
              xtype: "textareafield",
              itemId: "notesField",
              label: "Notes",
              name: "farrier_record[comments]"
            }, {
              xtype: "numberfield",
              itemId: "priceField",
              label: "Price ($)",
              name: "farrier_record[price]"
            }, {
              xtype: "datepickerfield",
              itemId: "dateField",
              label: "Date",
              name: "farrier_record[administered_at]",
              value: new Date(),
              dateFormat: "M-d Y"
            }
          ]
        }, {
          xtype: "button",
          text: "Save",
          itemId: "saveBtn",
          style: 'border: 1px solid #bbb; border-top-color: #ccc;',
          margin: "0 0 20 0"
        }
      ]
    }
  });

}).call(this);
