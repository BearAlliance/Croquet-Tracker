var ctrack = angular.module('ctrack', ['ui.router']);

ctrack.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'pages/splash.html'
        })
        
        // ABOUT PAGE ==========================================================
        .state('about', {
        	url: '/about',
        	templateUrl: 'pages/about.html'     
        })

        // SIGNUP FORM =========================================================
        .state('signup', {
        	url: '/signup',
        	templateUrl: 'pages/signup.html'
        })

        // CONTACT PAGE =======================================================
        .state('contact', {
        	url: '/contact',
        	templateUrl: 'pages/contact.html'
        })

        ;
        
});

// Signup Page
ctrack.controller('signupCtrl', function($scope, $http) {
    // create a blank object to hold our form information
    // $scope will allow this to pass between controller and view
    $scope.formData = {};
    // process the form
    $scope.processForm = function() {
        $http({
            method  : 'POST',
            url     : 'server/signup.php',
            data    : $.param($scope.formData),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
        })
            .success(function(data) {
                console.log(data);
                $scope.test = data.test;
                if (!data.success) {
                    // if not successful, bind errors to error variables
                    $scope.errorName = data.errors.name;
                    $scope.errors = data.errors;
                    $scope.message = null;
                } 
                else {
                    // if successful, bind success message to message
                    $scope.message = data.message;
                    $scope.errorName = '';
                    $scope.errors = null;
                }
            });
    };
});
// ctrack.controller('signupCtrl', function($scope, $http) {

//     $scope.formData = {};

//     // Processs signup form
//     $scope.processForm = function() {
//         $http({
//         method  : 'POST',
//         url     : 'server/signup.php', // Pass the data as strings
//         data    : $.param($scope.formData),
//         })
//          .success(function(data)) {
//           console.log(data);

//           if (!data.success) {
//             // If not successful, bind erros to error variables
//             $scope.errorName = data.errors.name;
//           }
//           else {
//             // If successful, bind success message to message
//             $scope.message = data.message;
//           }
//          }
//     }

//     $scope.reset = function() {
//         $scope.username = "";
//         $scope.email = "";
//         $scope.password = "";
//         $scope.password2 = "";
//     }
// });
