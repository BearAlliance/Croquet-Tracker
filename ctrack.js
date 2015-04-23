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

        // ACCOUNT PAGE =======================================================
        .state('account', {
            url: '/account',
            templateUrl: 'pages/account.html'
        })

        // SIGN IN  ===========================================================
        .state('signin', {
            url: '/signin',
            templateUrl: 'pages/signin.html'
        })

        ;
        
});

// Signup Page
ctrack.controller('signupCtrl', function($scope, $http) {
    // create a blank object to hold our form information
    // $scope will allow this to pass between controller and view
    $scope.formData = {};

    // True if the passwords match
    $scope.passMatch = true;

    // Returns false if the passwords do not match
    $scope.comparePassword = function() {
        if ($scope.formData.password != $scope.formData.password2) {
            $scope.passMatch = false
        }
        else {
            $scope.passMatch = true;
        }
    };
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
                    //$scope.errorName = data.errors.name;
                    $scope.errors = data.errors;
                    $scope.message = data.message;
                    $scope.success = false;
                } 
                else {
                    // if successful, bind success message to message
                    $scope.message = data.message;
                    $scope.errors = null;
                    $scope.success = true;
                }
            });
    };
});

ctrack.controller('signinCtrl', function($scope, $http) {
    $scope.formData = {};

    $scope.signIn = function() {
        $http({
            method  : 'POST',
            url     : 'server/signup.php',
            data    : $.param($scope.formData),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .success(function(data) {
                console.log(data);
                $scope.test = data.test;
                if (data.success) {

                }
            })
    };
});

ctrack.controller('navCtrl', function($scope, $http) {
    $scope.formData = {};


})
