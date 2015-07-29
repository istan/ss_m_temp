Ext.define "stable_mobile.view.horse.Show",
	extend: "Ext.Container"

	controller: 'stable_mobile.controller.horse.ShowViewController'
	requires: [
		'Ext.Img'
		'stable_mobile.controller.horse.ShowViewController'
	]
	
	config:
		masked: false
		cls: 'horse-show'
		itemId: 'horseShow'
		scrollable: true
		title: "Horse"
		items: [
			xtype: 'container'
			cls: 'horse-top'
			itemId: 'horseTop'
			padding: 10
			layout: 'hbox'
			items: [
				xtype: 'image'
				itemId: 'horseImage'
				cls: 'horse-image'
				src: ''
				mode: 'image'
				height: 100
				width: 100
				flex: 2
			,
				xtype: 'container'
				itemId: 'horseName'
				html: '<h1>loading</h1>'
				padding: 10
				tpl: """
					<h1>{display_name}</h1>
					<h2>{gender}</h2>

				"""
				flex: 3
			]
		,
			xtype: 'container'
			itemId: 'horseBtns'
			cls: 'horse-btns'
			padding: 20
			items: [
				xtype: 'button'
				text: 'Detailed info'
				itemId: 'infoBtn'
				ui: ''
				margin: '0 0 20 0'
			,
				xtype: 'button'
				text: 'Temperatures'
				itemId: 'addTempBtn'
				ui: 'action'
				margin: '0 0 20 0'
			,
				xtype: 'button'
				text: 'Add service record'
				itemId: 'addServiceBtn'
				ui: 'action'
				margin: '0 0 20 0'
			,
				xtype: 'button'
				text: 'Add health record'
				itemId: 'addHealthBtn'
				ui: 'confirm'
				margin: '0 0 0 0'
			]
		,
			xtype: 'container'
			cls: 'sub-header'
			html: '<h1>Recent Services</h1>'
			padding: 10
		,
			xclass: "stable_mobile.view.record.List"
			scrollable: null
			padding: 0
		,
			xtype: 'container'
			cls: 'spacer'
			html: ''
			padding: 10
			height: 30
		,
			xtype: 'container'
			cls: 'sub-header'
			html: '<h1>Recent Health Records</h1>'
			padding: 10
		,
			xclass: "stable_mobile.view.record.List"
			itemId: 'healthRecordsList'
			scrollable: null
			padding: 0
			cls:'secondary-group-header'
			itemTpl: """
				<h1 class='inline record-title'>
					{[Ext.Date.format(values.administered_at, 'm/d/Y')]}: {body}
				</h1>
			"""
		]