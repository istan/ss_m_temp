Ext.define "stable_mobile.view.health.form.Other",
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
		scrollable: false
		padding: 20
		itemId: 'otherForm'
		title: 'General'
		items: [
			xtype: "fieldset"
			itemId: 'formFields'
			defaults:
				labelWidth: '35%'
			items: [
				xtype: "textareafield"
				itemId: "notesField"
				label: "Notes"
				name: "general_health_record[comments]"
			,
				xtype: "numberfield"
				itemId: "priceField"
				label: "Price ($)"
				name: "general_health_record[price]"
			,
				xtype: "datepickerfield"
				itemId: "dateField"
				label: "Date"
				name: "general_health_record[administered_at]"
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
