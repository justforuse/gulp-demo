angular.module("myApp",["ui.router"]).config(function(t,r){t.state("start",{url:"/start",templateUrl:"partials/start.html"}).state("start.about",{url:"^/about",templateUrl:"partials/about.html"}).state("end",{url:"/end"}).state("info",{url:"/info/:id",templateUrl:"partials/user.html",controller:function(t,r){t.uid=r.id},onEnter:function(){var t=confirm("are you sure to continue of onEnter?");if(!t)return console.log("here"),!1},onExit:function(){var t=confirm("are you sure to exit?");if(!t)return!1}}),r.otherwise("/start")}).constant("usersUrl","http://localhost:5000/ui-router/users.json").controller("mainCtrl",function(t,r){t.$on("$stateChangeStart",function(t,r,o,n,e){var u=confirm("are your sure to continue of controller");u||t.preventDefault()}),t.toEnd=function(){r.go("end")}}).controller("startCtrl",function(t,r,o){r.get(o).success(function(r){console.log(r),t.userData=r}).error(function(t){console.log("error"+t)})});