Ext.define "stable_mobile.controller.event.ListViewController",
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