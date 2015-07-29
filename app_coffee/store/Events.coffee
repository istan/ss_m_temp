Ext.define "stable_mobile.store.Events",
  extend: "stable_mobile.store.BaseStore"
  
  config:
    model: "stable_mobile.model.Event"
    url: null
    storeId: 'eventsStore'

    grouper:
      #sortProperty: 'name'
      #direction: 'ASC'
      groupFn: (record) ->
        record.get('horse_name')
    
    #autoLoad: false
    clearOnPageLoad: true
    #pageSize: 10

    proxy:
      type: "ajax"
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