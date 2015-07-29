Ext.define "stable_mobile.controller.ContactsViewController",
	extend: "Deft.mvc.ViewController"

	requires: [
		'stable_mobile.model.Person'
	]

	control:
		view:
			listeners:
				painted: 'onPainted'
				activeitemchange: 'onChange'
		contactList: true
		addContactBtn:
			listeners:
				tap: 'onAddContact'


	init: ->
		@fetchContacts()

	onPainted: ->
		SS.helpers.checkConnectivityAndQueue()

	onChange: (navigationView, newView) -> 

		innerItems = navigationView.getInnerItems()
		idx = innerItems.indexOf(newView)
		bar = navigationView.getNavigationBar()
		button = @getAddContactBtn()

		if idx == 0
			button.show()
			@fetchContacts()
		else
			button.hide()

	fetchContacts: (modal = true) ->
		
		theList = @getContactList()
		if theList.getStore()?
			theStore = theList.getStore()
		else
			theStore = Ext.create "stable_mobile.store.Contacts"
			theList.setStore theStore

		if !theStore.isLoading() and SS.helpers.hasInternet()
			theStore.loadProxy SS.api.endpoints.people.index, @getView(), 'loading', modal
			theStore.setUrl SS.api.endpoints.people.index

	onAddContact: ->
		btn = @getAddContactBtn()

		form = Ext.create 'stable_mobile.view.contact.Form', {title: 'Add contact'}
		navView = @getView()
		navView.push form
