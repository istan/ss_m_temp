(function() {
  Ext.define("stable_mobile.view.contact.Show", {
    extend: "Ext.Container",
    controller: 'stable_mobile.controller.contact.ShowViewController',
    requires: ['stable_mobile.controller.contact.ShowViewController'],
    config: {
      masked: false,
      cls: 'contact-show',
      itemId: 'contactShow',
      scrollable: true,
      title: 'person',
      items: [
        {
          xtype: 'container',
          itemId: 'contactTop',
          cls: 'contact-top',
          html: "<p>loading</p>",
          padding: 10,
          tpl: "<h1 style=\"font-size: 22px;\">{name}</h1>\n<h4 style='font-size: 14px;'><b>{roles}</b></h4>\n<tpl if='address'>\n	<br />\n	<h4 style='font-size: 12px'>{address}</h4>\n	<br />\n</tpl>\n<tpl if='social_security_number'>\n	<h4 style='font-size: 12px'>\n		<b>SS#</b>\n		{social_security_number}\n	</h4>\n</tpl>\n<tpl if='date_of_birth'>\n	<h4 style='font-size: 12px'>\n		<b>DOB:</b>\n		{date_of_birth:date('m/d/Y')}\n	</h4>\n</tpl>"
        }, {
          xtype: 'container',
          itemId: 'contactBtns',
          cls: 'contact-btns',
          style: 'border-bottom: 1px solid #ddd',
          padding: 30,
          items: [
            {
              xtype: 'button',
              text: 'Call',
              itemId: 'callBtn',
              margin: '0 0 20 0',
              hidden: true
            }, {
              xtype: 'button',
              text: 'Text',
              itemId: 'textBtn',
              margin: '0 0 20 0',
              hidden: true
            }, {
              xtype: 'button',
              text: 'Email',
              itemId: 'emailBtn',
              ui: 'action',
              margin: '0 0 0 0',
              hidden: true
            }
          ]
        }, {
          xtype: 'container',
          itemId: 'contactBottom',
          cls: 'contact-info',
          padding: 10,
          tpl: "\n<tpl if='company_name'>\n	<h4>{company_name}</h4>\n</tpl>\n<tpl if='website'>\n	<h4><a href=\"{website}\" target=\"_blank\">{website}</a></h4>\n</tpl>\n<br />\n<tpl if='usef_number'>\n	<h4><b>USEF #:</b> {usef_number}</h4>\n</tpl>\n<tpl if='fei_number'>\n	<h4><b>FEI #:</b> {fei_number}</h4>\n</tpl>\n<tpl if='fei_renewal_date'>\n	<h4><b>FEI renewal date:</b> {fei_renewal_date:date('m/d/Y')}</h4>\n</tpl>\n<tpl if='passport_number'>\n	<h4><b>Passport #:</b> {passport_number}</h4>\n</tpl>\n<tpl if='passport_renewal_date'>\n	<h4><b>Passport renewal date:</b> {passport_renewal_date:date('m/d/Y')}</h4>\n</tpl>\n\n<tpl if='home_phone'>\n	<h4><b>Home phone:</b>{home_phone}</h4>\n</tpl>\n<tpl if='cell_phone'>\n	<h4><b>Work phone:</b>{cell_phone}</h4>\n</tpl>\n<tpl if='fax_number'>\n	<h4><b>Fax number:</b> {fax_number}</h4>\n</tpl>\n\n<tpl if='comments'>\n	<br />\n	<h4><b>Comments:</b> <br />{comments}</h4>\n</tpl>"
        }
      ]
    }
  });

}).call(this);
