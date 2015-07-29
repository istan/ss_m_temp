Ext.define "stable_mobile.view.health.medication.List",
	extend: "Ext.dataview.List"

	controller: 'stable_mobile.controller.health.medication.ListViewController'
	requires: ['stable_mobile.controller.health.medication.ListViewController']

	config:
		cls: 'med-list'
		itemCls: 'med-list-item'
		itemId: 'medList'
		pressedDelay: 1
		masked: false
		loadingText: false
		emptyText: SS.copy.noMeds
		mode: 'MULTI'
		itemTpl: """
			<h1>
				{name}
			</h1>
		"""