Ext.define "stable_mobile.controller.health.FormViewController",
	extend: "Deft.mvc.ViewController"

	control:
		saveBtn:
			listeners:
				tap: 'onSave'
	
	init: ->
		console.log 'init form controller'
		theView = @getView()
		if theView.down('#administeredByField')
			@populatePeopleSelector()

		if theView.down('#typeField')
			@populateTypeSelector()

		if theView.config.editContext
			@doPopulateForEditing()

	doPopulateForEditing: ->
		form = @getView()
		record = form.getData()

		priceField = form.down('#priceField')
		if priceField
			priceField.setValue record.price
		notesField = form.down('#notesField')
		if notesField
			notesField.setValue record.comments
		dateField = form.down('#dateField')
		if dateField
			dateField.setValue record.administered_at

		dosageField = form.down('#dosageField')
		if dosageField
			dosageField.setValue record.dosage

		dosageUnitField = form.down('#dosageUnitField')
		if dosageUnitField
			dosageUnitField.setValue record.dosage_unit

		dosageCostField = form.down('#dosageCostField')
		if dosageCostField
			dosageCostField.setValue record.dosage_cost

		markupField = form.down('#markupField')
		if markupField
			markupField.setValue record.markup

	populateTypeSelector: ->
		if @getView().config.endpoint is 'medication'
			opts = @getView().getData().prescriptions
		else
			opts = SS.cache.usableTypes[@getView().config.usableType]

		form = @getView()
		select = form.down('#typeField')

		if select
			opts.push {name: 'select', id: 0}
			select.setOptions(opts)
			if form.config.editContext and form.getData().type_id?
				select.setValue form.getData().type_id
			else
				select.setValue 0

	populatePeopleSelector: -> 
		contactsStore = Ext.getStore('contactsStore')
		form = @getView()
		role = form.config.personType
		opts = contactsStore.returnRole(role)
		
		select = form.down('#administeredByField')
		if select
			opts.push {name: 'select', id: 0}
			select.setOptions(opts)
			if form.config.editContext and form.getData().person_id?
				select.setValue form.getData().person_id
			else
				select.setValue 0


	onSave: ->
		console.log 'saving'

		form = @getView()
		values = form.getValues()

		typeField = @getView().down('#typeField')

		if typeField and !typeField.getValue()
			SS.helpers.alert 'no data', 'you must select a type', 'OK'
			return

		@post values

	post: (payload) ->
		form = @getView()
		horseId = form.config.horseId

		# clean the select/0s out of the payload
		for k,v of payload
			if payload[k] is 0
				payload[k] = null

		payload['auth_token'] = SS.user.auth_token
		payload['horse_id'] = horseId
		payload['user_id'] = SS.user.id

		if form.config.endpoint
			theUrl = SS.api.endpoints.health[form.config.endpoint]
		else
			theUrl = SS.api.endpoints.service.destroy

		if !SS.helpers.hasInternet()
			console.log 'no connection - storing for later'
			SS.helpers.queueUp
				url: theUrl
				payload: payload

			SS.helpers.alert 'poor network!', 'health record queued up for later saving', 'OK'
			form.up('navigationview').pop()

			return false

		SS.helpers.maskedStart('saving record...')
		method = "POST"

		if form.config.editContext and form.getData() and form.getData().id?
			record = form.getData()
			theUrl = "#{theUrl}/#{record.id}"
			method = "PUT"

		Ext.Ajax.request
			method: method
			url: theUrl
			params: payload
			timeout: 30000
			success: (result) =>
				data = JSON.parse result.responseText

				SS.helpers.maskedStop()
				SS.helpers.vibrate()
				SS.helpers.alert 'Got it!', 'Record saved', 'OK'
				form.up('navigationview').pop(2)

			failure: (e) ->
				SS.helpers.maskedStop()
				console.log e
				SS.helpers.alert 'sorry!', e.responseText