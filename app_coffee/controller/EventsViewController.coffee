Ext.define "stable_mobile.controller.EventsViewController",
	extend: "Deft.mvc.ViewController"

	requires: [
		'stable_mobile.model.Event'
	]

	control:
		view:
			listeners:
				painted: 'onPainted'
		eventList: true


	init: ->

	onPainted: ->
		SS.helpers.checkConnectivityAndQueue()
		@fetchEvents()

	fetchEvents: (modal = true) ->
		theList = @getEventList()
		if theList.getStore()?
			theStore = theList.getStore()
		else
			theStore = Ext.create "stable_mobile.store.Events"
			theList.setStore theStore

		if !theStore.isLoading() and SS.helpers.hasInternet()
			theStore.loadProxy SS.api.endpoints.events.index, @getView(), 'loading', modal
			theStore.setUrl SS.api.endpoints.events.index