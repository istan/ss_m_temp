(function() {
  Ext.define("stable_mobile.controller.health.IndexViewController", {
    extend: "Deft.mvc.ViewController",
    control: {
      farrierBtn: {
        listeners: {
          tap: 'onFarrierBtn'
        }
      },
      wormingBtn: {
        listeners: {
          tap: 'onWormingBtn'
        }
      },
      medicationBtn: {
        listeners: {
          tap: 'onMedicationBtn'
        }
      },
      jointBtn: {
        listeners: {
          tap: 'onJointBtn'
        }
      },
      vaccinationBtn: {
        listeners: {
          tap: 'onVaccinationBtn'
        }
      },
      dentalBtn: {
        listeners: {
          tap: 'onDentalBtn'
        }
      },
      therapyBtn: {
        listeners: {
          tap: 'onTherapyBtn'
        }
      },
      injuryBtn: {
        listeners: {
          tap: 'onInjuryBtn'
        }
      },
      otherBtn: {
        listeners: {
          tap: 'onOtherBtn'
        }
      }
    },
    init: function() {},
    onFarrierBtn: function() {
      var horse, navView;
      navView = this.getView().up('navigationview');
      horse = this.getView().getData();
      if (navView) {
        return navView.push(SS.addCmp("#farrierForm", "stable_mobile.view.health.form.Farrier", {
          personType: 'farrier',
          endpoint: 'farrier',
          horseId: horse.id
        }));
      }
    },
    onWormingBtn: function() {
      var horse, navView;
      navView = this.getView().up('navigationview');
      horse = this.getView().getData();
      if (navView) {
        return navView.push(SS.addCmp("#wormingForm", "stable_mobile.view.health.form.Worming", {
          personType: 'veterinarian',
          endpoint: 'worming',
          usableType: 'wormer_types',
          horseId: horse.id
        }));
      }
    },
    onTherapyBtn: function() {
      var horse, navView;
      navView = this.getView().up('navigationview');
      horse = this.getView().getData();
      if (navView) {
        return navView.push(SS.addCmp("#therapyForm", "stable_mobile.view.health.form.Therapy", {
          endpoint: 'therapy',
          usableType: 'therapy_types',
          horseId: horse.id
        }));
      }
    },
    onMedicationBtn: function() {
      var horse, horseId, navView, scripts;
      navView = this.getView().up('navigationview');
      horse = this.getView().getData();
      horseId = horse.id;
      console.log(horseId);
      if ((SS.cache.horses[horseId] != null) && (SS.cache.horses[horseId].prescriptions != null)) {
        scripts = SS.cache.horses[horseId].prescriptions;
      } else {
        scripts = horse.prescriptions;
      }
      if (navView) {
        return navView.push(SS.addCmp("#medciations", "stable_mobile.view.health.medication.Index", {
          horseId: horse.id,
          prescriptions: scripts
        }));
      }
    },
    onJointBtn: function() {
      var horse, navView;
      navView = this.getView().up('navigationview');
      horse = this.getView().getData();
      if (navView) {
        return navView.push(SS.addCmp("#jointForm", "stable_mobile.view.health.form.Joint", {
          personType: 'veterinarian',
          endpoint: 'joint',
          usableType: 'joint_injection_types',
          horseId: horse.id
        }));
      }
    },
    onVaccinationBtn: function() {
      var horse, navView;
      navView = this.getView().up('navigationview');
      horse = this.getView().getData();
      if (navView) {
        return navView.push(SS.addCmp("#vaccinations", "stable_mobile.view.health.vaccination.Index", {
          horseId: horse.id
        }));
      }
    },
    onDentalBtn: function() {
      var horse, navView;
      navView = this.getView().up('navigationview');
      horse = this.getView().getData();
      if (navView) {
        return navView.push(SS.addCmp("#dentalForm", "stable_mobile.view.health.form.Dental", {
          personType: 'dentist',
          endpoint: 'dental',
          horseId: horse.id
        }));
      }
    },
    onInjuryBtn: function() {
      var horse, navView;
      navView = this.getView().up('navigationview');
      horse = this.getView().getData();
      if (navView) {
        return navView.push(SS.addCmp("#injuryForm", "stable_mobile.view.health.form.Injury", {
          endpoint: 'injury',
          usableType: 'injury_types',
          horseId: horse.id
        }));
      }
    },
    onOtherBtn: function() {
      var horse, navView;
      navView = this.getView().up('navigationview');
      horse = this.getView().getData();
      if (navView) {
        return navView.push(SS.addCmp("#otherForm", "stable_mobile.view.health.form.Other", {
          endpoint: 'general',
          horseId: horse.id
        }));
      }
    }
  });

}).call(this);
