# **EDUCATO**

  IT IS A PLATFORM IN WHICH STUDENTS AND TEACHERS COULD INTERACT WITH EACH OTHER USING LIVE VIDEO CHATTING.IT HAS AN INTERACTIVE USER INTERFACE AND WORKSPACE FOR BOTH MENTORS AND STUDENTS. IT MAKE ONLINE STUDIES EASIER AND INTERACTIVE.<br>
  THIS PROJECT IS MADE BY TEAM **MARCOS_IIITSURAT**.<br>
  THIS PROJECT IS BEING MADE DURING EDUTHON ORGANIZED BY IIIT LUCKNOW .
  
 ### HOW TO SET UP LOCALLY
  **NOTE** :- MAKE SURE YOU HAVE NODEJS AND MONGODB INSTALLED IN YOUR PC BEFORE SETTING UP LOCALLY IN YOUR PC
  
  1. FIRST CLONE THE REPO LOCALLY IN YOUR PC AND OPEN THE PROJECT USING ON YOUR TEXT EDITOR TYPE `npm install` IN YOUR TERMINAL.
  2. NOW TYPE `cd frontend` AND AGAIN TYPE `npm install` IN YOUR TERMINAL, THIS WILL INSTALL ALL THE DEPENDENCIES NEEDED FOR THE PROJECT TO RUN.
  3. MAKE A FILE NAME `config` AND MAKE A FILE NAMED `config.js` INTO IT. IN THAT FILE YOU MAY DEFINE TO VARIABLES AND EXPORT IT, WHICH ARE `MONGODB_URL` AND `JWT_SECRET`.THE `MONGODB_URL` CAN BE GIVEN VALUE AS `process.env.MONGODB_URL||"mongodb://127.0.0.1:27017/(db-name)"` AND THE `JWT_SECRET` AS VALUE `process.env.JWT_SECRET || (any random string)`.
  4. NOW AGAIN GO BACK TO THE HOME DIRECTORY OF YOUR PROJECT BY USING `cd ..` AND TYPE `npm start` THIS WILL START THE BACKEND SERVER .
  5. NOW OPEN POWERSHELL IN WINDOWS AND RUN MONGOD.EXE BY SPECIFYING ITS LOCATION AND ALSO THE DB PATH FOR EX: `/Users/Ashutosh/mongodb/bin/mongod.exe --dbpath=/Users/Ashutosh/mongodb-data`. SIMILIARLY YOU CAN ALSO RUN MONGODB SERVER BY SPECIFYING THE LOCATION IN YOUR POWERSHELL OR TERMINAL.
  6. AFTER THIS COMMAND YOUR LOCAL MONGODB SERVER WOULD START RUNNING AT PORT 27017.
  7. NOW OPEN ANOTHER TERMINAL WHERE YOU NAVIGATE TO FRONTEND SECTION BY USING `cd frontend` and run the command `npm start` THIS WILL START THE REACT SERVER AND YOUR WEBSITE WOULD BE OPENED AT `localhost:3000`.
  8. AFTER THIS YOU CAN RUN OUR PROJECT AT `localhost:3000` AND THE BACKEND WILL BE RUNNING AT `localhost:5000`.
  
 ### TECH STACK 
 
  THIS PROJECT IS WRITTEN IN MERN STACK.
  - **REACT JS** IS USED TO IMPLEMENT THE FRONTEND AND CLIENT-SIDE ACTIVITIES OF THIS APPLICATION.
  - **NODE JS** AND **EXPRESS** JS IS USED DESIGN THE API AND PROVIDE AUTHENTICATION FROM THE BACKEND SIDE AND SERVER WORK IS MAINLY DONE IN NODE JS ANE EXPRESS JS.
  - **MONGODB** IS USED AS THE DATABASE FOR THIS PROJECT TO STORE USERS DETAILS AND IS USED FOR OTHER STORAGE PURPOSES ALSO.
  
  VIDEO DEMO ![LINK](https://www.youtube.com/watch?v=BiM0F43FGLk)

  ![pic1](home.png)  ![pic2](profile.png)
  ![pic3](feature.png) ![pic4](chat.png)
  
  **Frontend and UI - Yash Wandhare**<br>
  **Backend - Ashutosh Thakur**
