Ext.define "stable_mobile.controller.SignInViewController",
	extend: "Deft.mvc.ViewController"

	control:
		signInButton:
			listeners:
				tap: 'onSignIn'
		view:
			listeners:
				action: 'onSignIn'
		emailFieldIn:
			listeners:
				action: 'onSignIn'
		passwordFieldIn:
			listeners:
				action: 'onSignIn'
		forgotPassword: true

	init: ->
		console.log 'init sign in vc'
		
	onSignIn: ->
		console.log 'signing in!'

		form = @getView()
		values = form.getValues()
		model = Ext.create("stable_mobile.model.Login", values);

		errors = model.validate()

		if errors.length
			SS.helpers.alert "Whoops!", "#{errors.items[0]._field} #{errors.items[0]._message}"
		else
			@login values

	login: (creds) ->
		theForm = @getView()
		payload = 
			'session[email]': creds.email
			'session[password]': creds.password

		SS.helpers.maskedStart('logging in...')

		Ext.Ajax.request
			method: 'POST'
			url: SS.api.endpoints.login
			params: payload
			timeout: 30000
			success: (result) =>
				data = JSON.parse result.responseText

				SS.user = data
				SS.signedIn = true
				console.log data
				localStorage.setItem 'currentUser', JSON.stringify(data)

				SS.helpers.maskedStop()

				theForm.reset()

				Ext.Viewport.animateActiveItem SS.addCmp('#main', "stable_mobile.view.Main"), {type: 'slide', direction: 'left'}

			failure: (e) ->
				SS.helpers.maskedStop()
				
				console.log e
				SS.helpers.alert 'sorry!', e.responseText