Ext.define "stable_mobile.controller.service.ListViewController",
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
		if @form
			values = @form.getValues()
			record.data.notes = values.notes
			record.data.price = values.price
			@form.hide()

	onFormCancel: (record) ->
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
				width: '98%'
				height: '60%'
				defaults:
					labelWidth: '35%'
				items: [
					xtype: 'textareafield'
					label: 'Notes'
					name: 'notes'
				,
					xtype: 'numberfield'
					itemId: "priceField"
					label: 'Price ($)'
					name: 'price'
				,
					xtype: 'button'
					text: 'DONE'	
					margin: '20 0'
					listeners:
						tap: => 
							@onFormDone(record)
				,
					xtype: 'button'
					text: 'cancel'	
					margin: '10 0'
					listeners:
						tap: =>
							@onFormCancel(record)
				]		

			@form.setValues record.data
			Ext.Viewport.add @form

	onNoteConfirm: (buttonId, value, opt) ->
		console.log 'confirmed'
