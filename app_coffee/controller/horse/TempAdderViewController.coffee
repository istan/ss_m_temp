Ext.define "stable_mobile.controller.horse.TempAdderViewController",
	extend: "Deft.mvc.ViewController"

	control:
		saveBtn:
			listeners:
				tap: 'onSave'
		viewRecentsBtn:
			listeners:
				tap: 'onViewRecents'
	
	init: ->
		console.log 'init temp adder controller'

	onSave: ->
		console.log 'saving'

		form = @getView()
		values = form.getValues()

		@post values

	onViewRecents: ->
		console.log "view recent temps"
		navView = @getView().up('navigationview')
		if navView
			navView.push(SS.addCmp "#horseTempIndex", "stable_mobile.view.horse.TempIndex", {data: @getView().getData()})

	post: (payload) ->
		horse = @getView().getData()

		# clean the select/0s out of the payload
		for k,v of payload
			if v is 0
				SS.helpers.alert 'Not a number!', 'You must enter a number!', 'OK'
				return false

		payload['auth_token'] = SS.user.auth_token
		payload['horse_id'] = horse.id
		payload['user_id'] = SS.user.id

		theUrl = SS.api.endpoints.health.temperature

		if !SS.helpers.hasInternet()
			SS.helpers.queueUp
				url: theUrl
				payload: payload

			SS.helpers.alert 'poor network!', 'record queued up for later saving', 'OK'
			@getView().up('navigationview').pop()

			return false

		SS.helpers.maskedStart('saving record...')

		Ext.Ajax.request
			method: 'POST'
			url: theUrl
			params: payload
			timeout: 30000
			success: (result) =>
				data = JSON.parse result.responseText

				SS.helpers.maskedStop()

				SS.helpers.vibrate()

				SS.helpers.alert 'Got it!', 'Temperature saved', 'OK'

				@getView().up('navigationview').pop()

			failure: (e) ->
				SS.helpers.maskedStop()
				console.log e
				SS.helpers.alert 'sorry!', e.responseText