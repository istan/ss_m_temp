Ext.define "stable_mobile.view.health.form.Medication",
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
		itemId: 'medicationForm'
		title: 'medication'
		items: [
			xtype: "fieldset"
			itemId: 'formFields'
			defaults:
				labelWidth: '35%'
			items: [
				xtype: "numberfield"
				label: 'Dosage'
				itemId: "dosageField"
				name: 'medication_record[dosage]'
			,
				xtype: 'selectfield'
				label: 'Units'
				itemId: "dosageUnitField"
				name: 'medication_record[dosage_unit]'
				options: [
					text: 'vial'
					value: 'vial'
				,
					text: 'scoop'
					value: 'scoop'
				,
					text: 'cc'
					value: 'cc'
				,
					text: 'dose'
					value: 'dose'
				,
					text: 'g'
					value: 'g'
				,
					text: 'pill'
					value: 'pill'
				,
					text: 'tube'
					value: 'tube'
				,
					text: 'other'
					value: 'other'
				]
			,
				xtype: 'selectfield'
				label: 'Type'
				itemId: "doseTypeField"
				name: 'medication_record[dose_type]'
				options: [
					text: 'injectible IV'
					value: 'injectible IV'
				,
					text: 'injectible IM'
					value: 'injectible IM'
				,
					text: 'powder'
					value: 'powder'
				,
					text: 'paste'
					value: 'paste'
				,
					text: 'pill'
					value: 'pill'
				,
					text: 'subcutaneous injection'
					value: 'subcutaneous injection'
				,
					text: 'other'
					value: 'other'
				]
			,
				xtype: "numberfield"
				itemId: "dosageCostField"
				label: 'Dose cost ($)'
				name: 'medication_record[dosage_cost]'
			,
				xtype: "numberfield"
				itemId: "markupField"
				label: 'Service fee ($)'
				name: 'medication_record[markup]'
			,
				xtype: "textareafield"
				itemId: "notesField"
				label: "Notes"
				name: "medication_record[comments]"
			,
				xtype: "datepickerfield"
				itemId: "dateField"
				label: "Date"
				name: "medication_record[administered_at]"
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
