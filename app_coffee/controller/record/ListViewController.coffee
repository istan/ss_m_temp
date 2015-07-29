Ext.define "stable_mobile.controller.record.ListViewController",
	extend: "Deft.mvc.ViewController"

	control:
	  view:
	    listeners:
	      itemtap: 'onItemTap'
	      erased: 'onErased'
	
	init: ->
	
	onErased: ->
		view = @getView()
		if view.hasSelection()
			view.deselectAll(true)
	
	onItemTap: (dataview, index, target, record) ->
		tapped = record.data
		view = @getView()
		
		showView = Ext.create "stable_mobile.view.record.Show",
			title: tapped.klass.split(/(?=[A-Z])/).join(' ');
			data: tapped
			horseId: tapped.horse_id

		navView = @getView().up('navigationview')

		if showView and navView
			navView.push showView