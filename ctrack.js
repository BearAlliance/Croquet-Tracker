var ctrack = angular.module('ctrack', ['ui.router']);

ctrack.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'pages/splash.html',
            data: {
                requireLogin: false
            }
        })
        
        // ABOUT PAGE ==========================================================
        .state('about', {
        	url: '/about',
        	templateUrl: 'pages/about.html',   
            data: {
                requireLogin: false
            }  
        })

        // SIGNUP FORM =========================================================
        .state('signup', {
        	url: '/signup',
        	templateUrl: 'pages/signup.html',
            data: {
                requireLogin: false
            }
        })

        // CONTACT PAGE =======================================================
        .state('contact', {
        	url: '/contact',
        	templateUrl: 'pages/contact.html',
            data: {
                requireLogin: false
            }
        })

        // App ================================================================
        .state('app', {
            url: '/app',
            templateUrl: 'pages/app.html',
            data: {
                requireLogin: true
            }
        })

        // ACCOUNT PAGE =======================================================
        .state('app.account', {
            url: '/account',
            templateUrl: 'pages/account.html'
        })

        // SIGN IN  ===========================================================
        .state('signin', {
            url: '/signin',
            templateUrl: 'pages/signin.html',
            data: {
                requireLogin: false
            }
        })

        ;
        
});

ctrack.run(function ($rootScope) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;

    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
      event.preventDefault();

      loginModal()
        .then(function () {
          return $state.go(toState.name, toParams);
        })
        .catch(function () {
          return $state.go('welcome');
        });
    }
  });

});

// // Rejected auth requests
// app.config(function ($httpProvider) {

//   $httpProvider.interceptors.push(function ($timeout, $q, $injector) {
//     var loginModal, $http, $state;

//     // this trick must be done so that we don't receive
//     // `Uncaught Error: [$injector:cdep] Circular dependency found`
//     $timeout(function () {
//       loginModal = $injector.get('loginModal');
//       $http = $injector.get('$http');
//       $state = $injector.get('$state');
//     });

//     return {
//       responseError: function (rejection) {
//         if (rejection.status !== 401) {
//           return rejection;
//         }

//         var deferred = $q.defer();

//         loginModal()
//           .then(function () {
//             deferred.resolve( $http(rejection.config) );
//           })
//           .catch(function () {
//             $state.go('welcome');
//             deferred.reject(rejection);
//           });

//         return deferred.promise;
//       }
//     };
//   });

// });

ctrack.service('loginModal', function ($modal, $rootScope) {

  function assignCurrentUser (user) {
    $rootScope.currentUser = user;
    return user;
  }

  return function() {
    var instance = $modal.open({
      templateUrl: 'views/loginModalTemplate.html',
      controller: 'LoginModalCtrl',
      controllerAs: 'LoginModalCtrl'
    })

    return instance.result.then(assignCurrentUser);
  };

});

ctrack.controller('LoginModalCtrl', function ($scope, UsersApi) {

  this.cancel = $scope.$dismiss;

  this.submit = function (email, password) {
    UsersApi.login(email, password).then(function (user) {
      $scope.$close(user);
    });
  };

});

// //Shared authentication
// ctrack.service('auth', function() {
//     var loggedIn;

//     return {
//         getLoggedIn: function() {
//             return loggedIn;
//         },
//         setLoggedIn: function(value) {
//             loggedIn = value;
//         }
//     }


// });


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

    // Form validation
    // $scope.badForm = function() {
    //     if ($scope.formData.username = "") {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // };

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

// Sign in page
ctrack.controller('signinCtrl', function($scope, $http) {
    $scope.credentials = {};

    $scope.signIn = function(credentials) {
        $http({
            method  : 'POST',
            url     : 'server/signin.php',
            data    : $.param($scope.credentials),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .success(function(data) {
                console.log(data);
                $scope.message = data.message;
                $scope.submit = true;
                if (data.success) {
                    $scope.success = true;
                    $rootScope['username'] = data.username;
                    $rootScope['userid'] = data.userid;
                    //auth.setLoggedIn(true);
                }
                else {
                    $scope.error = true;
                }
            })
    };
});

// Navigation Menu
ctrack.controller('navCtrl', function($scope, $http, AuthService) {
    $scope.credentials = {};

    $scope.isLoggedIn = function() {
        return auth.getLoggedIn();
    };

    // $scope.signIn = function() {
    //     $http({
    //         method  : 'POST',
    //         url     : 'server/signin.php',
    //         data    : $.param($scope.formData),
    //         headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    //     })
    //         .success(function(data) {
    //             console.log(data);
    //             $scope.message = data.message;
    //             $scope.submit = true;
    //             if (data.success) {
    //                 $scope.success = true;
    //                 auth.setLoggedIn(true);
    //             }
    //             else {
    //                 $scope.error = true;
    //             }
    //         })
    // };
});
