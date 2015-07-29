Ext.define "stable_mobile.view.horse.TempAdder",
	extend: "Ext.form.Panel"

	controller: 'stable_mobile.controller.horse.TempAdderViewController'

	requires: [
		'stable_mobile.controller.horse.TempAdderViewController'
		"Ext.form.FieldSet"
		"Ext.field.TextArea"
		"Ext.field.Text"
		"Ext.field.Number"
		"Ext.field.DatePicker"
	]

	config:
		fullscreen: true
		scrollable: false
		padding: 20
		itemId: 'tempForm'
		title: 'Add a Temp'
		items: [
			xtype: "fieldset"
			itemId: 'formFields'
			defaults:
				labelWidth: '35%'
			items: [
				xtype: "numberfield"
				itemId: "temperatureField"
				label: "Temp"
				name: "temperature[reading]"
			,
				xtype: "textareafield"
				itemId: "notesField"
				label: "Notes"
				name: "temperature[comments]"
			,
				xtype: "datepickerfield"
				itemId: "dateField"
				label: "Date"
				name: "temperature[reading_date]"
				value: new Date()
				dateFormat: "M-d Y"
			]
		,
			xtype: "button"
			text: "Save temperature"
			itemId: "saveBtn"
			style: 'border: 1px solid #bbb; border-top-color: #ccc;'
			margin: "0 0 20 0"
			ui: "action"
		,
			xtype: "button"
			text: "View recent temperatures"
			itemId: "viewRecentsBtn"
			style: 'border: 1px solid #bbb; border-top-color: #ccc;'
			margin: "0 0 20 0"
		]
