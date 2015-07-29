Ext.define "stable_mobile.store.Horses",
  extend: "stable_mobile.store.BaseStore"
  
  config:
    model: "stable_mobile.model.Horse"
    url: null
    storeId: 'horsesStore'
    
    #autoLoad: false
    clearOnPageLoad: true
    #pageSize: 10

    sorters: new Ext.util.Sorter ->
        property: 'display_name'
        sorterFn: (o1,o2) ->
          name1 = o1.data.display_name
          name2 = o2.data.display_name

          if !name1? and !name2?
            return 0
          if !name1? and name2?
            return -1
          if name1? and !name2?
            return 1

          name1 = name1.toLowerCase()
          name2 = name2.toLowerCase()

          if name1 > name2
            return 1
          if name1 < name2
            return -1
          if name1 == name2
            return 0

    proxy:
      type: "ajax"
      url: ""
      reader:
        type: "json"
        root: ""

  doRefresh: (view) ->
    if @getUrl()?
      console.log 'refreshing'
      @loadProxy @getUrl(), view, null, false, @cacheResults, this
    else
      console.log 'cannot refresh - no url'

  cacheResults: ->
    if SS.cache.horses.length
      @persistCache()
      return
    horseData = @getData().items
    for horse in horseData
      SS.cache.horses[horse.raw.id] = horse.raw
    @persistCache()

  persistCache: ->
    console.log "PERSISTING HORSES"
    if SS.cache.horses and Object.size(SS.cache.horses)
      delete SS.cache.horses[undefined]
      localStorage.setItem 'horses', JSON.stringify(SS.cache.horses)