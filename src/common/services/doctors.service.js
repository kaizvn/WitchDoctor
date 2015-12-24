"use strict";

function DoctorsService() {

    var service = {
        results: null,

        getDoctors: function () {
            return this.results;
        },

        setDoctors: function (results) {
            this.results = results;
        },

        getAddressDoctor: function (doctor) {
            if (doctor.practices) {
                var found = false;
                for (var i = 0; i < doctor.practices.length && !found; i++) {
                    if (doctor.practices[i].address && doctor.practices[i].address.raw) {
                        found = true;
                        return doctor.practices[i].address;
                    }
                }
            }
        },

        getRelatedDoctors: function (doctors, id) {
            var relatedDoctors = _.reject(doctors, function (doctor) {
                return doctor.id === id;
            });
            return _.sample(relatedDoctors, 3);
        },

        formatDoctorsData: function (doctors) {
            var self = this;
            doctors.results = _.map(doctors.results, function (doctor) {
                return {
                    full_name: doctor.profile.name,
                    specialties: _.pluck(doctor.specialties, 'name').join(' | '),
                    rating: doctor.ratings.length > 0 ? doctor.ratings[0].rating : 0,
                    id: doctor.id,
                    address: self.getAddressDoctor(doctor),
                    bio: doctor.profile.bio ? doctor.profile.bio.substr(0, 155) + '...' : '',
                    title: doctor.profile.title,
                    image_url: doctor.profile.images && doctor.profile.images.length > 0 ? doctor.profile.images[0].image : '',
                    gender: doctor.profile.gender
                }
            });
            return doctors;
        }
    };

    return service;
}

angular
    .module('iDocApp')
    .service('DoctorsService', DoctorsService);