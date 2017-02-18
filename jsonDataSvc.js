(function () {
var myModule = angular.module("CoursesApp");

myModule.service("jsonDataSvc",["$http", function ($http) {
    var self=this;
    self.getFromFile = function () {
        var promise1 = $http.get("courseInfo.json");
        var promise2 = promise1.then(function (response) {
            return response.data;
        });

        return promise2;

    }

}]);
})();
