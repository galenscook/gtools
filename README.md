# gTools
gTools is a real-time collaborative text editor (a la Google Docs).  Users can create new documents or find current ones and edit them with others.  Document text persists on page reload, but users do not.  One document cannot have two contributors with the same username, but contributors can use the same username on multiple documents.

##Technologies
gTools is built on Node.js, and uses MongoDB (with Mongoose) for persistent data, Express.js as middleware and Socket.io to support the real-time multi-user interactions.  The majority of the processing is done in the app.js file, with routes and views pulled out into their respective folders.

##Installation & Collaboration
If you would like to run this program, feel free to clone it onto your desktop.  (Note: you need to have MongoDB installed).  Within the root directory, run the following commands to install the dependencies and set up the database:
```
$ npm install
$ mongod
```

Then start the program with:
```
$ node app.js
```
At this point, you can direct your browser to `127.0.0.1:3000` to see the homepage.

If you'd like to contribute to this project, I welcome forks and issues!  

###Helpful Resources
+ [Treehouse Node Tutorial](http://teamtreehouse.com/library/build-a-simple-dynamic-site-with-nodejs)
+ [Socket.io Chatroom Tutorial](http://socket.io/get-started/chat/)
+ [Socket.io Chatroom Walkthrough](https://www.youtube.com/playlist?list=PLicY6aYZ8ilpmHfJ8jP1lt7ihPpRWBJ9P)
+ [Node/Express/MongoDB Tutorial](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/)