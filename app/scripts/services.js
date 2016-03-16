'use strict';

angular.module('confusionApp')
        // .constant("baseURL","http://localhost:3000/")
        .constant("baseURL","http://localhost/slim-api/api/")

        .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
                // this.getDishes = function(){
                //     return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
                // };

                this.getDishes = function(){
                    return $resource(baseURL + "dishes", null);
                };

                this.getDish = function(){
                    return $resource(baseURL + "dish/:id", null);
                };
                
                //promotions in db and method
                this.getPromotion = function(){
                    return $resource(baseURL + "dish/:id", null);
                };
            
    
                        
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            
                    var corpfac = {};    

                    corpfac.getLeaders = function(){
                        return $resource(baseURL + "leadership", null);
                    };

                    corpfac.getLeader = function(){
                        return $resource(baseURL + "leadership/:id", null);
                    };
            
                return corpfac;
         
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            
                var feedbackfac = {};         

                feedbackfac.saveFeedback = function(){
                    return $resource(baseURL + "feedback", {}, {
                        save: {method:'POST', params:{id : '1', firstName : 'maria', lastName:'kar', email:'sds@sd.com', comments:''}, isArray : true}
                    });
                };

       

                return feedabckfac;
     
        }])

        // .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {

        //     return $resource(baseURL + "feedback/:id", {}, {
        //         query:   {method:'GET',  params:{id : ''},          isArray : true},
        //         get:     {method:'GET',  params:{id : ''},          isArray : false},
        //         save:    {method:'POST', params:{id : ''},          isArray : false},
        //         update:  {method:'PUT',  params:{id : '@_id.$oid'}, isArray : false}
        //     });

        // });

;