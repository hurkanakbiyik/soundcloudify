(function() {
    'use strict';

    angular.module('soundCloudify')
            .directive('playingTrackAware', playinTrackAwareDirective);

    function playinTrackAwareDirective($timeout) {

        return {
            restrict: 'A',
            scope: {
            },
            require: '^corePlayer',
            transclude: true,
            template: '<div ng-transclude></div>',
            link : function($scope, $element, attrs, player) {
                $scope.player = player;

                $scope.$on('componentDidUpdate', function() {
                    updateActiveTrack(player.state.currentTrack);
                });

                $scope.$watch('player.state.currentTrack', function(currentTrack) {
                    updateActiveTrack(currentTrack);
                }, true);

                $scope.$watch('player.state.playing', function(status) {
                    updateActiveTrack(player.state.currentTrack);
                }, true);

                function updateActiveTrack(track) {
                    angular.element($element[0].querySelector('.playing, .pause')).removeClass('playing pause');

                    var cssClass = 'playing';
                    
                    if (!player.state.playing) {
                        cssClass = 'pause';
                    }
                    
                    angular.element($element[0].querySelector('#track-item-' + track.id)).addClass(cssClass);
                }
            }
        };
    };
}());