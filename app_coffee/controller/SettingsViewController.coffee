Ext.define "stable_mobile.controller.SettingsViewController",
	extend: "Deft.mvc.ViewController"

	control:
		signOutBtn:
			listeners:
				tap: 'onSignOutBtn'
		syncBtn:
			listeners:
				tap: 'onSyncBtn'

	init: ->
		console.log 'settings'

	onSignOutBtn: ->
		console.log 'sign out btn tapped'
		@signOutUser()

	onSyncBtn: ->
		SS.helpers.fetchUsableTypes ->
			SS.helpers.alert 'Success!', 'Re-synced with server. Meds, vaccinations, womers, etc should be current.', 'OK'
		, this
			
	signOutUser: ->
		console.log 'signing out'
		SS.user = {}
		SS.signedIn = false
		SS.cache.horses = {}
		SS.cache.usableTypes = {}
		localStorage.removeItem 'horses'
		localStorage.removeItem 'currentUser'
		localStorage.removeItem 'queue'
		SS.f('#main').fireEvent 'painted'