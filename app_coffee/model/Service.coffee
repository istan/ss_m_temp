Ext.define 'stable_mobile.model.Service',
    extend: 'Ext.data.Model'
    config:
        fields: [
            {name: 'id', type: 'int'}
            {name: 'name', type: 'auto'}
            {name: 'price', type: 'auto'}
            {name: 'category', type: 'auto'}
            {name: 'deleted', type: 'boolean'}
        ]