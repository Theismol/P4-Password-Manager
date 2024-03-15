## This contains the documentation for API´s

> all routes start with http://localhost:4000/api


## auth routes start with /auth 
   - **/login `post`**

```JSON
{
    "username": "string",
    "password" : "string"
}

```

>**Outcome**
```JSON
{
    "token": "string"
}
```

   - **/tokenRefresh `post`**

```JSON
{
    "username": "string",
    "refreshToken" : "string"
}

```

>**Outcome**
```JSON
{
    "message":"string",
    "token": "string"
}
```

   - **/logout `post`**

```JSON
{
    "username": "string",
    "refreshToken" : "string"
}

```

>**Outcome**
```JSON
{
    "message":"string"
}
```


## User routes start with /user
   - **getAll `get`**

```
header={Authorization: Bearer <token>}
```

>**Outcome**
```JSON
[
    {
        "_id": "string",
        "username": "string",
        "password": "string",
        "email": "string",
        "organizations": [],
        "passwords": [],
        "__v": 0
    }
]
```


## Password routes start with /password
   - **getAllpasswords `get`**



>**Outcome**
```JSON
[
    {
    "organization_id":  "string",
    "user_id": "string",
    "title": "string",
    "username": "string",
    "password": "string",
    "url": "string" "(optional)",
    "notes": "string" "(optinal)"
    }
]
```


   - **getRandom `get`**



>**Outcome**
```JSON
[
    {
    "organization_id":  "string",
    "user_id": "string",
    "title": "string",
    "username": "string",
    "password": "string",
    "url": "string" "(optional)",
    "notes": "string" "(optinal)"
    }
]
```