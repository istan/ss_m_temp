(function() {
  Ext.define("stable_mobile.view.health.form.Joint", {
    extend: "Ext.form.Panel",
    controller: 'stable_mobile.controller.health.FormViewController',
    requires: ['stable_mobile.controller.health.FormViewController', "Ext.form.FieldSet", "Ext.field.Select", "Ext.field.TextArea", "Ext.field.Text", "Ext.field.DatePicker"],
    config: {
      fullscreen: true,
      scrollable: null,
      padding: 20,
      itemId: 'jointForm',
      title: 'Joint Injection',
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
              label: "Joint",
              name: "joint_record[joint_injection_type_id]",
              displayField: 'name',
              valueField: 'id'
            }, {
              xtype: "selectfield",
              itemId: "administeredByField",
              label: "Provider",
              name: "joint_record[person_id]",
              displayField: 'name',
              valueField: 'id'
            }, {
              xtype: "textareafield",
              itemId: "notesField",
              label: "Notes",
              name: "joint_record[comments]"
            }, {
              xtype: "numberfield",
              itemId: "priceField",
              label: "Price ($)",
              name: "joint_record[price]"
            }, {
              xtype: "datepickerfield",
              itemId: "dateField",
              label: "Date",
              name: "joint_record[administered_at]",
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
