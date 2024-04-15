# Films API Documentation

This API allows users to manage films in a film library.

## Endpoints

### GET /api/films/all
Retrieves all films in the library.

#### Sample Request
```http
GET /api/films/all
```
Sample Response
json

[
    {
        "id": 1,
        "title": "Film Title",
        "favorite": false,
        "date": "2024-04-01T00:00:00.000Z",
        "rating": 4.5
    },
    {
        "id": 2,
        "title": "Another Film",
        "favorite": true,
        "date": "2023-12-15T00:00:00.000Z",
        "rating": 5
    }
]
GET /api/films/retrieve/favorite
Retrieves favorite films from the library.

Sample Request
http

GET /api/films/retrieve/favorite
Sample Response
json

[
    {
        "id": 2,
        "title": "Another Film",
        "favorite": true,
        "date": "2023-12-15T00:00:00.000Z",
        "rating": 5
    }
]
GET /api/films/retrieve/best
Retrieves films with a rating of 5 from the library.

Sample Request
http

GET /api/films/retrieve/best
Sample Response
json

[
    {
        "id": 2,
        "title": "Another Film",
        "favorite": true,
        "date": "2023-12-15T00:00:00.000Z",
        "rating": 5
    }
]
GET /api/films/retrieve/lastmonth
Retrieves films added in the last month.

Sample Request
http

GET /api/films/retrieve/lastmonth
Sample Response
json

[]
GET /api/films/retrieve/unseen
Retrieves films that have not been watched yet.

Sample Request
http

GET /api/films/retrieve/unseen
Sample Response
json

[]
GET /api/films/:id
Retrieves a specific film by ID.

Sample Request
http

GET /api/films/1
Sample Response
json

{
    "id": 1,
    "title": "Film Title",
    "favorite": false,
    "date": "2024-04-01T00:00:00.000Z",
    "rating": 4.5
}
PUT /api/films/:id
Adds a new film to the library.

Sample Request
http

PUT /api/films/
Content-Type: application/json

{
    "title": "New Film",
    "favorite": false,
    "date": "2024-03-15",
    "rating": 4
}
Sample Response
http

201 Created
POST /api/films/:id/mark
Marks a film as favorite.

Sample Request
http

POST /api/films/1/mark
Sample Response
http

200 OK
Film marked as favorite
POST /api/films/:id/rating
Adds rating to a film.

Sample Request
http

POST /api/films/1/rating
Content-Type: application/json

{
    "rating": 0.5
}
Sample Response
http

200 OK
Rating added
POST /api/films/:id/update
Updates information about a film.

Sample Request
http

POST /api/films/1/update
Content-Type: application/json

{
    "title": "Updated Film Title",
    "favorite": true,
    "date": "2024-04-01",
    "rating": 4.5
}
Sample Response
http

200 OK
Film updated
DELETE /api/films/:id
Deletes a film from the library.

Sample Request
http

DELETE /api/films/1
Sample Response
http

200 OK
Film deleted