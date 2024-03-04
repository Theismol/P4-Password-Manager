## This contains the documentation for API´s

> all routes start with http://localhost:4000/api

## Login routes 
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


## User routes 
   - **/user/getAll `get`**

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
