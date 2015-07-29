Ext.define "stable_mobile.controller.health.vaccination.IndexViewController",
	extend: "Deft.mvc.ViewController"

	control:
		vaccinationList: true
		saveBtn:
			listeners:
				tap: 'onSaveBtn'
		dateField: true

	init: ->

		opts = SS.cache.usableTypes.vaccination_types
		theList = @getVaccinationList()

		theList.setData opts

	onSaveBtn: ->
		console.log 'save records'
		horseId = @getView().config.horseId
		vaccines = @getVaccinationList().getSelection()

		if !vaccines or vaccines.length is 0
			SS.helpers.alert 'no data', 'you must make a selection', 'OK'
			return

		payload =
			auth_token: SS.user.auth_token
			horse_id: horseId
			user_id: SS.user.id
			administered_at: @getDateField().getValue()

		for vaccine, i in vaccines
			payload["vaccination_records[#{i}][vaccination_type_id]"] = vaccine.data.id
			payload["vaccination_records[#{i}][price]"] = vaccine.data.price

		theUrl = SS.api.endpoints.health.vaccination

		if !SS.helpers.hasInternet()
			console.log 'no connection - storing for later'
			SS.helpers.queueUp
				url: theUrl
				payload: payload

			SS.helpers.alert 'poor network!', 'vaccination records queued up for saving when network returns.', 'OK'
			@getView().up('navigationview').pop()

			return false

		SS.helpers.maskedStart('saving...')

		Ext.Ajax.request
			method: 'POST'
			url: theUrl
			params: payload
			timeout: 30000
			success: (result) =>
				data = JSON.parse result.responseText

				SS.helpers.maskedStop()

				SS.helpers.vibrate()

				SS.helpers.alert 'Got it!', 'Vaccinations recorded', 'OK'

				@getView().up('navigationview').pop()

			failure: (e) ->
				SS.helpers.maskedStop()
				console.log e
				SS.helpers.alert 'sorry!', e.responseText