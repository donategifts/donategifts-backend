# DonateGifts Project

> Overview 1.0: This project enables users to donate holiday & birthday gifts to the foster children and homeless youth --simply by clicking one button-- which will automatically add the child's wish item to the user's Amazon cart & deliver to the child's address.

> Overview 2.0: We are the Virtual Drop-off Location for nonprofits and charities -- the future of material donations. Through our platform, nonprofits host Virtual Supply Drives on their wish pages and donors can send listed goods to children's nonprofits and animal shelters.
> The exact wish items are donated, programmatically ordered, delivered to each nonprofit, then the photos of received items are posted on the Community page by our nonprofit partners.
> Our platform also hosts birthday clubs and annual holiday gift drives for the children in foster care. Users collectively sign greetings cards for the kids and together, we send birthday/holiday gifts directly to the foster kids.

# Tech Stack

> 1.0 - Node, Mongo, EJS, CSS, Docker

> 2.0 (Current Plan) - Typescript, GraphQL, SQL (Postgres), React (Next.js), SCSS, Docker

# Live Production:

> https://donate-gifts.com/

> https://donate-gifts.org

# Dev Server:

> https://dev.donate-gifts.com

## Author

- Stacy Sealky Lee

## Contributors

- Patric Hoffmann
- Ivan Repusic
- Jacob Jeevan
- Marco Schuster
- Markell Richards
- Maria Nguyen
- Deep Patel

## Questions?

> Non-member? support@donate-gifts.com

> Member? slack #dev-collab-convo

## Usage

1. Install packages using

> `npm install`

2. Create a new file called `.env` with the contents of `default.env` in the root directory

3. Install Postgres or Install docker and spin up a Docker container using:

> `docker-compose up` (add -d as option if you don't need the logs)

4. Run seeder script to seed the database:

> `npm run init-database`

5. Before running the app, ping one of the team members on slack to get donate-gifts.json file. Alternatively you can run it using your own firebase credentials (replace details firebase-credentials file and run the script to generate the json file).

## Run App

### Run in dev mode

> `npm run dev`

### Run in prod mode

> `node app.js || npm start`

## Demo

https://youtu.be/KhgQV0MTxlA

- Release: v1.0
- Copyrights: DonateGifts Inc.
- Do not distribute this code without permission
