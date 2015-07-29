Ext.define "stable_mobile.controller.contact.FormViewController",
	extend: "Deft.mvc.ViewController"

	control:
		saveBtn:
			listeners:
				tap: 'onSave'
	
	init: ->
		console.log 'init form controller'
		theView = @getView()

	onSave: ->
		form = @getView()
		values = form.getValues()

		fields = [
			form.down('#firstNameField')
			form.down('#roleField')
		]

		for field in fields
			theVal = field.getValue()
			if field and (!theVal or theVal == 0)
				SS.helpers.alert 'no data', 'you must enter a value for First Name and Role field!', 'OK'
				return

		@post values

	post: (payload) ->
		form = @getView()

		# clean the select/0s out of the payload
		for k,v of payload
			if payload[k] is 0
				payload[k] = null

		payload['auth_token'] = SS.user.auth_token
		payload['user_id'] = SS.user.id

		theUrl = SS.api.endpoints.people.add

		if !SS.helpers.hasInternet()
			console.log 'no connection - storing for later'
			SS.helpers.queueUp
				url: theUrl
				payload: payload

			SS.helpers.alert 'poor network!', 'health record queued up for later saving', 'OK'
			form.up('navigationview').pop()

			return false

		SS.helpers.maskedStart('Saving...')
		method = "POST"

		Ext.Ajax.request
			method: method
			url: theUrl
			params: payload
			timeout: 30000
			success: (result) =>
				data = JSON.parse result.responseText

				SS.helpers.maskedStop()
				SS.helpers.vibrate()
				SS.helpers.alert 'Got it!', 'Contact added', 'OK'
				form.up('navigationview').pop()

			failure: (e) ->
				SS.helpers.maskedStop()
				console.log e
				SS.helpers.alert 'Sorry!', e.responseText