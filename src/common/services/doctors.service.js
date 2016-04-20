'use strict';

function doctorsService() {
    function getFirstValid(items, keys) {
        /*
        get first valid item in the array [items]
        valid means:
            - object, array: non empty, has values of one of the [keys]
            - POD: invalid
        items must be objects
        */
        if(!items) return null;
        return _.find( items, function(e){
            if( _.isEmpty(e) ){
                return false;
            }
            if( !_.isEmpty(keys) ){
                for( var i=0; i<keys.length; i++ ){
                    if( Boolean(e[keys[i]]) ){
                        return true;
                    }
                }
                return false;
            }
            return true;
        });
    };

    var service = {
        results: null,
        selectedDoctor: null,

        getDoctors: function () {
            return this.results;
        },

        getSelectedDoctor: function () {
            return this.selectedDoctor;
        },

        setSelectedDoctor: function (doctor) {
            this.selectedDoctor = doctor;
        },

        hasSelectedDoctor: function () {
            return this.getSelectedDoctor() !== null;
        },

        setDoctors: function (results) {
            this.results = results;
        },

        getAddressDoctor: function (doctor) {
            var p = getFirstValid(doctor.practices);
            var a = p ? getFirstValid(p.addresses, ['formatted', 'raw']) : null;
            return a;
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
                    rating: function(x) { var r = getFirstValid(x); return r ? r.rating : 0; }(doctor.ratings),
                    id: doctor.id,
                    address: self.getAddressDoctor(doctor),
                    bio: doctor.profile.bio ? doctor.profile.bio.substr(0, 155) + '...' : '',
                    title: doctor.profile.title,
                    image_url: function(x) { var r = getFirstValid(x); return r ? r.image : ''; }(doctor.profile.images),
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
    .service('doctorsService', doctorsService);
