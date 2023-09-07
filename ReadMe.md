# FINAL PROJECT - WildXperience -

WildXperience is an exceptional platform that invites adventurers to embark on a journey filled with extraordinary experiences, deep cultural immersion, and delightful culinary discoveries. Unlike conventional travel agencies, we are not just travel enthusiasts; we are a dedicated team of seasoned globetrotters who share a profound passion for exploration.

### About WildXperience

WildXperience was born out of a desire to provide travelers with unique and unforgettable adventures. We believe that every journey should be more than just a destination; it should be an immersive and transformative experience. With this vision in mind, we have curated a selection of three distinct types of experiences:

### 1. Xtreme Adventures

For those seeking an adrenaline rush and a taste of the wild side, our Xtreme Adventures are designed to exhilarate. From scaling towering peaks to diving into the depths of the ocean, these experiences push boundaries and ignite your sense of adventure.

### 2. Cultural Immersion

We firmly believe that the heart of any journey lies in its culture. Our Cultural Immersion experiences allow you to delve deep into the traditions, history, and vibrant customs of your chosen destination. Engage with local communities, participate in ancient rituals, and gain insights that go beyond the surface.

### 3. Gastronomic Delights

Food is a universal language, and our Gastronomic Delights experiences celebrate the culinary treasures of the world. Discover a country's soul through its flavors, savoring street food delicacies to fine dining in historic settings, all while uncovering the stories behind each dish.

## Structure

Our website features an interactive world map on the Home page, enabling visitors to click on highlighted countries to discover experiences. New users can easily sign up, granting them access to the site's full features, while returning users enjoy secure login with our robust authentication system. Registered users can actively engage by commenting, rating, and managing their own reviews, with administrators having exclusive content creation and editing privileges. To purchase experiences, users can navigate via the world map or search by tags and keywords, ensuring a seamless and immersive journey. Experiences can be added to the cart, selecting as many adventures as you desire, and then proceed to the cart to purchase your chosen experiences.

# SERVER ROUTES

## auth.routes.js

| Route   | HTTP verb | Description                             |
| ------- | --------- | --------------------------------------- |
| /signup | POST      | Get the infomation of the signup form   |
| /login  | POST      | Get the infomation of the login form    |
| /verify | POST      | Used to verify JWT stored on the client |

## experience.routes.js

| Route                             | HTTP verb | Description                                      |
| --------------------------------- | --------- | ------------------------------------------------ |
| /experiences'                     | GET       | Get all the experiences                          |
| /create                           | POST      | Get the infomation of the create experience form |
| /country/:location/experience     | GET       | Get the experiences filtered by country          |
| /country/:location/:experience_id | GET       | Get a especific experience                       |
| /experience/edit/:experienceId    | POST      | Get the infomation of the edit experience form   |
| /experience/delete/:experienceId  | POST      | Delete a especific experience                    |

## index.routes.js

| Route | HTTP verb | Description |
| ----- | --------- | ----------- |
| /     | GET       | All good    |

## profile.routes.js

| Route                   | HTTP verb | Description                                          |
| ----------------------- | --------- | ---------------------------------------------------- |
| /profile/edit/:userId   | POST      | Get the infomation of the edit user information form |
| /profile/delete/:userId | POST      | Delete the user account                              |

## ratings.routes.js

| Route                 | HTTP verb | Description       |
| --------------------- | --------- | ----------------- |
| /:experienceId/all    | GET       | Displays ratings  |
| /:experienceId/create | POST      | Create new rating |

## review.routes.js

| experience_Id | POST | Create comment |
| /reviews/:experience_id/delete | POST | Delete comment|
| /user-profile/: | GET | Display user profile |

## staff.routes.js

| /staff | GET | STAFF DISPLAY |

# CLIENT ROUTES

| path="/"| GET | HomePage |
| path="/signup"| GET | sign up|
| path="/login" | GET | log in |
| path="/country/:location/:experienceId" | GET | ExperienceDetail|
| path="/cart"| GET | cart |
| path="/profile/:profileId"| GET | profile user|
| path="/create"| GET | AddExperience |
| path="/country/:location/:experienceId/edit" | GET | EditExperience|
| path="/search" | GET | AllExperiences|
| path="/search" | GET | SearchBar|
