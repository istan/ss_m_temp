Ext.define "stable_mobile.view.Horses",
    extend: 'Ext.navigation.View'

    controller: 'stable_mobile.controller.HorsesViewController'
    
    requires: [
        'stable_mobile.controller.HorsesViewController'
        'Ext.plugin.PullRefresh'
    ]
    
    config:
        layout:
            type: 'card'
            animation:
                duration: 100,
                easing: 'ease-out',
                type: 'slide',
                direction: 'left'
        itemId: 'horses'
        navigationBar:
            items: [
                xtype: 'button'
                text: 'Add'
                align: 'right'
                itemId: 'addHorseBtn'
            ]
        items: [
            xclass: "stable_mobile.view.horse.List"
            title: 'Horses'
            plugins: [
                    xclass: 'Ext.plugin.PullRefresh'
                    pullText: 'Pull to refresh'
                    refreshFn: (plugin) ->
                        list = plugin.getList()
                        list.getStore()?.doRefresh(list)
                ]
        ]