'use strict';
angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
        
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;       

        $scope.dishes = menuFactory.getDishes();  

        $scope.select = function(setTab) {
            $scope.tab = setTab;
            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };

    }])

  .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
    
        var dish= menuFactory.getDish(parseInt($stateParams.id,10));

        $scope.dish = dish;

        $scope.filter = '';
        $scope.filtText = '';

        $scope.setFilter = function(setFilter){
         
          $scope.filter = setFilter;

          if(setFilter === 'date')
            $scope.filtText = "date";
          else if(setFilter === '-date')
            $scope.filtText = "-date";
          else if(setFilter === 'author')
            $scope.filtText = "author";
          else if(setFilter === '-author')
            $scope.filtText = "-author";
          else if(setFilter === 'rating')
            $scope.filtText = "rating";
          else if(setFilter === '-rating')
            $scope.filtText = "-rating";
          else
            $scope.filtText = "";

          console.log($scope.filtText);
          console.log($scope.filter);

        }
    
    }])

   .controller('DishCommentController', ['$scope', function($scope) {

        //Step 1: Create a JavaScript object to hold the comment from the form
        $scope.newComment = {
          author  : "",
          rating  : 5,
          comment : "",
          date    : ""
        };
          
        $scope.submitComment = function () {             
          
          //Step 2: This is how you record the date 
          $scope.newComment.date = new Date().toISOString();
          
          // Step 3: Push your comment into the dish's comment array
          $scope.dish.comments.push($scope.newComment);
          console.log($scope.newComment);
          
          //Step 4: reset your form to pristine
          $scope.addCommentForm.$setPristine();
          
          //Step 5: reset your JavaScript object that holds your comment
          $scope.newComment = {
            author  : "",
            rating  : 5,
            comment : "",
            date    : ""
          };
        
        };

      }])

;