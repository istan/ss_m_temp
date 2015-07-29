Ext.define "stable_mobile.view.record.List",
	extend: "Ext.dataview.List"

	controller: 'stable_mobile.controller.record.ListViewController'
	requires: ['stable_mobile.controller.record.ListViewController']

	config:
		cls: 'record-list'
		itemCls: 'record-list-item'
		itemId: 'recordList'
		pressedDelay: 1
		masked: false
		loadingText: false
		selectedCls: 'quiet-tap'
		emptyText: SS.copy.noData
		grouped: true
		itemTpl: """
			<h1 class='inline record-title'>
				{body}
			</h1>
		"""