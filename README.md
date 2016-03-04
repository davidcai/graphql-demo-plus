## Install

git clone

cd [to clone directory]

npm install

## Setup

chmod +x build.sh

./build.sh

That should have copied 2 files from node_modules to root of project.

## Run the GraphQL server

npm start

## Run the FE REST STUBs server

[open another Terminal in the same directory]

node fe-rest-stubs.js

## Peruse the user interface to query the data

Open a browser at: http://localhost:8080

Create a query like...

```
{
  user {
    name
    profile {
      uiPreference
      contactViaEmail
      contactViaSMS
    }
    accounts {
      id
    }
  }
}
```
