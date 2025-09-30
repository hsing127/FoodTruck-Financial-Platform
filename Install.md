####### DB Setup
Install PostgreSQL - 
1. Using Homebrew
brew install postgresql@15
might have to restart the terminal once or reload the zshrc file

brew services start postgresql

RUN createdb foodtruck_db

cd inside the server folder
RUN echo "DATABASE_URL=\"postgresql://$(whoami)@localhost:5432/foodtruck_db\"" > .env 

RUN npx prisma generate

RUN npx prisma migrate dev --name init_foodtruck_schema

RUN npm run seed

Checking if the db is setup locally and good - 
psql foodtruck_db
SELECT * FROM "Ingredient";

####### Backend Server 
Pull latest changes
cd server
RUN npm run dev

####### Frontend Server
Pull latest changes
cd client
RUN npm run dev
Open localhost in browser - login should work with following credentials
username - test@foodtruck.com
password - password123
