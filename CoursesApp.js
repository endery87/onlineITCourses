angular.module("CoursesApp", ["ngStorage"]).
  controller("myCtrl", myJSCtrl)


function myJSCtrl(jsonDataSvc, $http, $localStorage, $q) {
  var self = this;
  self.currentTab = "main";
  self.editMode = false;
  self.priceCheck = "valid";
  self.titleCheck = "valid";
  self.imageCheck = "valid";
  self.descCheck = "valid";
  self.deleteClicked = false;

  //if local storage is empty then load from .json file
  if (!$localStorage.data)
    jsonDataSvc.getFromFile()
      .then(function (data) {
        self.courses = data.courses;      
        $localStorage.data = self.courses;
        console.log("courses loaded from .json");
      });
  //if local storage is not empty load from local storage
  else {
    self.courses = $localStorage.data;
    console.log("courses loaded from local storage");
  }

  // function for course selection, invoked when user clicks on a course ling
  this.viewCourse = function (index) {
    
    self.selectedindex = index;
    self.selectedCourse = self.courses[index];
    self.currentTab = "course";
    
    console.log(self.selectedCourse.title+" course is selected.");
    self.priceCheck = "valid";
    self.titleCheck = "valid";
    self.imageCheck = "valid";
    self.descCheck = "valid";
  }

  //invoked when the tab is changed
  this.changeTab = function (newTab) {
    console.log("Tab is changed to: " + newTab);
    self.currentTab = newTab;
    self.editNew = undefined;
    self.newCourse = undefined;
    self.editMode = false;

    if (newTab == "addCourse") {
      self.priceCheck = "required";
      self.titleCheck = "required";
      self.imageCheck = "required";
      self.descCheck = "required";
    }
  }

  //turns on&off edit mode
  this.toggleEdit = function () {
    self.editMode = !self.editMode;
  }

  //saves the edited course data
  this.save = function () {
    self.editMode = false;
    if(self.newEdit.title != undefined)         //if a change is made on title etc.
      self.selectedCourse.title = self.newEdit.title;
    if(self.newEdit.description != undefined)
      self.selectedCourse.description = self.newEdit.description;
    if(self.newEdit.price != undefined)
      self.selectedCourse.price = self.newEdit.price;
    if(self.newEdit.image != undefined)
      self.selectedCourse.image = self.newEdit.image;

    var index = self.courses.indexOf(self.selectedCourse);
    self.courses[index] = self.selectedCourse;          //modifications are reflected to courses array
    $localStorage.data = self.courses;                  //modifications are reflected to local storage
    console.log("Saved data for course "+self.newEdit.title);
    self.newEdit=undefined;
    alert("Changes for "+self.selectedCourse.title+" are saved");


  }
  //function invoked when a course is to be deleted
  this.delete = function () {

    var r = confirm("Are you sure that you want to delete " + this.selectedCourse.title+ " ?");// pop-up message to confirm deletion
    if (r == true) {
      var index = self.courses.indexOf(self.selectedCourse);
      console.log("Deleting course " + self.selectedCourse.title);
      self.courses.splice(index, 1);                                                //delete from array
      $localStorage.data = self.courses;                                            //reflect changes to local storage
      alert("Course "+self.selectedCourse.title+" is deleted");
      this.changeTab("main");                                                       //go back to main tab
    }
  }

  //check image validity extension and if the url contains image
  this.checkImage = function (type) {
    var checked;
    if (type === "edit") {
      checked = this.newEdit.image;             //the image in the edition is to be checked
    }
    else
      checked = this.newCourse.image;           //image in the addition is going to be checked

    if (checked.match(/\.(jpeg|jpg|gif|png|svn)$/))   //first extension is checked only valid extensions are jpeg, jpg, gif, png, svn
    {
      isImage(checked).then(function (test)           //then the link is checked, if it contains an image or not
      {
        if (test == true)
          self.imageCheck = "valid";                  //valid extension & url
        else
          self.imageCheck = "Url doesn't contain image";
      });

    }
    else 
    {
      console.log("invalid, only jpeg, jpg, gif or png files ");
      self.imageCheck = "invalid type";
    }

  }
  //function to check if there is an image in the given url source
  function isImage(src) {

    var deferred = $q.defer();

    var image = new Image();
    image.onerror = function () {
      deferred.resolve(false);
    };
    image.onload = function () {
      deferred.resolve(true);
    };
    image.src = src;

    return deferred.promise;
  }

  //validity of title is being checked with character limit from 2 to 10
  this.checkTitle = function (type) {
    var checked;
    if (type === "edit") {
      checked = this.newEdit.title;
    }
    else
      checked = this.newCourse.title;
    if (checked.length > 10)
      this.titleCheck = "toolong";
    else if (checked.length < 2)
      this.titleCheck = "too short";
    else
      this.titleCheck = "valid";
  }

  //validity of the description is being checked with character limit from 5 to 50
  this.checkDesc = function (type) {
    var checked;
    if (type === "edit") {
      checked = this.newEdit.description;
    }
    else
      checked = this.newCourse.description;
    if (checked.length > 50)
      this.descCheck = "toolong";
    else if (checked.length < 5)
      this.descCheck = "too short";
    else
      this.descCheck = "valid";

  }

  //validity of price is being checked. min 10, max 60
  this.checkPrice = function (type) {
    var checked;
    if (type === "edit") {
      checked = this.newEdit.price;
    }
    else
      checked = this.newCourse.price;
    if (checked > 60)
      this.priceCheck = "too expensive";
    else if (checked < 10)
      this.priceCheck = "too cheap";
    else
      this.priceCheck = "valid"
  }

  //checks if all the input fields are valid
  this.checkInputs = function () {
    var validity = false;
    if (self.priceCheck === "valid" && self.imageCheck === "valid" &&
      self.descCheck === "valid" && self.titleCheck === "valid")
      validity = true;

    return validity;
  }

  //adds a new course
  this.addCourse = function () {

    self.newCourse.id = new Date();         //id is generated by the 
    self.courses.push(self.newCourse);
    $localStorage.data = self.courses;
    console.log("new course"+self.newCourse.title+" is created");   
    alert("New course "+self.newCourse.title+" is added");

    self.changeTab("main");
   
    self.newCourse = undefined;
    

    
  };

}