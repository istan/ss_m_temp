Ext.define "stable_mobile.view.contact.Form",
	extend: "Ext.form.Panel"

	controller: 'stable_mobile.controller.contact.FormViewController'

	requires: [
		'stable_mobile.controller.contact.FormViewController'
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
		itemId: 'contactForm'
		title: 'Add contact'
		scrollable: true
		items: [
			xtype: "fieldset"
			itemId: 'formFields'
			defaults:
				labelWidth: '40%'
			items: [
				xtype: "textfield"
				itemId: "firstNameField"
				label: "First name *"
				name: "person[first]"
			,
				xtype: "textfield"
				itemId: "lastNameField"
				label: "Last name"
				name: "person[last]"
			,
				xtype: "selectfield"
				itemId: "roleField"
				label: "Role *"
				name: "person[roles][]"
				options: [
					text: ""
					value: 0
				,
					text: "horse owner"
					value: "horse owner"
				,
					text: "farrier"
					value: "farrier"
				,
					text: "veterinarian"
					value: "veterinarian"
				,
					text: "dentist"
					value: "dentist"
				,
					text: "barn manager"
					value: "barn manager"
				,
					text: "rider"
					value: "rider"
				,
					text: "staff"
					value: "staff"
				,
					text: "vendor"
					value: "vendor"
				,
					text: "other"
					value: "other"
				]
			,
				xtype: "textfield"
				itemId: "emailField"
				label: "Email"
				name: "person[email]"
			,
				xtype: "textfield"
				itemId: "phoneField"
				label: "Phone"
				name: "person[phone]"
			]
		,
			xtype: "button"
			text: "Save"
			itemId: "saveBtn"
			style: 'border: 1px solid #bbb; border-top-color: #ccc;'
			margin: "0 0 20 0"
		]
