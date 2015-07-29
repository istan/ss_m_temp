Ext.define "stable_mobile.view.horse.TempList",
	extend: "Ext.dataview.List"

	controller: 'stable_mobile.controller.horse.TempListViewController'
	requires: ['stable_mobile.controller.horse.TempListViewController']

	config:
		cls: 'horse-list'
		itemCls: 'horse-list-item'
		itemId: 'tempList'
		selectedCls: 'selected-quiet'
		pressedDelay: 1
		masked: false
		loadingText: false
		emptyText: SS.copy.noData
		itemTpl: """
			<h1 style='margin-left:0; padding-left:0;'>
				{reading} f
			</h1>
			<br />
			<h3>
				<b>Date:</b> {[Ext.Date.format(values.reading_date, 'm/d/Y g:i A')]}
			</h3>
			<p>
				<b>Notes:</b> <i>{comments}</i>
			</p>
		"""