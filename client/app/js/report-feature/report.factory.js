(function() {
  'use strict';

  angular
    .module('fleetkeep')
    .factory('ReportFactory', ReportFactory);

    ReportFactory.$inject = ['$http', '$window'];

    function ReportFactory($http, $window) {
      const url = 'http://localhost:3000/';

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

        getTruckDamage: function(id) {
          //get damages for the truck id
          return $http.get(url + '/report/damage/' + id).then( (data)=> {
            return data;
          })
        },

        markDamage: function(damageReport) {
          //should open modal first on front end, then form for entering damage info
        },

        submitReport: function(report, user, damages) {
          report.driver_id = parseInt(user);
          damages.driver_id = parseInt(user);

          return $http.post(url + 'report', report).then( (data) => {
            if(damages.length){
              //loop through array of objects
              //make each damage report
              //http post for each
              damages.report_id = data.data[0];
              console.log(damages);
              return $http.post(url + 'report/damages', damages).then( (data) => {
                console.log('we have damages! ' + data);
                return data;
              })
            } else {
              console.log('else ' + data);
              return data;
            }
          });
        }
      }
    }

})();
