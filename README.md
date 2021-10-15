# IBM CIC Virtual Whiteboard Case
This is my case for the Associate Developer position at IBM CIC.

I have chosen the Virtual Whiteboard case, where I am to create a virtual whiteboard that users can add media to share with everyone on the whiteboard.

I have chosen to build both a frontend and a backend to show that I am capable of both. The frontend is built with React, and the backend using Node.js. This made sense in the context of making this project into a webpage.
They are the tools I am familiar with, and are also widely used in many commercial systems and companies. They communicate via socket.io, as I wanted to add real-time updates between each client.

# Demo
A demo can be found on http://jonathanhertz.dk/ibm-whiteboard/

Select a tool on the top right (T for text, I for Image), and click anywhere on the whiteboard to add a new entry. Entries can also be edited by clicking on them. You can open the webpage in multiple tabs and see that the entries are shared (although no logins or anything).

# Building
The frontend is found in /virtual-whiteboard, and can be built by first running `npm init` in that directory, which will install the necessary package. If you wish to change the address that the frontend tries to connect to, it can be changed in /virtual-whiteboard/src/socket.js. You can then either start a local server with `yarn start` or build with `yarn build` which must then be hosted on a webserver.

The frontend is found in /backend. Again, `npm init` must be run first inside the backend directory to install dependencies, and then you can run the server with `node .`