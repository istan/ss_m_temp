Ext.define "stable_mobile.controller.health.vaccination.ListViewController",
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

	onFormDone: (record) ->
		console.log 'do finish'
		if @form
			values = @form.getValues()
			record.data.price = values.price
			@form.hide()


	onFormCancel: (record) ->
		console.log 'do cancel'
		if @form
			@form.hide()
			@getView().deselect record


	
	onItemTap: (dataview, index, target, record) ->
		theList = @getView()
		isSelected = theList.isSelected record
		tapped = record.data

		if isSelected
			@form = Ext.create 'Ext.form.Panel',
				centered: true
				modal: true
				hideOnMaskTap: false
				width: '80%'
				height: '50%'
				items: [
					xtype: 'textfield'
					label: 'Price ($)'
					name: 'price'
				,
					xtype: 'button'
					text: 'DONE'	
					margin: '20 0'
					listeners:
						tap: => 
							@onFormDone record
				,
					xtype: 'button'
					text: 'cancel'	
					margin: '10 0'
					listeners:
						tap: => 
							@onFormCancel record
				]

			@form.setValues record.data
			Ext.Viewport.add @form