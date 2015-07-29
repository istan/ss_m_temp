Ext.define "stable_mobile.util.Settings",
  singleton: true
  alternateClassName: 'SS'

  fa: (itemId) ->
    Ext.ComponentQuery.query(itemId)

  f: (itemId) ->
    group = Ext.ComponentQuery.query(itemId)
    if group.length
      Ext.ComponentQuery.query(itemId)[0] 

  addCmp: (itemId, className, params={}) ->
    console.log "adding component with id: #{itemId}"
    current = SS.f(itemId)
    if current
      cmp = current
    else
      cmp = Ext.create className, params
    cmp

  helpers:
    vibrate: ->
      if SS.device
        navigator.notification.vibrate(200)

    alert: (title, msg, button, callback=null) ->
      if SS.device
        navigator.notification.alert(msg, callback, title, button)
      else
        Ext.Msg.alert(title, msg, callback)

    fetchUsableTypes: (callback, scope) ->
      if !SS.helpers.hasInternet()
        console.log 'no connection'
        return false

      Ext.Ajax.request
        method: 'GET'
        url: "#{SS.api.endpoints.user.usableTypes}?auth_token=#{SS.user.auth_token}"
        timeout: 30000
        success: (result) =>
          data = JSON.parse result.responseText
          SS.cache.usableTypes = data

          if callback
            callback.call(scope)

        failure: (e) ->
          console.log e

    maskedStart: (message, view) ->
      unless view 
        view = Ext.Viewport
      view.mask
          xtype: 'loadmask'
          message: message
          indicator: true

    maskedStop: (view) ->
      unless view
        view = Ext.Viewport
      view.setMasked false

    activityStart: ->
        if SS.device && !SS.android && navigator.notificationEx
          navigator.notificationEx.activityStart()

    activityStop: ->
        if SS.device && !SS.android && navigator.notificationEx
            navigator.notificationEx.activityStop()

    hasInternet: ->
      if SS.device and (navigator.connection is undefined or navigator.connection.type is "none")
        false
      else
        if navigator and navigator.onLine
          true
        else
          false

    queueUp: (params) ->
      if !params
        console.log 'no params - aborting'
      else
        try
          store = localStorage.getItem 'queue'
          if store
            theQueue = JSON.parse store
          else
            theQueue = []

          theQueue.push params
          localStorage.setItem 'queue', JSON.stringify(theQueue)
        catch error
          console.log error
    
    sendQueue: ->
      store = localStorage.getItem 'queue'

      if !store
        console.log 'no queue'
        return false

      theQueue = JSON.parse store

      for item in theQueue
        theUrl = item.url
        payload = item.payload

        Ext.Ajax.request
          method: 'POST'
          url: theUrl
          params: payload
          timeout: 30000
          success: (result) =>
            console.log 'queued item posted successfully'
            
            # remove from queue - have to do this for each item since ajax is asynchronous
            theQueue.pop item
            localStorage.setItem 'queue', JSON.stringify(theQueue)

          failure: (e) ->
            console.log 'failed to send queued item - requeue'
            
            # return to queue - have to do this for each item since ajax is asynchronous
            SS.helpers.queueUp
              url: theUrl
              payload: payload

    checkConnectivityAndQueue: ->
      if !SS.signedIn or SS.sendingQueue
        return false

      if SS.helpers.hasInternet()
        try
          console.log 'has connection - checking queue'
          
          SS.sendingQueue = true
          
          SS.helpers.sendQueue()
          
          Ext.defer =>
            SS.sendingQueue = false
          , 60000

        catch error
          SS.sendingQueue = false
          console.log error
      else
        SS.sendingQueue = false
        console.log 'no connection - do nothing'
    
    resume: ->
      try
        SS.helpers.checkConnectivityAndQueue()  
      catch error
        console.log error

    adjustDateHandler: (store) ->
      store.on 'load', (store, records, successful, operation, eOpts) ->         
        for rec in records
          date = rec.get('administered_at')
          if date
            adjustedDate = Ext.Date.add(date, Ext.Date.DAY, 1)
            rec.set('administered_at', adjustedDate)

  user: {}
  cache:
    usableTypes: {}
    horses: {}

  signedIn: false
  version: 180
  device: false
  android: false
  sendingQueue: false

  domains:
    prod: 'http://stablesecretary.herokuapp.com'
    staging: 'http://stablesecretary-staging.herokuapp.com'
    dev: 'http://localhost:3000'

  activeDomain: 'http://stablesecretary.herokuapp.com'
  api:
    preface: "/api/v1/"
    endpoints:
      login: null
      user:
        usableTypes: null
        checkSubs: null
      health:
        farrier: null
        worming: null
        dental: null
        medication: null
        general: null
        injury: null
        vaccination: null
        joint: null
        temperature: null
        therapy: null
      service:
        post: null
        destroy: null
      horses:
        index: null
      events:
        index: null
      people:
        index: null

    init: ->
      api = SS.api.endpoints
      api.login = "#{SS.activeDomain}#{SS.api.preface}mobile_logins"

    fullInit: (callback, scope) ->
      api = SS.api.endpoints
      theUser = "users/#{SS.user.id}/"

      api.health.farrier = "#{SS.activeDomain}#{SS.api.preface}farrier_records"
      api.health.dental = "#{SS.activeDomain}#{SS.api.preface}dental_records"
      api.health.medication = "#{SS.activeDomain}#{SS.api.preface}medication_records"
      api.health.joint = "#{SS.activeDomain}#{SS.api.preface}joint_records"
      api.health.injury = "#{SS.activeDomain}#{SS.api.preface}injuries"
      api.health.general = "#{SS.activeDomain}#{SS.api.preface}general_health_records"
      api.health.vaccination = "#{SS.activeDomain}#{SS.api.preface}vaccination_records"
      api.health.worming = "#{SS.activeDomain}#{SS.api.preface}worming_records"
      api.health.therapy = "#{SS.activeDomain}#{SS.api.preface}therapy_records"
      api.health.temperature = "#{SS.activeDomain}#{SS.api.preface}temperatures"

      api.service.post = "#{SS.activeDomain}#{SS.api.preface}#{theUser}service_records"
      api.service.destroy = "#{SS.activeDomain}#{SS.api.preface}service_records"

      api.user.usableTypes = "#{SS.activeDomain}#{SS.api.preface}#{theUser}usable_types"
      api.user.checkSubs = "#{SS.activeDomain}#{SS.api.preface}#{theUser}check_subs"

      api.horses.index = "#{SS.activeDomain}#{SS.api.preface}#{theUser}horses"

      api.events.index = "#{SS.activeDomain}#{SS.api.preface}#{theUser}events"

      api.people.index = "#{SS.activeDomain}#{SS.api.preface}#{theUser}people"
      api.people.add = "#{SS.activeDomain}#{SS.api.preface}people"

      if callback
        callback.call(scope)
      else
        true

  copy:
    noData: "<p class='no-data'>no data retrieved!</p>"
    noEvents: "<p class='no-data'>no events scheduled for next two weeks!</p>"
    noHorses: "<p class='no-data'>you don't have any horses. you can add them via the website!</p>"
    noContacts: "<p class='no-data'>no contacts found. you can add them via the website!</p>"
    noMeds: "<p class='no-data'>no medications found for this horse. add prescriptions to your horses via the Stable Secretary website!</p>"
    noVacs: "<p class='no-data'>no vaccines found. add vaccines to your stable via the Stable Secretary website!</p>"
  templates: {}