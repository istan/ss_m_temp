Ext.define "stable_mobile.view.service.List",
	extend: "Ext.dataview.List"

	controller: 'stable_mobile.controller.service.ListViewController'
	requires: ['stable_mobile.controller.service.ListViewController']

	config:
		cls: 'service-list'
		itemCls: 'service-list-item'
		itemId: 'serviceList'
		pressedDelay: 1
		masked: false
		loadingText: false
		emptyText: SS.copy.noData
		grouped: true
		mode: 'MULTI'
		itemTpl: """
			<h1>
				{name}
			</h1>
			<p>{notes}</p>
		"""