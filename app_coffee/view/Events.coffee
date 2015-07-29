Ext.define "stable_mobile.view.Events",
    extend: 'Ext.navigation.View'

    controller: 'stable_mobile.controller.EventsViewController'

    requires: [
        'stable_mobile.controller.EventsViewController'
        'Ext.plugin.PullRefresh'
    ]
    
    config:
        itemId: 'events'
        layout:
            type: 'card'
            animation:
                duration: 100,
                easing: 'ease-out',
                type: 'slide',
                direction: 'left'
        navigationBar:
            items: []
        items: [
            xclass: "stable_mobile.view.event.List"
            title: 'Events'
            plugins: [
                    xclass: 'Ext.plugin.PullRefresh'
                    pullText: 'Pull to refresh'
                    refreshFn: (plugin) ->
                        list = plugin.getList()
                        list.getStore()?.doRefresh(list)
                ]
        ]