Ext.define "stable_mobile.store.Records",
  extend: "stable_mobile.store.BaseStore"
  
  config:
    model: "stable_mobile.model.Record"
    url: null
    sorters: 
      property: 'administered_at'
      direction: 'DESC'

    grouper:
      sortProperty: 'administered_at'
      direction: 'DESC'
      groupFn: (record) ->
        adjustedDate = Ext.Date.add(record.get('administered_at'), Ext.Date.HOUR, 4)
        Ext.Date.format(adjustedDate, 'm/d/Y')
    
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
      @loadProxy @getUrl(), true, view, null, false