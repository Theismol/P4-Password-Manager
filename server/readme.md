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