
# JOBEDIN      

[![Heroku](https://img.shields.io/badge/Deployed_App-Heroku-52A55D.svg)](https://)       
Jobedin is a network, designed  to connect your professional identity with opportunities.

# Description
:dart: Jobedin is a RESTful API app, follows an MVC paradigm in its architectural structure.

Users can sign up safely to create a profile.     
Users can login to profile, and demonstrate their information, skills and background.      
Users can post  job opportunities, and leave comments and votes on other posts.     


# Demo
:movie_camera:   

# Installation
:floppy_disk: To use this application for your own purposes: Clone the GitHub repository, and install all the dependencies, with```npm install```, on the integrated terminal install all the dependencies.
Create your .env file and type in: ``` DB_NAME='jobedin_db' DB_USER='yourusername' DB_PW='yourpassword' ```
In the integrated terminal, seed ```npm run seed``` and start using ```npm start``` app will run at localhost3001.

# Dependencies
:pushpin:     
- express
- Express-session
- express-handlebars
- Sequelize
- Connect-session-sequelize
- mysql2
- Dotenv
- Bcrypt
- multer

# license
![license](https://img.shields.io/badge/License-MIT-blue)

# Contributors
   
[![Github](https://img.shields.io/badge/Github-Torabis-52A55D.svg)](https://github.com/Torabis)
[![Github](https://img.shields.io/badge/Github-rongbangye-52A55D.svg)](https://github.com/rongbangye)
[![Github](https://img.shields.io/badge/Github-solomonmeresa-52A55D.svg)](https://github.com/solomonmeresa)

<!-- MySQL Schema:

users
 - id *
 - email *
 - username *
 - password *
 - profile_pic *
 - type *


job_posts
- id *
- title *
- description *
- post_url *
- keywords * 
- user_id *
- created_at
- updated_at


comments
- id *
- comment_text *
- user_id *
- post_id *
- created_at
- updated_at

likes
- id
- user_id
- post_id

profile
- id *
- skills *
- education *
- experience *
- user_id -->
