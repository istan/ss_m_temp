(function() {
  Ext.define("stable_mobile.view.health.Index", {
    extend: 'Ext.Container',
    controller: 'stable_mobile.controller.health.IndexViewController',
    requires: ['stable_mobile.controller.health.IndexViewController'],
    config: {
      itemId: 'health',
      title: 'Health',
      cls: 'btn-grouped ui-rd-soft ui-margin',
      scrollable: {
        direction: 'vertical',
        directionLock: true
      },
      items: [
        {
          xtype: 'container',
          height: 450,
          padding: 20,
          items: [
            {
              xtype: 'button',
              docked: 'top',
              cls: 'btn btn-seg',
              text: 'Farrier',
              itemId: 'farrierBtn',
              pressedCls: 'pressedBtn'
            }, {
              xtype: 'button',
              docked: 'top',
              cls: 'btn btn-seg',
              text: 'Worming',
              itemId: 'wormingBtn',
              pressedCls: 'pressedBtn'
            }, {
              xtype: 'button',
              docked: 'top',
              cls: 'btn btn-seg',
              text: 'Medication',
              itemId: 'medicationBtn',
              pressedCls: 'pressedBtn'
            }, {
              xtype: 'button',
              docked: 'top',
              cls: 'btn btn-seg',
              text: 'Joint Injection',
              itemId: 'jointBtn',
              pressedCls: 'pressedBtn'
            }, {
              xtype: 'button',
              docked: 'top',
              cls: 'btn btn-seg',
              text: 'Vaccination',
              itemId: 'vaccinationBtn',
              pressedCls: 'pressedBtn'
            }, {
              xtype: 'button',
              docked: 'top',
              cls: 'btn btn-seg',
              text: 'Dental',
              itemId: 'dentalBtn',
              pressedCls: 'pressedBtn'
            }, {
              xtype: 'button',
              docked: 'top',
              cls: 'btn btn-seg',
              text: 'Therapy',
              itemId: 'therapyBtn',
              pressedCls: 'pressedBtn'
            }, {
              xtype: 'button',
              docked: 'top',
              cls: 'btn btn-seg',
              text: 'Injury',
              itemId: 'injuryBtn',
              pressedCls: 'pressedBtn'
            }, {
              xtype: 'button',
              docked: 'top',
              cls: 'btn btn-seg',
              text: 'General',
              itemId: 'otherBtn',
              pressedCls: 'pressedBtn'
            }
          ]
        }
      ]
    }
  });

}).call(this);
