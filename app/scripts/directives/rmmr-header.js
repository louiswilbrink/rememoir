'use strict';

angular.module('rememoirApp')
  .directive('rmmrHeader', function () {
    return {
      templateUrl: 'views/rmmr-header.html',
      restrict: 'E',
      controller: ['$scope', '$location', '$timeout', '$modal', '$log', 'User', 'RemIO', function ($scope, $location, $timeout, $modal, $log, User, RemIO) {

        var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

          $scope.items = items;
          $scope.selected = {
            item: $scope.items[0]
          };

          $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        };

        $scope.user = {
          
          // Model

          // Pull email from User service.
          // If service hasn't yet loaded an initial value, oh well.
          email: User.email(),

          // API
        
          logout: function () {

            RemIO.logout();
          },
          
          deleteAccount: function () {

          },

          items: ['item1', 'item2', 'item3'],

          open: function (size) {

            var modalInstance = $modal.open({
              templateUrl: 'myModalContent.html',
              controller: ModalInstanceCtrl,
              size: size,
              resolve: {
                items: function () {
                  return $scope.items;
                }
              }
            });

            modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
          },
        };
        // Event handlers

        $scope.$on('EmailUpdated', function () {
          $scope.$apply(function () {
            $scope.user.email = User.email();
          });
        });
      }]
    };
  });
