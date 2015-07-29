Ext.define "stable_mobile.view.contact.List",
	extend: "Ext.dataview.List"

	controller: 'stable_mobile.controller.contact.ListViewController'
	requires: [
		'stable_mobile.controller.contact.ListViewController'
	]

	config:
		cls: 'contact-list'
		itemCls: 'contact-list-item'
		itemId: 'contactList'
		selectedCls: 'selected-quiet'
		pressedDelay: 1
		masked: false
		loadingText: false
		emptyText: SS.copy.noContacts
		grouped: true
		itemTpl: """
			<h1>
				{name}
			</h1>
		"""