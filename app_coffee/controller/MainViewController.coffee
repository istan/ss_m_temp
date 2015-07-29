Ext.define "stable_mobile.controller.MainViewController",
	extend: "Deft.mvc.ViewController"

	requires: [
		'stable_mobile.model.Horse'
	]

	control:
		view:
			listeners:
				painted: 'onPainted'

	init: ->
		console.log "we're alive"

	onPainted: ->
		if !SS.signedIn
			@loadSignInView()
		else
			if !Object.size SS.cache.horses
				SS.helpers.maskedStart()
			SS.api.fullInit() 			
			Ext.defer =>
				SS.helpers.fetchUsableTypes()
				@loadSignedInView ->
					SS.helpers.maskedStop()
			, 200

	checkSubscription: ->
		Ext.Ajax.request
			method: 'GET'
			url: SS.api.endpoints.user.checkSubs
			timeout: 30000
			success: (result) =>
				data = JSON.parse result.responseText
				console.log data
				if !data.valid
					SS.helpers.maskedStart()
					msg = data.message
					SS.helpers.alert "Sorry", msg, "OK"

			failure: (e) ->
				console.log "failed to check subs"
				

	loadSignInView: ->
		Ext.Viewport.animateActiveItem SS.addCmp('#start', "stable_mobile.view.Start"), {type: 'slide', direction: 'right'}

	loadSignedInView: (callback, scope) ->
		mainView = @getView()
		if mainView and mainView.getItems().length < 3
			@getView().add [
				xclass: "stable_mobile.view.Horses"
				title: 'Horses'
				iconCls: 'home2'
				iconMask: true
			,
				xclass: "stable_mobile.view.Events"
				title: 'Events'
				iconCls: 'calendar2'
				iconMask: true
			,
				xclass: "stable_mobile.view.Contacts"
				title: 'People'
				iconCls: 'address_book'
				iconMask: true
			,
				xclass: "stable_mobile.view.Settings"
				title: 'Settings'
				iconCls: 'settings'
				iconMask: true
			]
		else
			horses = Ext.getStore('horsesStore')
			if horses
				horses.setUrl SS.api.endpoints.horses.index
				horses.doRefresh()

			events = Ext.getStore('eventsStore')
			if events
				events.setUrl SS.api.endpoints.events.index
				events.doRefresh()

			contacts = Ext.getStore('contactsStore')
			if contacts
				contacts.setUrl SS.api.endpoints.people.index
				contacts.doRefresh()

		mainView.setActiveItem 0

		@checkSubscription()

		if callback
			callback.call(scope)

