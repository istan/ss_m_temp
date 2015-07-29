Ext.define "stable_mobile.controller.HorsesViewController",
	extend: "Deft.mvc.ViewController"

	requires: [
		'stable_mobile.model.Horse'
	]

	control:
		view:
			listeners:
				painted: 'onPainted'
				activeitemchange: 'onChange'
		horseList: true
		addHorseBtn:
			listeners:
				tap: 'onAddHorse'

	init: ->
		@fetchHorses()

	onChange: (navigationView, newView) -> 

		innerItems = navigationView.getInnerItems()
		idx = innerItems.indexOf(newView)
		bar = navigationView.getNavigationBar()
		button = @getAddHorseBtn()

		if idx == 0
			button.show()
			@fetchHorses()
		else
			button.hide()


	onPainted: ->
		try
			SS.helpers.checkConnectivityAndQueue()
		catch error
			console.log error

	cacheResults: ->
		if SS.cache.horses.length
			console.log "has cache, returning..."
			@persistCache()
			return
		theList = @getHorseList()
		theStore = theList.getStore()
		horseData = theStore.getData().items
		for horse in horseData
			SS.cache.horses[horse.raw.id] = horse.raw

		@persistCache()

	persistCache: ->
		console.log "PERSISTING HORSES"
		if SS.cache.horses and Object.size(SS.cache.horses)
			delete SS.cache.horses[undefined]
			localStorage.setItem 'horses', JSON.stringify(SS.cache.horses)

	fetchHorses: (modal = true) ->
		theList = @getHorseList()

		if theList.getStore()?
			theStore = theList.getStore()
		else
			theStore = Ext.create "stable_mobile.store.Horses"
			theList.setStore theStore

		if Object.size SS.cache.horses
			console.log "applying cache"
			
			theStore.setProxy
				type: 'memory'
				reader:
					type: 'json'
					root: ''

			horseCache = SS.cache.horses
			horseArray = []
			for key, horse of horseCache
				horseArray.push horse
			
			if horseArray.length
				theStore.setData horseArray
				theStore.load()
				theStore.sort()
				modal = false

		if !theStore.isLoading() && SS.helpers.hasInternet()

			theStore.setProxy
				type: "ajax"
				url: ""
				reader:
					type: "json"
					root: ""
			
			theStore.loadProxy SS.api.endpoints.horses.index, @getView(), 'loading', modal, @cacheResults, this
			theStore.setUrl SS.api.endpoints.horses.index
			theStore.sort()

	onAddHorse: ->
		btn = @getAddHorseBtn()

		form = Ext.create 'stable_mobile.view.horse.Form', {title: 'Add horse'}
		navView = @getView()
		navView.push form
