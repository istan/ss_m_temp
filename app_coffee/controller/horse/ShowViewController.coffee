Ext.define "stable_mobile.controller.horse.ShowViewController",
	extend: "Deft.mvc.ViewController"

	control:
	  view:
	  	listeners:
	  		painted: 'onPainted'
	  horseTop: true
	  horseImage: true
	  horseName: true
	  recordList: true
	  healthRecordsList: true
	  addTempBtn:
	  	listeners:
	  		tap: 'onAddTempBtn'
	  infoBtn:
	  	listeners:
	  		tap: 'onInfoBtn'
	  addHealthBtn:
	  	listeners:
	  		tap: 'onHealthBtn'
	  addServiceBtn:
	  	listeners:
	  		tap: 'onServiceBtn'

	init: ->
		@populateView()

	populateView: ->
		horse = @getView().getData()
		@getHorseName().setData horse
		@getHorseImage().setSrc horse.thumb

	onPainted: ->
		@fetchRecords @getView().getData()
		horse = @getView().getData()

	adjustDate: (store) ->

	fetchRecords: (horse) ->
		serviceList = @getRecordList()
		healthList = @getHealthRecordsList()
		
		if serviceList.getStore()
			serviceStore = serviceList.getStore()
		else
			serviceStore = Ext.create "stable_mobile.store.Records"	
			serviceList.setStore serviceStore


		if healthList.getStore()
			healthStore = healthList.getStore()
		else
			healthStore = Ext.create "stable_mobile.store.HealthRecords"	
			healthList.setStore healthStore
			SS.helpers.adjustDateHandler healthStore
		

		if SS.helpers.hasInternet()
			
			SS.helpers.activityStart()

		
			if !healthStore.isLoaded()
				SS.helpers.maskedStart('Loading...')

			Ext.Ajax.request
				method: 'GET'
				url: "#{SS.activeDomain}#{SS.api.preface}horses/#{horse.id}/records?&version=#{SS.version}&auth_token=#{SS.user.auth_token}"
				timeout: 30000
				success: (result) =>
					SS.helpers.activityStop()
					SS.helpers.maskedStop()
					data = JSON.parse result.responseText

					serviceStore.setData data.service

					healthStore.setData data.health

					@cacheResults()
				failure: (e) ->
					SS.helpers.activityStop()
					SS.helpers.maskedStop()
					console.log e
		else
			console.log 'no network - using cache'
			@populateFromCache horse.id, 'healthRecords', healthStore
			@populateFromCache horse.id, 'serviceRecords', serviceStore

	populateFromCache: (horse_id, rec_type, store) ->
		if SS.cache.horses[horse_id] and SS.cache.horses[horse_id][rec_type]
			console.log 'grabbing from cache'
			store.setData SS.cache.horses[horse_id][rec_type].items

	cacheResults: ->
		horse = @getView().getData()
		serviceStore = @getRecordList().getStore()
		healthStore = @getHealthRecordsList().getStore()

		if SS.cache.horses[horse.id]
			SS.cache.horses[horse.id]['serviceRecords'] = serviceStore.getData()
			SS.cache.horses[horse.id]['healthRecords'] = healthStore.getData()
		else
			SS.cache.horses[horse.id] = 
				serviceRecords: serviceStore.getData()
				healthRecords: healthStore.getData()

	onAddTempBtn: ->
		navView = @getView().up('navigationview')
		if navView
			navView.push(SS.addCmp "#horseTempAdder", "stable_mobile.view.horse.TempAdder", {data: @getView().getData()})

	onInfoBtn: ->
		navView = @getView().up('navigationview')

		if navView
			navView.push(SS.addCmp "#horseInfo", "stable_mobile.view.horse.Info", {data: @getView().getData()})

	onHealthBtn: ->
		navView = @getView().up('navigationview')

		if navView
			navView.push(SS.addCmp "#health", "stable_mobile.view.health.Index", {data: @getView().getData()})

	onServiceBtn: ->
		navView = @getView().up('navigationview')

		if navView
			navView.push(SS.addCmp "#services", "stable_mobile.view.service.Index", {data: @getView().getData()})