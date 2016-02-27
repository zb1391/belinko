beforeEach(angular.mock.module("app"))

describe('FacebookHelper',function(){
  var Alerts, AlertsFactory, scope, count;
  beforeEach(inject(function(_Alerts_,_AlertsFactory_){
    Alerts = _Alerts_;
    AlertsFactory = _AlertsFactory_;
  }));

  describe('getAlerts',function(){
    it('returns the AlertsFactory',function(){
      expect(Alerts.getAlerts()).toEqual(AlertsFactory);
    });
  });

  describe('addAlert',function(){
    beforeEach(function(){
      count = AlertsFactory.length;
    });

    it('appends to the AlertsFactory',function(){
      Alerts.addAlert();
      expect(AlertsFactory.length).toEqual(count+1);
    });
  });

  describe('closeAlert',function(){
    beforeEach(function(){
      Alerts.addAlert({});
      count = AlertsFactory.length;
    });

    it('removes from the AlertsFactory',function(){
      Alerts.closeAlert(0);
      expect(AlertsFactory.length).toEqual(count-1);
    });
  });
});
