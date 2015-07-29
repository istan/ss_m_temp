Ext.define "stable_mobile.view.Contacts",
    extend: 'Ext.navigation.View'

    controller: 'stable_mobile.controller.ContactsViewController'
    
    requires: [
        'stable_mobile.controller.ContactsViewController'
        'Ext.plugin.PullRefresh'
    ]
    
    config:
        itemId: 'contacts'
        layout:
            type: 'card'
            animation:
                duration: 100,
                easing: 'ease-out',
                type: 'slide',
                direction: 'left'
        navigationBar:
            items: [
                xtype: 'button'
                text: 'Add'
                align: 'right'
                itemId: 'addContactBtn'
            ]
        items: [
            xclass: "stable_mobile.view.contact.List"
            title: 'People'
            plugins: [
                    xclass: 'Ext.plugin.PullRefresh'
                    pullText: 'Pull to refresh'
                    refreshFn: (plugin) ->
                        list = plugin.getList()
                        list.getStore()?.doRefresh(list)
                ]
        ]