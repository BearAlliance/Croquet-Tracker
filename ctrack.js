var ctrack = angular.module('ctrack', ['ui.router']);

ctrack.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'pages/home.html'
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

        // App ================================================================
        .state('app', {
            url: '/app',
            templateUrl: 'pages/app.html'

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

        // GAMES OVERVIEW =====================================================
        .state('games', {
            url: '/games',
            templateUrl: 'pages/games.html'
        })

        // GAME VIEW ==========================================================
        .state('game', {
            url: '/game',
            templateUrl: 'pages/game.html'
        })

        ;
        
});


//Shared authentication
ctrack.service('auth', function auth($rootScope) {
    var auth = this;

    this.loggedIn = false;
    this.username = "";
    $rootScope.authenticated = false;

    this.getUser = function($rootScope) {
        return this.username;
    };

    this.isLoggedIn = function() {
        return this.loggedIn;
    };

    this.logIn = function(username, userid, $rootScope) {
        console.log("auth login " + username);
        this.loggedIn = true;
        this.username = username;
        $rootScope.currentUser = userid;
        $rootScope.currentUsername = username;
        $rootScope.authenticated = true;

    };

    auth.logOut = function() {
        console.log("auth logout");
        auth.loggedIn = false;
        $rootScope.currentUser = "";
        $rootScope.currentUsername = "";
        $rootScope.authenticated = "";
        return;
    };

    auth.signOut = function() {
        $http({
                method  : 'POST',
                url     : 'server/signOut.php',
                data    : $.param(),
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .success(function() {
                    console.log("Signed Out");
                    auth.logOut();
                })
    };
});

// Home page
ctrack.controller('homeCtrl', function($scope, auth) {
    $scope.isLoggedIn = function() {
        return auth.isLoggedIn();
    };
});

// Games overview
ctrack.controller('gameCtrl', function($scope, $http, auth) {
    $scope.isLoggedIn = function() {
        return auth.isLoggedIn();
    };

    $scope.getUser = function() {
        return auth.getUser();
    };
    $scope.gameData = {};
    $scope.gameData.p1Score = 0;
    $scope.gameData.p2Score = 0;
    $scope.gameData.player2 = "";

    $scope.addp1 = function(){
        $scope.gameData.p1Score++;
    };

    $scope.subp1 = function(){
        $scope.gameData.p1Score--;
        if ($scope.gameData.p1Score <= 0) {
            $scope.gameData.p1Score = 0;
        }
    };

    $scope.addp2 = function(){
        $scope.gameData.p2Score++;
    };

    $scope.subp2 = function(){
        $scope.gameData.p2Score--;
        if ($scope.gameData.p2Score <= 0) {
            $scope.gameData.p2Score = 0;
        }
    };

    $scope.save = function(gameData) {
        //data = {$scope.p1Score, $scope.p2Score, $scope.player2};
        $http({
            method  : 'POST',
            url     : 'server/saveGame.php',
            data    : $.param($scope.gameData),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .success(function(response) {
                console.log(response);
                $scope.message = response.message;
                if (response.success) {
                    $scope.success = true;
                }
                else {
                    $scope.error = true;
                }
            })
    };
});

// Game view
ctrack.controller('gamesCtrl', function($scope, $http, auth) {
    $scope.isLoggedIn = function() {
        return auth.isLoggedIn();
    };

    $scope.getGames = function() {
        $http({
            method  : 'POST',
            url     : 'server/games.php',
            data    : $.param(true),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .success(function(response) {
                console.log(response);
                console.log("ajax success");
                $scope.message = response.message;
                console.log(response.message);
                if (response.success) {
                    $scope.success = true;
                    $scope.error = false;
                    $scope.games = response.games;
                }
                else {
                    $scope.error = true;
                    $scope.success = false;
                }
            })
    };
})

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
ctrack.controller('signinCtrl', function($scope, $http, $rootScope, auth) {
    var signIn = this;

    $scope.credentials = {};

    $scope.isLoggedIn = function() {
        return auth.isLoggedIn()
    };

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
                    $scope.error = false;
                    auth.logIn(data.username, data.userid, $rootScope);
                    //auth.setLoggedIn(true);
                }
                else {
                    $scope.error = true;
                    $scope.success = false;
                }
            })
    };
});

// Navigation Menu
ctrack.controller('navCtrl', function($scope, auth) {
    $scope.isLoggedIn = function(){
        return auth.isLoggedIn();
    };

    $scope.signOut = function() {
        auth.logOut();
    };

    $scope.getUser = function() {
        return auth.getUser();
    };
});

// Account Page
ctrack.controller('accountCtrl', function($scope, auth, $http) {
    $scope.isLoggedIn = function() {
        return auth.isLoggedIn();
    };
});
