Ext.define "stable_mobile.store.Contacts",
  extend: "stable_mobile.store.BaseStore"
  
  config:
    model: "stable_mobile.model.Person"
    url: null
    sorters: 'name'
    storeId: 'contactsStore'

    grouper:
      sortProperty: 'name'
      direction: 'ASC'
      groupFn: (record) ->
        record.get('name')[0]
    
    #autoLoad: false
    clearOnPageLoad: true
    #pageSize: 10

    proxy:
      type: "ajax"
      url: ""
      reader:
        type: "json"
        root: ""

  returnRole: (role) ->
    contacts = @getData()
    opts = []

    if role?
      for contact in contacts.all
        if contact.data? and contact.data.roles? and contact.data.roles.indexOf(role) > -1
          opts.push contact
    else
      opts = contacts.all

    opts.push {name: '', id: 0}
    opts

  doRefresh: (view) ->
    if @getUrl()?
      console.log 'refreshing'
      @loadProxy @getUrl(), view, null, false
    else
      console.log 'cannot refresh - no url'