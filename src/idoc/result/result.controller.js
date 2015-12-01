"use strict";


function ResultCtrl($scope, $state, $stateParams, IdocRestService, $localStorage, $sessionStorage) {

    var $storage = $sessionStorage;
    $scope.results = [];

    var params = ($stateParams.query)
        ? $stateParams
        : JSON.parse($storage.lastSearchTerm || '{}');

    if (params.query) {
        IdocRestService.getDoctors({}).then(function (response) {
            $scope.results = response.data.data.map(function (doctor) {
                return {
                    full_name: [doctor.profile.first_name, doctor.profile.middle_name, doctor.profile.last_name].join(' '),
                    specialties: _.pluck(doctor.specialties, 'name').join(' | '),
                    rating: doctor.ratings.map(function (rate) {
                        return {
                            provider: rate.provider,
                            provider_uid: rate.provider_uid,
                            review_count: rate.review_count,
                            rating: rate.rating,
                            image_url_small: rate.image_url_small
                        }
                    }),
                    uid: doctor.uid,
                    npi: doctor.npi,
                    visit_address: _.pluck(doctor.practices, 'visit_address'),
                    bio: doctor.profile.bio.substr(0, 155) + '...',
                    title: doctor.profile.title,
                    image_url: doctor.profile.image_url,
                    gender: doctor.profile.gender

                }
            });

            $storage.lastSearchTerm = JSON.stringify(params);

        }, function (error) {
            console.trace(error);
        });
    }

}


ResultCtrl.$inject = ['$scope', '$state', '$stateParams', 'IdocRestService', '$localStorage', '$sessionStorage'];

angular.module('iDocApp').controller('ResultCtrl', ResultCtrl);