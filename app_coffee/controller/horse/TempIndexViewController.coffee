Ext.define "stable_mobile.controller.horse.TempIndexViewController",
	extend: "Deft.mvc.ViewController"

	requires: [
		'stable_mobile.model.Temperature'
	]

	control:
		tempList: true

	init: ->

		@fetchTemps()

	fetchTemps: -> 
		console.log "fetching temps"

		horse = @getView().getData()

		theStore = Ext.getStore('tempStore')
		theList = @getTempList()

		if !theStore
			theStore = Ext.create "stable_mobile.store.Temperatures"
		
		theList.setStore theStore
		
		params =
			horse_id: horse.id

		if SS.helpers.hasInternet()
			theStore.loadProxy SS.api.endpoints.health.temperature, null, null, null, null, this, params
		else
			console.log("no internet")