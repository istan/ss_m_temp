Ext.define "stable_mobile.view.horse.Form",
	extend: "Ext.form.Panel"

	controller: 'stable_mobile.controller.horse.FormViewController'

	requires: [
		'stable_mobile.controller.horse.FormViewController'
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
		itemId: 'horseForm'
		title: 'Add horse'
		scrollable: true 
		items: [
			xtype: "fieldset"
			itemId: 'formFields'
			defaults:
				labelWidth: '35%'
			items: [
				xtype: "textfield"
				itemId: "nameField"
				label: "Name *"
				name: "horse[name]"
			,
				xtype: "textfield"
				itemId: "showNameField"
				label: "Show name"
				name: "horse[show_name]"
			,
				xtype: "selectfield"
				itemId: "ownerField"
				label: "Owner"
				name: "horse[person_id]"
				displayField: 'name'
				valueField: 'id'
			,
				xtype: "selectfield"
				itemId: "genderField"
				label: "Sex"
				name: "horse[gender]"
				options: [
					text: ""
					value: 0
				,
					text: "Gelding"
					value: "Gelding"
				,
					text: "Mare"
					value: "Mare"
				,
					text: "Stallion"
					value: "Stallion"
				]
			,
				xtype: "numberfield"
				itemId: "foaledField"
				label: "Year foaled"
				name: "horse[year_foaled]"
			,
				xtype: "selectfield"
				itemId: "heightField"
				label: "Height (hands)"
				name: "horse[height]"
				options: [
					text: ""
					value: 0
				,
					text: 10
					value: 10
				,
					text: 11
					value: 11
				,
					text: 12
					value: 12
				,
					text: 13
					value: 13
				,
					text: 14
					value: 14
				,
					text: 15
					value: 15
				,
					text: 16
					value: 16
				,
					text: 17
					value: 17
				,
					text: 18
					value: 18
				,
					text: 19
					value: 19
				]
			,
				xtype: "selectfield"
				itemId: "heightDecimalField"
				label: "Height decimal"
				name: "horse[height_decimal]"
				options: [
					text: ""
					value: 0
				,
					text: ".0"
					value: ".0"
				,
					text: ".1"
					value: ".1"
				,
					text: ".2"
					value: ".2"
				,
					text: ".3"
					value: ".3"
				]
			,
				xtype: "selectfield"
				itemId: "heightRemainderField"
				label: "Height remainder"
				name: "horse[height_remainder]"
				options: [
					text: ""
					value: 0
				,
					text: "0"
					value: "0"
				,
					text: "1/8th"
					value: "1/8th"
				,
					text: "1/4th"
					value: "1/4th"
				,
					text: "3/8ths"
					value: "3/8ths"
				,
					text: "1/2"
					value: "1/2"
				,
					text: "5/8ths"
					value: "5/8ths"
				,
					text: "3/4ths"
					value: "3/4ths"
				,
					text: "7/8ths"
					value: "7/8ths"
				]
			]
		,
			xtype: "button"
			text: "Save"
			itemId: "saveBtn"
			style: 'border: 1px solid #bbb; border-top-color: #ccc;'
			margin: "0 0 20 0"
		]
