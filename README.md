# Notifications App

## Requirements:
* nodejs version 14.18.1 (recommended: use nvm package to manage node dependencies for different environments)
* mongoDB community server version 3.6.21

## Initial setup instructions:

### Install dependencies:
Run `npm install` within client & server folders (notifications_client/ & notifications_server/)

### Run client & server:
1. **To run client in dev environment:**
Run from "notifications_client/" folder: `npm start`
2. **To run server in dev mode:**
Run from "notifications_server/": `npm run-script dev`
3. **Run server in production mode:**
* Run: `npm run build` in notifications_client/
* On "notifications_server/": `npm start`

### Run mongo migration files
1. **Recomemended: install migrate-mongo globally (otherwise will need to run command from source in node_modules/):**
`npm install -g migrate-mongo`
2. **cd to /notifications_server/db and Run:**
`migrate-mongo up` 

