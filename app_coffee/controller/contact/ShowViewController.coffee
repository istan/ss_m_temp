Ext.define "stable_mobile.controller.contact.ShowViewController",
	extend: "Deft.mvc.ViewController"

	control:
		view: true
		callBtn:
			listeners:
				tap: 'onCallBtn'
		textBtn:
			listeners:
				tap: 'onTextBtn'
		emailBtn:
			listeners:
				tap: 'onEmailBtn'
		contactTop: true
		contactBottom: true

	init: ->
		@populateView()

	populateView: ->
		contact = @getView().getData()

		@getContactTop().setData contact
		@getContactBottom().setData contact

		if contact.phone
			@getCallBtn().show()
			@getTextBtn().show()
		if contact.email
			@getEmailBtn().show()

	onTextBtn: ->
		number = @getView().getData().phone
		document.location.href = "sms:#{number}"

	onCallBtn: ->
		number = @getView().getData().phone
		document.location.href = "tel:#{number}"

	onEmailBtn: ->
		email = @getView().getData().email

		if SS.device
			window.plugins.emailComposer.showEmailComposer '', '', email
		else
			console.log 'will launch email on device'