Ext.define "stable_mobile.controller.horse.TempListViewController",
	extend: "Deft.mvc.ViewController"

	control:
	  view:
	    listeners:
	      itemtap: 'onItemTap'
	      erased: 'onErased'

	onErased: ->
		view = @getView()
		if view.hasSelection()
			view.deselectAll(true)
	
	onItemTap: (dataview, index, target, record) ->
		tapped = record.data
		console.log tapped
		@getView().deselectAll(true)

		Ext.Msg.confirm 'Remove?', 'Would you like to delete this record?', (e) =>
			if e == 'yes'
				console.log "delete"
				@doDeleteRecord tapped
			else
				console.log "cancel"

	doDeleteRecord: (record)->
		theData = record
		console.log theData
		id = theData.id

		theRoute = SS.api.endpoints.health.temperature
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

