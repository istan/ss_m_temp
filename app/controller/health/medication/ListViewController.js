(function() {
  Ext.define("stable_mobile.controller.health.medication.ListViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      view: {
        listeners: {
          itemtap: 'onItemTap',
          erased: 'onErased'
        }
      }
    },
    onErased: function() {
      var view;
      view = this.getView();
      if (view.hasSelection()) {
        return view.deselectAll(true);
      }
    },
    onFormDone: function(record) {
      var values;
      if (this.form) {
        values = this.form.getValues();
        if (values.dose_type === 0 || values.dosage_unit === 0) {
          SS.helpers.alert('Whoops!', 'Please include Units and Type', 'OK');
          return;
        }
        record.data.dosage = values.dosage;
        record.data.dosage_cost = values.dosage_cost;
        record.data.dosage_unit = values.dosage_unit;
        record.data.dose_type = values.dose_type;
        record.data.markup = values.markup;
        record.data.comments = values.comments;
        record.data.person_id = values.person_id;
        return this.form.hide();
      }
    },
    onFormCancel: function(record) {
      if (this.form) {
        this.form.hide();
        return this.getView().deselect(record);
      }
    },
    onItemTap: function(dataview, index, target, record) {
      var contactsStore, isSelected, opts, select, tapped, theList;
      theList = this.getView();
      isSelected = theList.isSelected(record);
      tapped = record.data;
      if (isSelected) {
        this.form = Ext.create('Ext.form.Panel', {
          centered: true,
          modal: true,
          hideOnMaskTap: false,
          width: '98%',
          height: '90%',
          defaults: {
            labelWidth: '35%'
          },
          items: [
            {
              xtype: 'numberfield',
              label: 'Dosage',
              name: 'dosage'
            }, {
              xtype: 'selectfield',
              label: 'Units',
              name: 'dosage_unit',
              options: [
                {
                  text: '',
                  value: 0
                }, {
                  text: 'vial',
                  value: 'vial'
                }, {
                  text: 'scoop',
                  value: 'scoop'
                }, {
                  text: 'cc',
                  value: 'cc'
                }, {
                  text: 'dose',
                  value: 'dose'
                }, {
                  text: 'g',
                  value: 'g'
                }, {
                  text: 'pill',
                  value: 'pill'
                }, {
                  text: 'tube',
                  value: 'tube'
                }, {
                  text: 'other',
                  value: 'other'
                }
              ]
            }, {
              xtype: 'selectfield',
              label: 'Type',
              name: 'dose_type',
              options: [
                {
                  text: '',
                  value: 0
                }, {
                  text: 'injectible IV',
                  value: 'injectible IV'
                }, {
                  text: 'injectible IM',
                  value: 'injectible IM'
                }, {
                  text: 'powder',
                  value: 'powder'
                }, {
                  text: 'paste',
                  value: 'paste'
                }, {
                  text: 'pill',
                  value: 'pill'
                }, {
                  text: 'subcutaneous injection',
                  value: 'subcutaneous injection'
                }, {
                  text: 'other',
                  value: 'other'
                }
              ]
            }, {
              xtype: 'numberfield',
              label: 'Dose cost ($)',
              name: 'dosage_cost'
            }, {
              xtype: 'numberfield',
              label: 'Service fee ($)',
              name: 'markup'
            }, {
              xtype: 'textareafield',
              label: 'Notes',
              name: 'comments'
            }, {
              xtype: "selectfield",
              itemId: "administeredByField",
              label: "Provider",
              name: "person_id",
              displayField: 'name',
              valueField: 'id'
            }, {
              xtype: 'button',
              text: 'DONE',
              margin: '20 0',
              listeners: {
                tap: (function(_this) {
                  return function() {
                    return _this.onFormDone(record);
                  };
                })(this)
              }
            }, {
              xtype: 'button',
              text: 'cancel',
              margin: '10 0',
              listeners: {
                tap: (function(_this) {
                  return function() {
                    return _this.onFormCancel(record);
                  };
                })(this)
              }
            }
          ]
        });
        contactsStore = Ext.getStore('contactsStore');
        opts = contactsStore.returnRole();
        select = this.form.down('#administeredByField');
        if (select) {
          select.setOptions(opts);
          select.setValue(0);
        }
        this.form.setValues(record.data);
        return Ext.Viewport.add(this.form);
      }
    }
  });

}).call(this);
