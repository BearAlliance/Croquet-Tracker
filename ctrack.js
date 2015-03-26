(function() {
  var app = angular.module('ctrack', []);

  // Navigation
  // Home = 1
  // About = 2
  this.currentPage = 1; 
  this.loggedIn = false;

  app.controller("navController", function(){
  	this.currentPage = 1; 
  	this.loggedIn = false;
  	this.test = true;

  	isActive = function (viewLocation) {
  		return (viewLocation === currentPage);
  	}
  });

  app.controller("ContentController", function(){
 	this.test = true;
  });
})();