(function() {
  Ext.define("stable_mobile.view.record.Show", {
    extend: "Ext.Container",
    controller: 'stable_mobile.controller.record.ShowViewController',
    requires: ['stable_mobile.controller.record.ShowViewController'],
    config: {
      cls: 'record-show',
      masked: false,
      loadingText: false,
      items: [
        {
          xtype: 'container',
          itemId: 'recordContent',
          padding: 10,
          tpl: "<p>\n	<b>Date:</b> {[Ext.Date.format(values.administered_at, 'm/d/Y')]}\n	<br />\n	<b>Type:</b> {body}\n	<br />\n	<tpl if=\"person\">\n		<b>Administered by:</b> {person.first} {person.last}\n		<br />\n	</tpl>\n	<tpl if=\"dosage\">\n		<b>Dosage:</b> {dosage} {dosage_unit}, {dose_type}\n		<br />\n	</tpl>\n	<tpl if=\"dosage_cost\">\n		<b>Dosage cost:</b> ${dosage_cost}\n		<br />\n	</tpl>\n	<tpl if=\"markup\">\n		<b>Service fee:</b> ${markup}\n		<br />\n	</tpl>\n	<tpl if=\"price\">\n		<b>Price:</b> ${price}\n		<br />\n	</tpl>\n	<br />\n	<tpl if=\"comments\">\n		<b>Notes:</b> \n		<br />\n		{comments}\n	</tpl>\n</p>"
        }, {
          xtype: 'container',
          padding: 30,
          items: [
            {
              xtype: 'button',
              text: 'Edit',
              itemId: 'editBtn',
              margin: '0 0 20 0'
            }, {
              xtype: 'button',
              text: 'Delete',
              itemId: 'deleteBtn',
              margin: '0 0 20 0'
            }
          ]
        }
      ]
    }
  });

}).call(this);
