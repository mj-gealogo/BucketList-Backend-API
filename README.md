# Bucketlist API for travel destinations

## Description

This API is created to obtain my bucket list destinations and activities around the globe. 

The baseline structure of this API is created by Morgan English for my SENG365 course at university
which I enjoyed so much I was willing to do it again but for my personal interests!

## Running locally

1. Use `npm install` to populate the `node_modules/` directory with up-to-date packages.
2. Create a file called `.env`, following the instructions in the section below.
3. Go to https://dbadmin.csse.canterbury.ac.nz and create a database with the name that you set in the `.env` file.
2. Run `npm run start` or `npm run debug` to start the server.
3. The server will be accessible on `localhost:4941`.

### `.env` file

Create a `.env` file in the root directory of this project including the following information (note that you will need
to create the database first in phpMyAdmin):

```
SENG365_MYSQL_HOST=db2.csse.canterbury.ac.nz
SENG365_MYSQL_USER={your usercode}
SENG365_MYSQL_PASSWORD={your password}
SENG365_MYSQL_DATABASE={a database starting with your usercode then an underscore}
```

For example:

```
SENG365_MYSQL_HOST=db2.csse.canterbury.ac.nz
SENG365_MYSQL_USER=abc123
SENG365_MYSQL_PASSWORD=password
SENG365_MYSQL_DATABASE=abc123_s365
```

## Status code notes

| Status Code | Status Message        | Description                                                                   | Example                                                |
|:------------|-----------------------|-------------------------------------------------------------------------------|--------------------------------------------------------|
| 200         | OK                    | Request completed successfully                                                | Successfully get films                                 |
| 201         | Created               | Resource created successfully                                                 | Successfully create a film                             |
| 400         | Bad Request           | The request failed due to client error                                        | Creating a film without a request body                 |
| 401         | Unauthorised          | The requested failed due invalid authorisation                                | Creating a film without authorisation header           |
| 403         | Forbidden             | The request is refused by the server                                          | Editing a film after a review has been placed          |
| 404         | Not Found             | No matching resource was found on the server                                  | Trying to view a film that doesn't exist (i.e. 999999) |
| 500         | Internal Server Error | The request causes an error and cannot be completed                           |                                                        |
| 501         | Not Implemented       | The request can not be completed because the functionality is not implemented |                                                        |

## Steps you should take before finishing

Before finalising your code, you should 
1. Import a fresh copy of your project from Eng-Git
2. Create a `.env` file with only the fields discussed above
3. run `npm install`
4. run `npm run start`
5. Run the Postman collection provided and check that the tests are running as expected

## Final notes
Images within the `storage\default` folder should not be removed, when reloading the server these will be copied to
`storage\images` where the server can add, update or delete them when running.
#   B u c k e t L i s t - B a c k e n d - A P I  
 