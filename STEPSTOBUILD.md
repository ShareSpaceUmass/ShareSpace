# How to build ShareSpace

## 1. Include all git ignored files:

1. Create a .env in the Backend directory with the following inside.
```
    SENDGRID_API_KEY = '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'
    
    FROM_EMAIL = 'auth.sharespace@gmail.com'
    
    JWT_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MDUwMDE2MywiaWF0IjoxNjgwNTAwMTYzfQ.yif6FVu-LndY3GlFz40OvURwwWFPVWUr69sdKJqjwcA'`
```
2.	Create a config.json file in the Backend directory with the following inside.
    ```
    {
        "development": {
          "username": "admin",
          "password": "3c84xGsI*288",
          "database": "userDatabase",
          "host": "sharespace-db.caerbupd5wj1.us-east-2.rds.amazonaws.com",
          "dialect": "mysql"
        },
        "test": {
          "username": "admin",
          "password": "3c84xGsI*288",
          "database": "userDatabase",
          "host": "sharespace-db.caerbupd5wj1.us-east-2.rds.amazonaws.com",
          "dialect": "mysql"
        },
        "production": {
          "username": "admin",
          "password": "3c84xGsI*288",
          "database": "userDatabase",
          "host": "sharespace-db.caerbupd5wj1.us-east-2.rds.amazonaws.com",
          "dialect": "mysql"
        }
    }
 ## 2. Run commands:
 1. Run `npm install`
 2. Run `npm run install-all-deps`
 3. Run `npm run start-all`
