'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+ response.status + " " + response.statusText;
            });
                        
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

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    console.log(feedbackFactory);
                    //save feedback
                    feedbackFactory.saveFeedback().save($scope.feedback);

                    //clear form
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDish().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.newComment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                $scope.newComment.date = new Date().toISOString();
                console.log($scope.newComment);
                $scope.dish.comments.push($scope.newComment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.addCommentForm.$setPristine();
                $scope.newComment = {rating:5, comment:"", author:"", date:""};
            }

        }])

        // implement the IndexController and About Controller here

        .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory){

            $scope.showDish = false;
            $scope.message="Loading ...";

            $scope.dish = menuFactory.getDish().get({id:1})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );

            $scope.showPromotion = false;

            $scope.promotion = menuFactory.getPromotion().get({id:2})
            .$promise.then(
                function(response){
                    $scope.promotion = response;
                    $scope.showPromotion = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );

            $scope.showLeader = false;

            $scope.leader = corporateFactory.getLeader().get({id:1})
            .$promise.then(
                function(response){
                    $scope.leader = response;
                    $scope.showLeader = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){

            $scope.showLeadership = false;
            $scope.message = "Loading ...";
            
            corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leadership = response;
                    $scope.showLeadership = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
            });


        }])


;