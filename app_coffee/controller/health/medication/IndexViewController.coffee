Ext.define "stable_mobile.controller.health.medication.IndexViewController",
	extend: "Deft.mvc.ViewController"

	control:
		medList: true
		saveBtn:
			listeners:
				tap: 'onSaveBtn'
		dateField: true


	init: ->

		opts = @getView().config.prescriptions
		theList = @getMedList()

		theList.setData opts

	onSaveBtn: ->
		console.log 'save records'
		horseId = @getView().config.horseId
		meds = @getMedList().getSelection()

		if !meds or meds.length is 0
			SS.helpers.alert 'no data', 'you must make a selection', 'OK'
			return

		payload =
			auth_token: SS.user.auth_token
			horse_id: horseId
			user_id: SS.user.id
			administered_at: @getDateField().getValue()

		for med, i in meds
			payload["medication_records[#{i}][prescription_id]"] = med.data.id
			payload["medication_records[#{i}][dosage_cost]"] = med.data.dosage_cost
			payload["medication_records[#{i}][dosage_unit]"] = med.data.dosage_unit
			payload["medication_records[#{i}][dose_type]"] = med.data.dose_type
			payload["medication_records[#{i}][markup]"] = med.data.markup
			payload["medication_records[#{i}][dosage]"] = med.data.dosage
			payload["medication_records[#{i}][comments]"] = med.data.comments
			payload["medication_records[#{i}][person_id]"] = med.data.person_id

		theUrl = SS.api.endpoints.health.medication

		if !SS.helpers.hasInternet()
			console.log 'no connection - storing for later'
			SS.helpers.queueUp
				url: theUrl
				payload: payload

			SS.helpers.alert 'poor network!', 'medication records queued up for saving when network returns.', 'OK'
			@getView().up('navigationview').pop()

			return false

		SS.helpers.maskedStart('saving meds...')

		Ext.Ajax.request
			method: 'POST'
			url: theUrl
			params: payload
			timeout: 30000
			success: (result) =>
				data = JSON.parse result.responseText

				SS.helpers.maskedStop()

				SS.helpers.vibrate()

				SS.helpers.alert 'Got it!', 'Medications recorded', 'OK'

				if !SS.cache.horses[horseId]
					SS.cache.horses[horseId] = {}

				cachedHorse = SS.cache.horses[horseId]
				cachedHorse['prescriptions'] = data 
				
				@getView().up('navigationview').pop(2)

			failure: (e) ->
				SS.helpers.maskedStop()
				console.log e
				SS.helpers.alert 'sorry!', e.responseText