# SYNTX API

## Architecture
	- Node.JS with express routing for GET requests and CORS middleware
	- Only route is ''. Check Authorization header, then take query parameter and transpose param if zipcode to lat long.
	- Get woeid from weather api. Then query woeid for 7 day forecast and return it.

## Time restraints
	- left everything in one file instead of creating seperate folders for middleware, routing, etc.
	- limited tests

## How to run server
 - cd to root folder
 - npm install
 - npm start