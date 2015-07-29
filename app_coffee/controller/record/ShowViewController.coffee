Ext.define "stable_mobile.controller.record.ShowViewController",
	extend: "Deft.mvc.ViewController"

	control:
		view: true
		recordContent: true
		editBtn:
			listeners:
				tap: 'onEditBtn'
		deleteBtn:
			listeners:
				tap: 'onDeleteBtn'
	
	init: ->
		@getRecordContent().setData @getView().getData()

	onEditBtn: -> 
		console.log "edit"
		theData = @getView().getData()
		klass = theData.klass
		navView = @getView().up('navigationview')
		horseId = @getView().config.horseId

		switch klass
			when "ServiceRecord"
				navView.push(SS.addCmp "#serviceForm", "stable_mobile.view.service.Form", 
					data: theData
					horseId: horseId
					editContext: true
					title: theData.body
				)
			when "TherapyRecord"
				navView.push(SS.addCmp "#therapyForm", "stable_mobile.view.health.form.Therapy", 
					endpoint: 'therapy'
					usableType: 'therapy_types'
					data: theData
					horseId: horseId
					editContext: true
				)
			when "DentalRecord"
				navView.push(SS.addCmp "#dentalForm", "stable_mobile.view.health.form.Dental", 
					personType: 'dentist'
					endpoint: 'dental'
					data: theData
					horseId: horseId
					editContext: true
				)
			when "FarrierRecord"
				navView.push(SS.addCmp "#farrierForm", "stable_mobile.view.health.form.Farrier", 
					personType: 'farrier'
					endpoint: 'farrier'
					data: theData
					horseId: horseId
					editContext: true
				)
			when "MedicationRecord"
				navView.push(SS.addCmp "#medicationForm", "stable_mobile.view.health.form.Medication", 
					endpoint: 'medication'
					data: theData
					horseId: horseId
					editContext: true
					title: theData.body
				)
			when "JointRecord"
				navView.push(SS.addCmp "#jointForm", "stable_mobile.view.health.form.Joint", 
					personType: 'veterinarian'
					endpoint: 'joint'
					usableType: 'joint_injection_types'
					data: theData
					horseId: horseId
					editContext: true
				)
			when "Injury"
				navView.push(SS.addCmp "#injuryForm", "stable_mobile.view.health.form.Injury", 
					endpoint: 'injury'
					usableType: 'injury_types'
					data: theData
					horseId: horseId
					editContext: true
				)
			when "VaccinationRecord"
				navView.push(SS.addCmp "#vaccinationForm", "stable_mobile.view.health.form.Vaccination", 
					personType: 'veterinarian'
					endpoint: 'vaccination'
					usableType: 'vaccination_types'
					data: theData
					horseId: horseId
					editContext: true
				)
			when "WormingRecord"
				navView.push(SS.addCmp "#wormingForm", "stable_mobile.view.health.form.Worming", 
					personType: 'veterinarian'
					endpoint: 'worming'
					usableType: 'wormer_types'
					data: theData
					horseId: horseId
					editContext: true
				)
			when "GeneralHealthRecord"
				navView.push(SS.addCmp "#otherForm", "stable_mobile.view.health.form.Other", 
					endpoint: 'general'
					data: theData
					horseId: horseId
					editContext: true
				)

	onDeleteBtn: -> 
		Ext.Msg.confirm 'Confirm delete', 'Are you sure you want to delete this record?', (e) =>
			if e == 'yes'
				console.log "delete"
				@doDeleteRecord()
			else
				console.log "cancel"

	doDeleteRecord: ->
		theData = @getView().getData()
		klass = theData.klass
		id = theData.id

		routeMap = 
			"ServiceRecord": SS.api.endpoints.service.destroy
			"DentalRecord": SS.api.endpoints.health.dental
			"FarrierRecord": SS.api.endpoints.health.farrier
			"MedicationRecord": SS.api.endpoints.health.medication
			"JointRecord": SS.api.endpoints.health.joint
			"Injury": SS.api.endpoints.health.injury
			"VaccinationRecord": SS.api.endpoints.health.vaccination
			"WormingRecord": SS.api.endpoints.health.worming
			"Temperature": SS.api.endpoints.health.temperature
			"GeneralHealthRecord": SS.api.endpoints.health.general

		theRoute = routeMap[klass]

		theUrl = "#{theRoute}/#{id}"
		payload = {}
		payload['auth_token'] = SS.user.auth_token
		payload['user_id'] = SS.user.id

		SS.helpers.maskedStart('deleting...')

		Ext.Ajax.request
			method: 'DELETE'
			url: theUrl
			params: payload
			timeout: 30000
			success: (result) =>
				SS.helpers.maskedStop()
				SS.helpers.vibrate()
				SS.helpers.alert 'Deleted!', 'Record removed.', 'OK'
				@getView().up('navigationview').pop()

			failure: (e) ->
				SS.helpers.maskedStop()
				console.log e
				SS.helpers.alert 'Sorry!', e.responseText

