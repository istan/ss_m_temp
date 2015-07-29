Ext.define "stable_mobile.store.Temperatures",
  extend: "stable_mobile.store.BaseStore"
  
  config:
    model: "stable_mobile.model.Temperature"
    url: null
    storeId: 'tempsStore'
    
    #autoLoad: false
    clearOnPageLoad: true
    #pageSize: 10

    proxy:
      type: "memory"
      url: ""
      reader:
        type: "json"
        root: ""

  doRefresh: (view) ->
    if @getUrl()?
      console.log 'refreshing'
      @loadProxy @getUrl(), view, null, false
    else
      console.log 'cannot refresh - no url'