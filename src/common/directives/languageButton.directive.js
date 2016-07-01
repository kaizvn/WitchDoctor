'use strict';
// <a href="javascript:void(0)" ng-click="changeLanguage('vi')" ng-show="getCurrentLanguage()!=='vi'">{{'home.menu.vietnamese' | translate}}</a></li>
// <li><a language-button="en" path="home.menu.english"></a></li>
angular.module('iDocApp')
    .directive('languageButton', function ($translate, $translatePartialLoader, $rootScope) {
        return {
            restrict: 'A',
            priority:1001, // compiles first

            compile: function(el, attrs){
                var path = attrs['path'];
                var langKey = attrs['languageButton'];
                el.text("{{'" + path + '.' + langKey + "' | translate}}");
                el.attr('href', 'javascript:void(0)');
                ['path', 'language-button'].forEach(function(a){
                    el.removeAttr(a);
                });
                return this.link;
            },

            scope:{
                langKey: '@languageButton'
            },

            link: function(scope, el) {
                el.on('click', function(){
                    $translate.use(scope.langKey);
                });

                var deregister = $rootScope.$on('$translateChangeSuccess', function () {
                    var lang = $translate.use();
                    if(lang === scope.langKey){
                        el.addClass('ng-hide');
                    }else{
                        el.removeClass('ng-hide');
                    }
                });

                scope.$on('$destroy', deregister); //gc
            }
        };
    });