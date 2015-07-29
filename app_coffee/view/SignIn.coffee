Ext.define "stable_mobile.view.SignIn",
	extend: "Ext.form.Panel"

	controller: 'stable_mobile.controller.SignInViewController'

	requires: [
		'stable_mobile.controller.SignInViewController'
		"Ext.form.FieldSet"
		"Ext.field.Email"
		"Ext.field.Password"
	]

	config:
		fullscreen: true
		scrollable: null
		padding: 20
		itemId: 'signInForm'
		title: 'Stable Secretary'
		items: [
			xtype: 'container'
			html: 'Sign in with your Stable Secretary account!'
			style: 'text-align: center; color: #333; text-shadow: -1px 1px #EEE'
			margin: '0 0 20 0'
		,
			xtype: "fieldset"
			itemId: 'signInFields'
			defaults:
				labelWidth: '35%'
			items: [
				xtype: "emailfield"
				itemId: "emailFieldIn"
				label: "Email"
				name: "email"
			,
				xtype: "passwordfield"
				itemId: "passwordFieldIn"
				label: "Password"
				name: "password"
			]
		,
			xtype: "button"
			text: "Sign in"
			itemId: "signInButton"
			style: 'border: 1px solid #bbb; border-top-color: #ccc;'
			margin: "20 0 20 0"
		,
			xtype: 'container'
			html: "<p style='font-size: 12px;'></p>"
			style: 'text-align: center; color: #333; text-shadow: -1px 1px #EEE;'
			margin: 0
		,
			xtype: 'container'
			docked: 'bottom'
			padding: 20
			style: 'font-size: 12px;'
			hidden: true
			items: [
				html: "<div style='color: blue; font-size: 12px;'>forgot password</div>"
				itemId: 'forgotPassword'
			]
		]
