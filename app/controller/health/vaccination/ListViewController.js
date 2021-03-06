(function() {
  Ext.define("stable_mobile.controller.health.vaccination.ListViewController", {
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
      console.log('do finish');
      if (this.form) {
        values = this.form.getValues();
        record.data.price = values.price;
        return this.form.hide();
      }
    },
    onFormCancel: function(record) {
      console.log('do cancel');
      if (this.form) {
        this.form.hide();
        return this.getView().deselect(record);
      }
    },
    onItemTap: function(dataview, index, target, record) {
      var isSelected, tapped, theList;
      theList = this.getView();
      isSelected = theList.isSelected(record);
      tapped = record.data;
      if (isSelected) {
        this.form = Ext.create('Ext.form.Panel', {
          centered: true,
          modal: true,
          hideOnMaskTap: false,
          width: '80%',
          height: '50%',
          items: [
            {
              xtype: 'textfield',
              label: 'Price ($)',
              name: 'price'
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
        this.form.setValues(record.data);
        return Ext.Viewport.add(this.form);
      }
    }
  });

}).call(this);
