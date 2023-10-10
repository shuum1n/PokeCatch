[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11527239&assignment_repo_type=AssignmentRepo)

# Branded Things App API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`

- `GET /products`
- `POST /products`
- `GET /products/:id`
- `DELETE /products/:id`

- `POST /google-login`

- `GET /categories`
- `POST /categories`


&nbsp;

## 1. GET /register

Description:
- Register a user and create profile for them


Request:

- body 
```json
    {
        "username": "string",
        "email": "string",
        "password": "string"
    }
```

_Response (200 - OK)_

```json
    {
        "id": "integer",
        "name": "string",
    }
```

&nbsp;

## 2. POST /login

Request:


- body:

```json
{
    "email": "string",
    "password": "string",
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string",
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /profile

Description:
- Get user profile

Request:

- headers:

```json
{
  "access_token" = "string"
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "username": "string",
    "level": "integer",
    "experience": "integer",
    "currentXp": "integer",
    "xpToLevelUp": "integer",
    "pokedollars": "integer",
    "adventures": "integer",
    "profile_picture": "string",
    "UserId": "integer",
}
```
_Response (404 - Not Found)_

```json
{
    "message": "Error not found"
}
```
&nbsp;

## 4. POST /profile

Description:
- Update profile avatar

Request:

- headers:

```json
{
  "access_token" = "string"
}
```

- body:

```json
{
  "avatar": "file"
}
```

_Response (200 - OK)_

```json
{
  "message": "Profile successfully updated"
}
```

## 5. GET /areas

Description:
- Get all area

Request:

- headers:

```json
{
  "access_token" = "string"
}
```


_Response (200 - OK)_
```json
[
    {
        "areaData": {
            "id": 1,
            "name": "Route 1",
            "base_time": 5,
            "level_restriction": 1,
            "background_image": "default"
        },
        "dataUri": "string"
    }
]
```

&nbsp;

## 6. GET /adventure/list

Description:
- Get current adventures

Request:

- headers:

```json
{
  "access_token" = "string"
}
```

_Response (200 - Created)_
```json
{
    "status": 'string',
    "timer": "integer",
    "location": "string",
    "dataUri": "string",
    "code": 'string'
}

```

_Response (404 - Not Found)_
```json
{
    "code": "NoAdventure",
    "message": "You have no ongoing adventures!"
}
```

## 7. GET /adventure/claim

Description:
- Get adventure reward

Request:

- headers
```json
  {
    "access_token" = "string"
  }
```

_Response (200 - OK)_
```json
{
    "message": "string"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "There is no adventure to claim!"
}
OR
{
    "message": "Adventure is in progress!"
}
```
## 8. POST /adventure/:areaId

Description:
- Get all categories

Request:

- headers:

```json
{
  "access_token" = "string"
}
```

- params:

```json
{
    "areaId": "integer"
}
```
_Response (200 - OK)_

```json
{
    "status": "string",
    "id": "integer",
    "location": "string",
    "startedAt": "date",
    "estimatedCompletion": "date",
    "ProfileId": "integer",
}
...
```

_Response (403 - Forbidden)_
```json
{
    "message": "Your level is too low to access this area!"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Unauthorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "<item> not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```