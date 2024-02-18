<h1>MyContacts API</h1>

## Installation

Follow the steps below

```bash
# Install Packages
yarn install
# or
npm install

# Start your postgres database

# if use Docker
docker start <CONTAINER_NAME>
# or create a new container
docker run --name <CONTAINER_NAME> -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=root -d postgres

# Connect to the container
docker exec -it <CONTAINER_NAME> bash

# Inside the container connect to postgres cli
pgsql -U <POSTGRES_USER>

## Create the database
CREATE DATABASE <DATABASE_NAME>; # CREATE DATABASE mycontacts;

## Connect to the database
\c <DATABASE_NAME> # \c mycontacts

## Create the tables and extension
## look in src/app/database/schema.sql
```

## Usage

For run the project use

```bash
yarn dev
# or
npm run dev
```
