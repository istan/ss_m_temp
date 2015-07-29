Ext.define 'stable_mobile.model.Temperature',
    extend: 'Ext.data.Model'
    config: 
        fields: [
            {name: 'id', type: 'int'}
            {name: 'reading', type: 'auto'}
            {name: 'reading_date', type: 'date'}
            {name: 'comments', type: 'auto'}
            {name: 'horse_id', type: 'auto'}
            {name: 'user_id', type: 'auto'}
        ]