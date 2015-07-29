Ext.define "stable_mobile.view.record.Show",
	extend: "Ext.Container"

	controller: 'stable_mobile.controller.record.ShowViewController'
	requires: ['stable_mobile.controller.record.ShowViewController']

	config:
		cls: 'record-show'
		masked: false
		loadingText: false
		items: [
			xtype: 'container'
			itemId: 'recordContent'
			padding: 10
			tpl: """
				<p>
					<b>Date:</b> {[Ext.Date.format(values.administered_at, 'm/d/Y')]}
					<br />
					<b>Type:</b> {body}
					<br />
					<tpl if="person">
						<b>Administered by:</b> {person.first} {person.last}
						<br />
					</tpl>
					<tpl if="dosage">
						<b>Dosage:</b> {dosage} {dosage_unit}, {dose_type}
						<br />
					</tpl>
					<tpl if="dosage_cost">
						<b>Dosage cost:</b> ${dosage_cost}
						<br />
					</tpl>
					<tpl if="markup">
						<b>Service fee:</b> ${markup}
						<br />
					</tpl>
					<tpl if="price">
						<b>Price:</b> ${price}
						<br />
					</tpl>
					<br />
					<tpl if="comments">
						<b>Notes:</b> 
						<br />
						{comments}
					</tpl>
				</p>
			"""
		,
			xtype: 'container'
			padding: 30
			items: [
				xtype: 'button'
				text: 'Edit'
				itemId: 'editBtn'
				margin: '0 0 20 0'
			,
				xtype: 'button'
				text: 'Delete'
				itemId: 'deleteBtn'
				margin: '0 0 20 0'
			]
		]