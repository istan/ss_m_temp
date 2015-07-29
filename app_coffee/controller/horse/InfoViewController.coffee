Ext.define "stable_mobile.controller.horse.InfoViewController",
	extend: "Deft.mvc.ViewController"

	control:
	  infoContent: true
	  
	init: ->
		horse = @getView().getData()
		@getInfoContent().setData horse