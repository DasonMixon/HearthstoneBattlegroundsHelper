# HearthStone Battlegrounds Helper

## Purpose
To help new players understand how the Battlegrounds game mode works and teach them what the best hero and minion synergies are.

## How to run locally
* Clone this repository
* Run `npm install` in the root directory
* Navigate to the services/token-service.js file and replace the following texts:
..* CLIENT_ID_HERE -> Your Blizzard API Client ID
..* CLIENT_SECRET_HERE -> Your Blizzard API Client Secret
..* [Register a Blizzard API application](https://develop.battle.net/access/)
* Run `npm start` in the root directory
* A webpage should automatically open but if not navigate to http://localhost:3000 in a web browser

## Things that still need done
* Handle API response paging
* Add a back-end database that will hold custom metadata about heros and minions that is not availble through the Blizzard API
* Add a back-end service that will act as a proxy between our application and the Blizzard API (Right now the front-end makes all the requests). Also this service will connect to our back-end database for fetching metadata
* Allow user creation on our end (Maybe?)
* Figure out the structure of the site
* Provide API keys & other configurations through an environment file