"use strict";


function homeController($scope, $state, IdocRestService, $timeout, $http) {
    $scope.content = 'Home';
    $scope.querySearch = '';
    $scope.location = '';
    var timeoutId = 0;

    $scope.fetchData = function (value) {
        if (value.trim() === '') return [];
        return IdocRestService.getAutocompleteTags(value).then(function (response) {
            var info = response.data.data;
            var d = _.filter(info, function (inf) {
                if (typeof inf !== 'string') return false;

                return inf.toUpperCase().indexOf(value.toUpperCase()) >= 0;
            });
            console.log(d);
            return d;

            //return response.data.map(function (item) {
            //    return item;
            //});
        })
    };

    $scope.tags = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


    $scope.doSearch = function () {
        console.log('aaa');
        $state.go('result', {query: $scope.querySearch, location: $scope.location});
    };

    $scope.$on(
        "$destroy",
        function () {
            timeoutId && $timeout.cancel(timeoutId);
        });
}


homeController.$inject = ['$scope', '$state', 'IdocRestService', '$timeout', '$http'];

angular.module('iDocApp').controller('HomeCtrl', homeController);

