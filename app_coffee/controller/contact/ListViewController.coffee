Ext.define "stable_mobile.controller.contact.ListViewController",
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

		contact = Ext.create 'stable_mobile.view.contact.Show', {data: tapped}

		# push it onto the nav view
		navView = @getView().up('navigationview')
		navView.push contact