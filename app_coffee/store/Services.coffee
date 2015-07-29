Ext.define "stable_mobile.store.Services",
  extend: "stable_mobile.store.BaseStore"
  
  config:
    model: "stable_mobile.model.Service"
    url: null
    sorters: 'last'
    storeId: 'servicesStore'

    grouper:
       groupFn: (record) ->
           record.get('category')
    
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
      @loadProxy @getUrl(), true, view, null, false