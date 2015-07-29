Ext.define "stable_mobile.view.event.List",
	extend: "Ext.dataview.List"

	controller: 'stable_mobile.controller.event.ListViewController'
	requires: [
		'stable_mobile.controller.event.ListViewController'
	]

	config:
		cls: 'event-list'
		itemCls: 'event-list-item'
		itemId: 'eventList'
		pressedDelay: 1
		masked: false
		loadingText: false
		selectedCls: 'quiet-tap'
		emptyText: SS.copy.noEvents
		grouped: true
		itemTpl: """
			<h1 class='inline'>
				{body}
			</h1>
		"""