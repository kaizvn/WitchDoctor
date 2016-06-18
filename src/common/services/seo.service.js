'use strict';

function seoService($q, $translate, MetaTags) {
    /*
    The flow is:
    - metas (only placeholders) pulled in from states in ui-router
    - translated metas pulled from partial loader
    - metas update DOM metas
    As we need to plug additional data (typically from controllers) in the second step,
    we need to cut steps and do all 3 steps here
    */

    function addTitleBoilers(s){
        // refer to ui-router-metas to 
        return MetaTags.UIRouterMetatags.prefix
            + s
            + MetaTags.UIRouterMetatags.suffix;
    }
    return {
        update : function(data){
            if(data){
                $q.all([
                    $translate(MetaTags.title, data),
                    $translate(MetaTags.description, data),
                ]).then(function(resolvedData){
                    MetaTags.title = addTitleBoilers(resolvedData[0]);
                    MetaTags.description = addTitleBoilers(resolvedData[1]);
                });
            }
        }
    };

}

angular
    .module('iDocApp')
    .service('seoService', ['$q', '$translate', 'MetaTags', seoService]);