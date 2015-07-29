Ext.define 'stable_mobile.store.BaseStore',
	extend: 'Ext.data.Store'

	loadProxy: (url, view = Ext.Viewport, message = 'loading', modal = true, callback = null, scope = this, params = {}) ->
		console.log 'loading proxy - base'

		if !SS.helpers.hasInternet()
			console.log 'no connection'
			SS.helpers.alert "no network!", "using cached data. we'll resync when your network connection returns.", "OK"
			return false

		# which endpoint are we using?
		#
		endpoint = null
		Object.keys(SS.api).forEach (key) ->
			val = SS.api[key]
			if typeof val is 'object'
				Object.keys(val).forEach (k) ->
					if url is val[k]
						endpoint = "#{key}_#{k}"
						return false

		@completeLoad(url, view, message, modal, callback, scope, params, endpoint)

	completeLoad: (url, view, message, modal = true, callback = null, scope = this, params = {}, endpoint) ->

		if '?' in url is false
			url += '?' 

		string = url

		if SS.user.auth_token?
			authToken = SS.user.auth_token
		else
			authToken = JSON.parse(localStorage.getItem('currentUser')).auth_token

		for key, value of params
			string += "&#{key}=#{value}"

		string += "&version=#{SS.version}&auth_token=#{authToken}"

		console.log string

		@setProxy(
			type: 'ajax'
			url: string
			timeout: 30000
			reader:
				type: 'json'
				rootProperty: ''
		)
		
		if modal
			SS.helpers.maskedStart(message, view)
		else
			SS.helpers.activityStart()
		
		@load({
			callback: ->
				if callback? and callback
					callback.call(scope)

				if modal
					SS.helpers.maskedStop(view)
				else
					SS.helpers.activityStop()
			})