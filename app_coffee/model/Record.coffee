Ext.define 'stable_mobile.model.Record',
    extend: 'Ext.data.Model'
    config: 
        fields: [
            {name: 'id', type: 'int'}
            {name: 'horse_id', type: 'int'}
            {name: 'body', type: 'string'}
            {name: 'administered_at', type: 'date'}
            {name: 'klass', type: 'auto'}
            {name: 'person', type: 'auto'}
            {name: 'comments', type: 'auto'}
            {name: 'dosage', type: 'auto'}
            {name: 'dosage_unit', type: 'auto'}
            {name: 'dose_type', type: 'auto'}
            {name: 'dosage_cost', type: 'auto'}
            {name: 'markup', type: 'auto'}
            {name: 'type_id', type: 'auto'}
            {name: 'person_id', type: 'auto'}
            {name: 'price', type: 'auto'}
            {name: 'order', type: 'auto'}
        ]