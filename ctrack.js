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
ctrack.service('auth', function auth($rootScope, $http) {
    var auth = this;

    this.loggedIn = false;
    this.username = "";
    this.loginChecked = false;
    $rootScope.authenticated = false;

    this.getUser = function($rootScope) {
        return this.username;
    };

    this.isLoggedIn = function() {
        if (!this.loginChecked) {
            this.checkLogin();
            this.loginChecked = true;
        }
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

    this.logOut = function() {
        console.log("auth logout");
        auth.loggedIn = false;
        $rootScope.currentUser = "";
        $rootScope.currentUsername = "";
        $rootScope.authenticated = "";
        return;
    };


    this.checkLogin = function() {
        $http.get("server/checkLogin.php")
        .success(function(data, status, headers, config) {
            console.log(data);
            if (data.success) {
                auth.username = data.username;
                auth.loggedIn = true;

                $rootScope.authenticated = true;
            }
            else {
                auth.loggedIn = false;
                $rootScope.authenticated = false;
            }
        });
    };

    auth.signOut = function() {
        $http.get("server/signOut.php")
        .success(function(data) {
            console.log("Signed out");
            auth.loggedIn = false;
            auth.loginChecked = false;
            $rootScope.authenticated = false;
        });
    };
});

// Home page
ctrack.controller('homeCtrl', function($scope, auth) {
    $scope.isLoggedIn = function() {
        return auth.isLoggedIn();
    };

    $scope.loginTest = function() {
        auth.checkLogin();
    }
});

// Games overview
ctrack.controller('gameCtrl', function($scope, $http, auth) {
    $scope.isLoggedIn = function() {
        return auth.isLoggedIn();
    };

    $scope.start = function() {
        $scope.gameData = {};
        $scope.gameData.player1 = $scope.getUser();
        $scope.gameData.p1Score = 0;
        $scope.gameData.p2Score = 0;
        $scope.gameData.player2 = "";
    };
    $scope.getUser = function() {
        return auth.getUser();
    };
    

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

    $scope.save = function() {
        //data = {$scope.p1Score, $scope.p2Score, $scope.player2};
        $http({
            method  : 'POST',
            url     : 'server/newGame.php',
            data    : $.param($scope.gameData),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .success(function(response) {
                console.log(response);
                $scope.message = response.message;
                if (response.success) {
                    $scope.success = true;
                    $scope.error = false;
                }
                else {
                    $scope.error = true;
                    $scope.success = false;
                }
            })
    };
});

// Games overview
ctrack.controller('gamesCtrl', function($scope, $http, auth) {
    $scope.isLoggedIn = function() {
        return auth.isLoggedIn();
    };

    $scope.gameData = {};
    $scope.games;

    $scope.getGames = function() {
        $http.get("server/games.php")
        .success(function(data) {
            console.log("games retrieved");
            $scope.games = data;
        });
    };

    $scope.edit = function(id) {
        var gameLocation = GetObjectKeyIndex($scope.games, id);
        if (auth.username == $scope.games[gameLocation].user1) {
            $scope.gameData.p1Score = $scope.games[gameLocation].user1score;
            $scope.gameData.p2Score = $scope.games[gameLocation].user2score;
            $scope.gameData.player1 = $scope.games[gameLocation].user1;
            $scope.gameData.player2 = $scope.games[gameLocation].user2;
            $scope.gameData.reversed = false;
        }
        // if the user is not player 1 in the db
        else {
            $scope.gameData.p1Score = $scope.games[gameLocation].user2score;
            $scope.gameData.p2Score = $scope.games[gameLocation].user1score;
            $scope.gameData.player1 = $scope.games[gameLocation].user2;
            $scope.gameData.player2 = $scope.games[gameLocation].user1;
            $scope.gameData.reversed = true;
        }
        $scope.gameData.gameid = $scope.games[gameLocation].gameid;
    };

    $scope.saveChanges = function() {
        if ($scope.gameData.reversed) {
            var tempplayer1 = $scope.gameData.player1;
            var tempplayer1score = $scope.gameData.p1Score;

            $scope.gameData.player1 = $scope.gameData.player2;
            $scope.gameData.player2 = tempplayer1;
            $scope.gameData.p1Score = $scope.gameData.p2Score;
            $scope.gameData.p2Score = tempplayer1score;
        }

        console.log($scope.gameData);
        $http({
            method  : 'POST',
            url     : 'server/updateGame.php',
            data    : $.param($scope.gameData),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .success(function(data) {
                console.log(data);
                if (data.success)
                    $scope.success = true;
            });
        $scope.getGames();
    };

    $scope.getUser = function() {
        return auth.getUser();
    };

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

    $scope.deleteGame = function(id) {
        var data = {};
        data['id'] = id;
        $http({
            method  : 'POST',
            url     : 'server/deleteGame.php',
            data    : $.param(data),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .success(function(data, status) {
                console.log(data);
                if (data.success)
                    $scope.deleteSuccess = true;
            });
        $scope.getGames();
    };

    function GetObjectKeyIndex(obj, keyToFind) {
        var i = 0, key;
        for (key in obj) {
            if(obj[i].gameid == keyToFind) {
                return i;
            }
            i++;
        }
    };
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
        auth.signOut();
    };

    $scope.getUser = function() {
        return auth.getUser();
    };

    $scope.checkLogin = function() {
        auth.checkLogin();
    };
});

// Account Page
ctrack.controller('accountCtrl', function($scope, auth, $http) {
    $scope.isLoggedIn = function() {
        return auth.isLoggedIn();
    };

    $scope.getUser = function() {
        return auth.getUser();
    };

    $scope.formData = {};
    $scope.formData.newPassword;
    $scope.formData.newPassword2;

    $scope.changePassword = function() {
        $http({
            method  : 'POST',
            url     : 'server/changePassword.php',
            data    : $.param($scope.formData),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .success(function(data) {
                console.log(data);
                $scope.message = data.message;
                if (data.success) {
                    $scope.success = true;
                    $scope.error = false;
                }
                else {
                    $scope.error = true;
                    $scope.success = false;
                }
            })
    };
});
