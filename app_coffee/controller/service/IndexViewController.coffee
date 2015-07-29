Ext.define "stable_mobile.controller.service.IndexViewController",
	extend: "Deft.mvc.ViewController"

	requires: [
		'stable_mobile.model.Service'
	]

	control:
		serviceList: true
		saveBtn:
			listeners:
				tap: 'onSaveBtn'
		dateField: true


	init: ->

		@fetchServices()

	fetchServices: ->
		horse = @getView().getData()

		theStore = Ext.getStore('servicesStore')
		theList = @getServiceList()

		if !theStore
			theStore = Ext.create "stable_mobile.store.Services"
		
		theList.setStore theStore
		
		if SS.helpers.hasInternet()
			path = "#{SS.activeDomain}#{SS.api.preface}horses/#{horse.id}/services"
			theStore.loadProxy path, null, null, null, @cacheResults, this
		else
			console.log 'no network - using cache'
			if SS.cache.horses[horse.id] and SS.cache.horses[horse.id].usableServices
				for item in SS.cache.horses[horse.id].usableServices.items
					theStore.add item.data

	cacheResults: ->
		horse = @getView().getData()
		store = @getServiceList().getStore()

		theData = store.getData()

		if SS.cache.horses[horse.id]
			SS.cache.horses[horse.id]['usableServices'] = theData
		else
			SS.cache.horses[horse.id] = 
				usableServices: theData

	onSaveBtn: ->
		console.log 'save records'
		horse = @getView().getData()
		services = @getServiceList().getSelection()

		if !services or services.length is 0
			SS.helpers.alert 'No data', 'You must make a selection', 'OK'
			return

		payload =
			auth_token: SS.user.auth_token
			horse_id: horse.id
			administered_at: @getDateField().getValue()

		for service, i in services
			payload["service_records[#{i}][serviceship_id]"] = service.data.id
			payload["service_records[#{i}][comments]"] = service.data.notes
			payload["service_records[#{i}][price]"] = service.data.price

		theUrl = SS.api.endpoints.service.post

		if !SS.helpers.hasInternet()
			console.log 'no connection - storing for later'
			SS.helpers.queueUp
				url: theUrl
				payload: payload

			SS.helpers.alert 'Poor network!', 'Service records queued up for saving when network returns.', 'OK'
			@getView().up('navigationview').pop()

			return false

		SS.helpers.maskedStart('Saving records...')

		Ext.Ajax.request
			method: 'POST'
			url: theUrl
			params: payload
			timeout: 30000
			success: (result) =>
				data = JSON.parse result.responseText

				SS.helpers.maskedStop()

				SS.helpers.vibrate()

				SS.helpers.alert 'Got it!', 'Services recorded', 'OK'

				@getView().up('navigationview').pop()

			failure: (e) ->
				SS.helpers.maskedStop()
				console.log e
				SS.helpers.alert 'sorry!', e.responseText