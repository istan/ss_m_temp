(function() {
  Ext.define("stable_mobile.view.health.form.Vaccination", {
    extend: "Ext.form.Panel",
    controller: 'stable_mobile.controller.health.FormViewController',
    requires: ['stable_mobile.controller.health.FormViewController', "Ext.form.FieldSet", "Ext.field.Select", "Ext.field.TextArea", "Ext.field.Text", "Ext.field.DatePicker"],
    config: {
      fullscreen: true,
      scrollable: false,
      padding: 20,
      itemId: 'vaccinationForm',
      title: 'vaccination',
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
              itemId: "typeField",
              label: "Vaccine",
              name: "vaccination_record[vaccination_type_id]",
              displayField: 'name',
              valueField: 'id',
              placeholder: 'select'
            }, {
              xtype: "selectfield",
              itemId: "administeredByField",
              label: "Provider",
              name: "vaccination_record[person_id]",
              displayField: 'name',
              valueField: 'id',
              placeholder: 'select'
            }, {
              xtype: "textareafield",
              itemId: "notesField",
              label: "Notes",
              name: "vaccination_record[comments]"
            }, {
              xtype: "numberfield",
              itemId: "priceField",
              label: "Price ($)",
              name: "vaccination_record[price]"
            }, {
              xtype: "datepickerfield",
              itemId: "dateField",
              label: "Date",
              name: "vaccination_record[administered_at]",
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
