# Mood Journal 

Mood Journal is a web application that allows users to track their moods and entries over time. Users can register, log in, add new mood entries, view their mood history, and manage entries. The application is built with Node.js, Express, MongoDB, EJS templates, and CSS styling. The design incorporates Bootstrap for a professional look and feel.

---

## Features

- **User Authentication**
  - Register new accounts
  - Secure login with password hashing (bcrypt)
  - Logout functionality

- **Dashboard**
  - Personalized greeting
  - Quick access to add new mood entries
  - View mood history in a structured format

- **Mood Entries**
  - Add new mood entries with date, mood selection, and description
  - Edit or delete existing entries
  - Mood history displayed in card format with images

- **Styling**
  - Custom CSS for entry pages, dashboard, and navbar
  - Responsive design for mobile devices
  - Hamburger menu for small screens
  - Bootstrap-based professional layout

- **Design Requirements**
  - Implements a site design using Bootstrap to give a professional online directory look
  - Unique design, not identical to the in-class application

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Templating:** EJS
- **Authentication:** Express-session, bcrypt
- **Frontend:** HTML, CSS, Bootstrap
- **Other Libraries:** express-ejs-layouts, dotenv

---

## Project Structure

mood-journal/
│
├─ controllers/
│ ├─ authController.js
│ └─ moodsController.js
│
├─ models/
│ └─ User.js
│
├─ routes/
│ ├─ auth.js
│ ├─ moods.js
│ └─ index.js
│
├─ views/
│ ├─ layouts/
│ │ └─ main.ejs
│ ├─ auth/
│ │ ├─ login.ejs
│ │ └─ register.ejs
│ ├─ dashboard.ejs
│ ├─ home.ejs
│ └─ moods/
│ ├─ add.ejs
│ └─ edit.ejs
│
├─ public/
│ ├─ css/
│ │ └─ styles.css
│ └─ images/
│ └─ [mood icons]
│
├─ .env
├─ app.js
├─ package.json
└─ README.md


---

## Installation

1. Clone the repository:
   git clone https://github.com/hailleehart-bytes/Assignment-3.git
Navigate to the project folder:


Install dependencies:
npm install

Create a .env file in the root directory with the following:
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key

Start the application:
npm start
Open your browser at http://localhost:3001

Usage
Register a new account.

Log in using your credentials.

Access the dashboard to add new mood entries.

View mood history with the option to edit or delete entries.

Navigate using the responsive navbar with a hamburger menu for smaller screens.

Notes
All user passwords are securely hashed using bcrypt.

EJS templates are used for dynamic rendering.

The dashboard and mood entry pages are styled to match a consistent theme.

The project fulfills the assignment requirement of implementing a professional design using Bootstrap.




## EXTERNAL SOURCES

## got code from:....
https://medium.com/swlh/building-a-simple-web-application-with-node-express-mongodb-dcd53231e83c    
https://javascript.plainenglish.io/how-i-integrated-a-mongodb-database-into-my-react-js-project-6cdc331923d3
https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html


!uploaded a visual of what I wanted my site to look like, using Canva and ased ChatGPT to help style it in css to get my desired format!