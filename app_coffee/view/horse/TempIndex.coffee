Ext.define "stable_mobile.view.horse.TempIndex",
    extend: 'Ext.Container'

    controller: 'stable_mobile.controller.horse.TempIndexViewController'
    requires: ['stable_mobile.controller.horse.TempIndexViewController']
    
    config:
        itemId: 'temperatures'
        fullscreen: true
        scrollable: true
        title: 'Recent Temps'
        items: [
            xclass: "stable_mobile.view.horse.TempList"
            scrollable: null
            padding: 0
        ]