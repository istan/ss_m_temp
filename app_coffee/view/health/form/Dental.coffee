Ext.define "stable_mobile.view.health.form.Dental",
	extend: "Ext.form.Panel"

	controller: 'stable_mobile.controller.health.FormViewController'

	requires: [
		'stable_mobile.controller.health.FormViewController'
		"Ext.form.FieldSet"
		"Ext.field.Select"
		"Ext.field.TextArea"
		"Ext.field.Text"
		"Ext.field.DatePicker"
	]

	config:
		fullscreen: true
		scrollable: null
		padding: 20
		itemId: 'dentalForm'
		title: 'Dental'
		items: [
			xtype: "fieldset"
			itemId: 'formFields'
			defaults:
				labelWidth: '35%'
			items: [
				xtype: "selectfield"
				itemId: "administeredByField"
				label: "Provider"
				name: "dental_record[person_id]"
				displayField: 'name'
				valueField: 'id'
			,
				xtype: "textareafield"
				itemId: "notesField"
				label: "Notes"
				name: "dental_record[comments]"
			,
				xtype: "numberfield"
				itemId: "priceField"
				label: "Price ($)"
				name: "dental_record[price]"
			,
				xtype: "datepickerfield"
				itemId: "dateField"
				label: "Date"
				name: "dental_record[administered_at]"
				value: new Date()
				dateFormat: "M-d Y"
			]
		,
			xtype: "button"
			text: "Save"
			itemId: "saveBtn"
			style: 'border: 1px solid #bbb; border-top-color: #ccc;'
			margin: "0 0 20 0"
		]
