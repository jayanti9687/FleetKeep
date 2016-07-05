(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('ReportFactory', ReportFactory);

    ReportFactory.$inject = ['$http', '$window'];

    function ReportFactory($http, $window) {
      const url = 'http://fleetkeep.herokuapp.com/';

      return {
        getUser: function() {
          let user = $window.localStorage.getItem('user');
          return user;
        },

        getVehicles: function() {
          return $http.get(url + 'report/vehicles/all').then( (data) => {
            return data.data;
          });
        },

        getTruckImage: function(call) {
          return $http.get(url + 'report/vehicles/' + call).then( (data) => {
            return data;
          });
        },

        getTruckDamage: function(call) {
          return $http.get(url + 'report/damages/truck/' + call).then( (data)=> {
            return data.data;
          })
        },

        submitReport: function(report, user, damages) {
          report.driver_id = parseInt(user);
          console.log(damages);

          return $http.post(url + 'report', report).then( (data) => {
            for(var i = 0; i < damages.length; i++) {
              damages[i].report_id = data.data[0];

              $http.post(url + 'report/damages', damages[i]).then( (data) => {
                return data;
              })
            }
            return data;
          });
        }
      }
    }

})();
