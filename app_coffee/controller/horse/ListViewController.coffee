Ext.define "stable_mobile.controller.horse.ListViewController",
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
		horse = Ext.create 'stable_mobile.view.horse.Show', {data: tapped, title: 'Horse'}
		# push it onto the nav view
		navView = @getView().up('navigationview')
		navView.push horse