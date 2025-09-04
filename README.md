# Z-Prefix-Test
Develop a full CRUD Application for inventory managers


# Requirements:
Your code must be made available to instructors for grading via the submission link at the end of this section. Instructors should be able to see your front end and back end code.
Your application must be compatible with the Google Chrome browser
Your application must use a front-end, back-end, and database
The database should contain at least two entities, a User and a Item, in a one to many relationship, as shown in the ERD below
You should style your application in order to lay out components in a sensible way
You should use the following stories to build out the functionality of your app


# Stories
As an inventory manager I want to be able to create an account so that I can track my inventory.

As an inventory manager I want to be able to log into my account so that I can see my inventory of items.

After logging in, the inventory manager should be redirected to their inventory of items.
As an inventory manager I want to be able to create a new item so that I can share my item details with the world.

After the item is created, the inventory manager should be redirected to their inventory of items.
An item displays name, description, and quantity.
As an inventory manager I want to be able to see a my entire inventory of items.

The inventory of items should display the first 100 characters of each item description, with “...” at the end if the description is longer than 100 characters.
As an inventory manager I want to be able to see any individual item I have added.

The full item information should be displayed.
As an inventory manager I want to be able to edit an item so that I can fix any mistakes I made creating it.

When the user toggles edit mode, the page remains the same and the fields become editable.
As an inventory manager I want to be able to delete an item so that I can remove any unwanted content.

When the user deletes the item they should be redirected to their inventory of items.
As a visitor, who is not logged in, I want to be able to view all items created by every inventory manager so that I can browse every item.

Unauthenticated users should be able to view all items, and any single item.
The items should only display the first 100 characters of its description with “...” at the end if it is longer than 100 characters.
As a visitor, who is not logged in, I want to be able to view a specific item created by any user so that I can see all of its details.

Unauthenticated users should be able to view all items, and any single item.
As an inventory manager I want to be able to view all items created by every inventory manager so that I can browse every item.

Unauthenticated users should be able to view all items, and any single item.


# Instructions

**GETTING STARTED**
cd API

`docker pull postgres`

`mkdir -p $HOME/docker/volumes/postgres`

docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

docker exec -it pg-docker bash
    `psql -U postgres`
    `CREATE DATABASE inventory `
    `\c inventory`

**Separate Terminal:**
cd API
`npm start`               //should rollback the database, migrate the latest, and seed it alongside turn on the backend server

**SEPARATE TERMINAL**
cd UI
`npm run dev`           //open http://localhost:3000 in your web browser

