IT COURSES WEB APPLICATION:

A) DEFINITION:

Single HTML application where the online IT courses offered are shown. 
Options:
Create new course
Remove existing course
Edit existing course (image, title, definition, price)

Important Information:
Project has to be deployed on server in order to run accurately. The project has a .json file connection in order to load initial data.
The project can be run with minified javascript file (courses-min.js), courseInfo.json and main.html.
Please allow additional dialog-boxes on browser since delete confirmation and information messages use them.

B) USER VIEW:

MAIN:

Description:
The list of the available courses with their images are shown
When a course name or image is clicked the user is directed to the “single course page”.

Connections:
Click on course name or image -> single course page of the selected course
Click on “create course tab” -> add course page

SINGLE COURSE PAGE

The course information(title, description, image link, image, price) is shown.
The courses can be edited and deleted using this page,

Buttons:
	
EDIT: Onclick -> the course becomes editable 
User can change course information and save.
Input validations to avoid irrelevant input:
Price from 10 to 60 $
Image link can only be svg,png, jpeg, jpg. Moreover the link has to contain an image. An invalid url as input  is not accepted
Character limits for title and description

The SAVE button is available only when all the input fields are valid. On save the new data is saved in local storage of the browser and user is directed to the main tab

DELETE: Onclick -> User receives an alert box message to confirm the deletion. If the user confirms the operation the course is deleted from the local storage as well, user is directed to the main tab.

CREATE COURSE PAGE

User can add new courses entering all the required information. The same input validation is done as in the edit operation. 
After a successful addition the user is directed to main tab.

C)TECHNICAL INFORMATION:

In developing this project Angular 1.6.2 is used along with html, bootstrap and json.

FILES AND DATA STORAGE

JSON:
courseInfo.json:
To not start with empty data there is a .json file created with six courses. If the local storage for courses is empty the data is fetched from the json file.
In the initial run, all the data is transferred to local storage and as long as the local storage is not reset, the json file is not used again.

JAVASCRIPT:
JsonDataServices.js:
Only is used to load courseInfo.json in the initial run(when the local storage is empty)

Angular.js
AngularJS library of version 1.6.2
	
CoursesApp.js
The main javascript file where the functions for addition, deletion, editing, validation are stored. The access to the local storage and commication with JsonDataServices.js is also done here.

courses-min.js
Javascript file in which JsonDataServices.js, Angular.js and CoursesApp.js are bundled and minimized. It can be used as the sole javascript file to run to web app.

Note: Since the javascripts are bundled into courses-min.js, the other javascript files are not needed to run the project. However they can be viewed to make editions and changes easily.

HTML:
Main.html
The only html file of the project. The content is modified dynamically using ng-show directive of AngularJS. Bootstrap is used for the css.

STORAGE:
Local Storage:
After the first run of program the array(courses with all course data) is copied here. In every edition, deletion and course addition, the courses array is updated and actual array is copied to the local storage instead of the older one. This way the data is synchronized and changes are immediately reflected to the website.
.
Local storage allows us to save our modified data even after the browser is closed. For example, if a user adds some new courses and edits some others, even after restarting the browser she can reach the new and modified list of courses.
Note that every browser has its own local storage. For example, a change made on chrome won’t be seen if the user opens the application using internet explorer.

To cancel all the changes made and start from the .json file, local storage has to be reset. This can be done using clear history of the browser.

To access the local storage ngStore dependency is added to the project.


Bundling and Minifying:
Gulp is used to minify and bundle the code before uploading on the github in courses-min.js.

HOW TO RUN
	
Place files (main.html, courseInfo.json and courses-min.js) in the same directory.
Using command line navigate to the project directory.
Deploy the project on server and run.
You can use command line http-server command to easily deploy and run
Since the project has a .json file it has to be deployed on server to run accurately. Otherwise json communication fails and the html can’t load the initial list of courses.


FUTURE ADDITIONS:

Since the project was a short term project, its specifications and functions were kept limited. The future additions to the project could be:
	
Routing lazy loading: In order to decrease loading time and increase effectiveness
Uploading images instead of giving an image link
Better user interface, more mobile friendly design.
Adding unit testing.
More tests.
More product(course information) such as reviews, course level etc.
Sorting products by name, price etc.




